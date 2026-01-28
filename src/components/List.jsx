/**
 * Renderiza una lista de productos como un conjunto de tarjetas.
 *
 * @component
 * @param {Object} props - El objeto de propiedades.
 * @param {Array} [props.items=[]] - Un array de productos para mostrar. Cada producto debe ser un objeto con las siguientes propiedades:
 * @param {string} props.items[].id - El identificador único del producto.
 * @param {string} props.items[].imagen - La URL de la imagen del producto.
 * @param {string} props.items[].nombre - El nombre del producto.
 * @param {number} props.items[].precio - El precio del producto.
 *
 * @returns {JSX.Element} Una lista de tarjetas de productos.
 */
import "../assets/styles/index.css";
import { Link } from "react-router-dom";

export default function List({ items = [] }) {
  // En caso que no hay prodcutos en la array
  if (items.length === 0) return <p>No hay productos disponibles.</p>;
  return (
    <ul className="product-list" role="list">
      {items.map((item) => (
        // La key es obligatoria para identificar elementos únicos en el DOM 
        <li key={item.id}>
          <article className="product-card">
            <figure>
              <img src={item.imagen} alt={item.nombre} />
            </figure>
            <h3 className="product-name">{item.nombre}</h3>
            <p className="product-price">{item.precio}€</p>
            <div className="product-actions">
              {/* Navegar a ver los productos */}
             <Link to={`/producto/${item.id}`}>Ver detalle</Link>
              <button>Añadir +</button>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
