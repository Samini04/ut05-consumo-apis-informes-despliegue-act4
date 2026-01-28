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
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { obtenerProductoPorId } from '../services/productoService';
import "../assets/styles/index.css";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();   
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerProductoPorId(id).then(data => {
      setProducto(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Cargando...</p>;

  if (!producto) {
    return (
      <section className="detail-notfound">
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate(-1)}>Volver al catálogo</button>
      </section>
    );
  }

  return (
    <article className="detail-container">
      
      <button onClick={() => navigate(-1)} className="detail-back">
         ← Volver a la tienda
      </button>

      <div className="detail-card">
        <div className="detail-image">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
        {/*  Informaciones del producto*/}
        <div className="detail-info">
          <span className="detail-tag">Fresco y Natural</span>
          <h1 className="detail-title">{producto.nombre}</h1>
        {/*  Moneda */}
          <div className="detail-price">
            <div className="detail-current">{producto.precio}€</div>
            <div className="detail-oldprice">
              <span className="detail-strike">3.50€</span>
              <span className="detail-discount">-20%</span>
            </div>
          </div>
      {/*  Descripcion */}
          <div className="detail-description">
             <p>{producto.descripcion}</p>
             <p>Origen seleccionado de los mejores cultivos. Calidad garantizada.</p>
          </div>

          <div className="detail-quantity">
            <h3>Cantidad</h3>
            <div className="detail-buttons">
                <button>500g</button>
                <button>1kg</button>
                <button>A granel</button>
            </div>
          </div>

          <div className="detail-size">
            <h3>Tamaño</h3>
            <div className="detail-buttons">
                <button>Pequeño</button>
                <button>Mediano</button>
                <button>Grande</button>
            </div>
          </div>

          <div className="detail-unit">
             <span>Unidad</span>
             <div className="detail-counter">
                <button>−</button>
                <div className="detail-count">1</div>
                <button>+</button>
             </div>
          </div>
      {/* Botones de acción accesibles */}
          <div className="detail-actions">
             <button aria-label="Favoritos">
                <img src="/imagenes/corazon.png" alt="Icono Corazón" />
             </button>
             <button>Añadir al carrito</button>
             <button>Comprar ahora</button>
          </div>

        </div>
      </div>
    </article>
  );
}
