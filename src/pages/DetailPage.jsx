/**
 * Componente DetailPage
 * 
 * Este componente muestra los detalles de un producto específico basado en el parámetro `id`
 * de la URL. Muestra información del producto como nombre, precio, descripción, 
 * y opciones para cantidad, tamaño y unidad. Los usuarios pueden navegar de vuelta al catálogo, 
 * añadir el producto al carrito o comprarlo directamente.
 * 
 * @componente
 * @returns {JSX.Element} La página de detalles renderizada para un producto.
 * 
 * @ejemplo
 * // Ejemplo de uso en una ruta:
 * <Route path="/product/:id" element={<DetailPage />} />
 * 
 * @dependencias
 * - React: Para construir el componente.
 * - react-router-dom: Para acceder a los parámetros de la URL (`useParams`) y navegación (`useNavigate`).
 * - productos: Un array de datos de productos utilizado para encontrar el producto por ID.
 * - index.css: Estilos para el componente.
 * 
 * @funcionalidades
 * - Muestra detalles del producto incluyendo imagen, nombre, precio y descripción.
 * - Permite a los usuarios seleccionar opciones de cantidad, tamaño y unidad.
 * - Proporciona acciones para añadir el producto a favoritos, al carrito o comprarlo.
 * - Maneja la navegación de vuelta al catálogo.
 * - Muestra un mensaje de "Producto no encontrado" si el ID del producto no es válido.
 */


import "../assets/styles/index.css";
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSingleProducto } from '../hooks/useProductos'; 

const DetailPage = () => {
    const { productoId } = useParams(); // Obtenemos el ID de la URL
    
    // Usamos el hook para obtener los datos, loading y error automáticamente
    const { producto, loading, error } = useSingleProducto(productoId);

    if (loading) return <div className="text-center">Cargando detalle...</div>;
    if (error) return <div className="text-center error">Error: {error}</div>;
    if (!producto) return <div className="text-center">Producto no encontrado</div>;

    return (
        <div className="container detail-container">
            <Link to="/productos" className="back-link">← Volver al catálogo</Link>
            
            <article className="detail-card">
                <div className="detail-image">
                    <img 
                        src={producto.imagen} 
                        alt={producto.nombre} 
                        onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
                    />
                </div>
                <div className="detail-info">
                    <h1>{producto.nombre}</h1>
                    <span className="category-tag">{producto.categoria}</span>
                    <p className="description">{producto.descripcion}</p>
                    <p className="price">{producto.precio} €</p>
                    
                    <button className="btn-add">Añadir al Carrito</button>
                </div>
            </article>
        </div>
    );
};

export default DetailPage;