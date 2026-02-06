import axios from "axios";


const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/productos`;
//const API_URL = "http://localhost:5000/productos";


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
    console.log("Llamando a la API en:", API_URL); 
    const res = await axios.get(API_URL);
    
    console.log(" Respuesta cruda del servidor:", res.data); 

    const rawData = res.data.data || res.data;

    if (Array.isArray(rawData)) {
        console.log(" Es un array, mapeando productos...");
        return rawData.map(mapProductoFromAPI);
    } else {
        console.error(" Lo que llegó NO es un array:", rawData);
        if (rawData.message) {
            throw new Error(rawData.message); 
        }
        return [];
    }

  } catch (err) {
    console.error("ERROR :", err);
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