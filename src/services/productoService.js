// src/services/productoService.js

// Si existe la variable de entorno (en Vercel), usa esa. Si no, usa localhost.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

export const obtenerProductos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/productos`);
    if (!response.ok) throw new Error("Error al cargar productos");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const obtenerProductoPorId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/productos/${id}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};