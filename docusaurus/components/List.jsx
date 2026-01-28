/**
 * List component that renders a list of products.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array} props.items - Array of product items to display. Each item should be an object with the following properties:
 * @param {string} props.items[].id - Unique identifier for the product.
 * @param {string} props.items[].imagen - URL of the product image.
 * @param {string} props.items[].nombre - Name of the product.
 * @param {number} props.items[].precio - Price of the product in euros.
 *
 * @returns {JSX.Element} A list of product cards.
 */
import "../assets/styles/index.css";

export default function List({ items = [] }) {
  return (
    <ul className="product-list" role="list">
      {items.map((item) => (
        <li key={item.id}>
          <article className="product-card">
            <figure>
              <img src={item.imagen} alt={item.nombre} />
            </figure>

            <h3 className="product-name">{item.nombre}</h3>
            <p className="product-price">{item.precio}€</p>

            {/*  SIN enlaces, como en Películas */}
            <div className="product-actions">
              <button>Añadir +</button>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
