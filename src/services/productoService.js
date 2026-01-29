import axios from "axios";

// Tu URL del backend (puerto 5000 según vimos antes)
const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/productos`;
//const API_URL = "http://localhost:5000/productos";

// Función auxiliar para traducir de Mongo (_id, name) a React (id, nombre)
const mapProductoFromAPI = (producto) => ({
  id: producto._id,
  nombre: producto.name,
  descripcion: producto.description,
  precio: producto.price,
  categoria: producto.category,
  imagen: producto.photo || '', 
});

/**
 * Obtener todos los productos
 */
export const getAllProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    
    // Tu API devuelve { data: [...] } o a veces el array directo.
    // Verificamos dónde está el array
    const rawData = res.data.data || res.data;

    // Si es un array, lo mapeamos. Si no, devolvemos vacío.
    if (Array.isArray(rawData)) {
        return rawData.map(mapProductoFromAPI);
    }
    return [];

  } catch (err) {
    throw new Error("Error al obtener los productos: " + err.message);
  }
};

/**
 * Obtener un producto por ID
 */
export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    // Mapeamos el resultado único
    return mapProductoFromAPI(res.data);
  } catch (err) {
    throw new Error("Error al obtener el detalle: " + err.message);
  }
};

/**
 * Crear un producto
 * Recibimos datos en formato React y los enviamos tal cual (tu backend espera name, price, etc)
 * OJO: Aquí hay que asegurar que enviamos los nombres que el backend quiere.
 */
export const createProduct = async (productData) => {
  try {
    // Convertimos precio a número por seguridad
    const payload = {
        ...productData,
        price: Number(productData.price)
    };

    const res = await axios.post(API_URL, payload);
    // Devolvemos el producto guardado ya mapeado
    const saved = res.data.savedProducto || res.data;
    return mapProductoFromAPI(saved);
  } catch (err) {
    throw new Error("Error al guardar el producto: " + err.message);
  }
};