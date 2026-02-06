import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
// Para evitar problemas con la URL, aseguramos que termine con /productos
const API_URL = BASE_URL.endsWith('/productos') ? BASE_URL : `${BASE_URL}/productos`;

/**
 * Obtener todos los productos
 */
export const getAllProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    
    // Obtenemos los datos crudos
    const rawData = res.data.data || res.data;

    return Array.isArray(rawData) ? rawData.map(p => ({
        id: p._id,
        nombre: p.name,
        descripcion: p.description,
        precio: p.price,
        categoria: p.category,
        imagen: p.photo || ''
    })) : [];

  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw new Error(error.response?.data?.message || "No se pudo cargar la lista de productos.");
  }
};

/**
 * Obtener un producto por ID
 */
export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    const p = res.data;

    // Devuelvo el objeto con las propiedades traducidas al español
    return {
        id: p._id,
        nombre: p.name,
        descripcion: p.description,
        precio: p.price,
        categoria: p.category,
        imagen: p.photo || ''
    };
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error);
    throw new Error(error.response?.data?.message || "No se pudo obtener el producto.");
  }
};

/**
 * Crear un producto
 */
export const createProduct = async (data) => {
  try {
  // Aqui igual
    const payload = {
        name: data.nombre, 
        description: data.descripcion,
        price: Number(data.precio),
        category: data.categoria,
        photo: data.imagen || ''
    };

    const res = await axios.post(API_URL, payload);
    return res.data; 

  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw new Error(error.response?.data?.message || "No se pudo crear el producto.");
  }
};

/**
 * Eliminar un producto
 */
export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error al eliminar:", error);
    throw new Error(error.response?.data?.message || "No se pudo eliminar el producto.");
  }
};