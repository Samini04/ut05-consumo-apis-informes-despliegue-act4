import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const API_URL = BASE_URL.endsWith('/productos') 
  ? BASE_URL 
  : `${BASE_URL}/productos`;

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
    
    console.log("Respuesta del servidor:", res.data); 

    const rawData = res.data.data || res.data;

    if (Array.isArray(rawData)) {
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
 */
export const createProduct = async (productData) => {
  try {
    // 1. Preparamos los datos para la API
    // Como Admin.jsx ya usa claves en inglés (name, description...), las usamos directamente.
    // Si alguna viene vacía, usamos un fallback para evitar el undefined.
    const payload = {
        name: productData.name || productData.nombre, 
        description: productData.description || productData.descripcion,
        price: Number(productData.price || productData.precio),
        category: productData.category || productData.categoria,
        photo: productData.photo || productData.imagen || ''
    };

    // 2. Enviamos al servidor
    const res = await axios.post(API_URL, payload);
    
    // 3. Devolvemos la respuesta mapeada para que la lista la entienda
    const saved = res.data.savedProducto || res.data;
    
    // Aquí reutilizamos tu mapper para convertirlo a español si tu lista lo necesita así
    return {
        id: saved._id || saved.id,
        nombre: saved.name,
        descripcion: saved.description,
        precio: saved.price,
        categoria: saved.category,
        imagen: saved.photo || ''
    };

  } catch (err) {
    // Si el error es 400, suele ser por validación (Faltan datos)
    if (err.response && err.response.status === 400) {
        throw new Error("Faltan datos obligatorios. Revisa que todos los campos tengan texto.");
    }
    throw new Error("Error al guardar el producto: " + err.message);
  }
};