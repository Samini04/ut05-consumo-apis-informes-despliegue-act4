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

import React, { useState } from 'react';
import { useProductos } from '../hooks/useProductos'; // Importamos el nuevo hook
import List from '../components/List';
import SearchBar from '../components/SearchBar'; 

const ProductosPage = () => {
 
    const { data, loading, error } = useProductos(); 
    const [searchTerm, setSearchTerm] = useState('');
    
    const productosFiltrados = data.filter(producto => 
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p className="text-center">Cargando catálogo...</p>;
    if (error) return <p className="text-center error">Error: {error}</p>;

    return (
        <div className="container">
            <h2>Catálogo de Productos</h2>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            
            {productosFiltrados.length > 0 ? (
               <List lista={productosFiltrados} />
            ) : (
                <p>No se encontraron productos.</p>
            )}
        </div>
    );
};

export default ProductosPage;