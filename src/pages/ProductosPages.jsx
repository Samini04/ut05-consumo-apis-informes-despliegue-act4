/**
 * El componente ProductosPage renderiza una página que muestra una lista de productos.
 * Incluye una barra de búsqueda para filtrar productos por nombre.
 *
 * @componente
 * @returns {JSX.Element} El componente ProductosPage renderizado.
 *
 * @ejemplo
 * // Renderizar el componente ProductosPage
 * <ProductosPage />
 *
 * @notas
 * - El componente utiliza `useState` para manejar el estado del término de búsqueda.
 * - El hook `useMemo` se utiliza para optimizar el filtrado de productos basado en el término de búsqueda.
 * - Si no hay productos que coincidan con el término de búsqueda, se muestra un mensaje al usuario.
 *
 * @dependencias
 * - `productos`: Un array de objetos de productos importado desde "../data/productos".
 * - `List`: Un componente utilizado para renderizar la lista de productos filtrados.
 * - `SearchBar`: Un componente utilizado para renderizar la barra de búsqueda para filtrar productos.
 * - `../assets/styles/index.css`: Hoja de estilos para el componente.
 */
import { useState, useMemo, useEffect } from "react";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import "../assets/styles/index.css";
import { obtenerProductos } from "../services/productoService";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
// useMemo optimiza el filtrado: solo recalcula si cambia el término o la lista base
  
useEffect(() => {
  obtenerProductos().then((data) => setProductos(data));
}, []);

const filteredProductos = useMemo(() => {
    if (!searchTerm) return productos;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return productos.filter((p) => p.nombre.toLowerCase().includes(lowerCaseSearchTerm));
  }, [searchTerm, productos]);

return (
    <section>
      <h1 className="layout-titulo">Lista de productos:</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Buscar productos por nombre..."
      />
      {filteredProductos.length > 0 ? (
        <List items={filteredProductos} />
      ) : (
        <p className="body-text text-center p-4">Cargando productos o no encontrados...</p>
      )}
    </section>
  );
}
