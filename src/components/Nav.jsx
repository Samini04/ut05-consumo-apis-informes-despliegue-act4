import { useState } from "react";
import { NavLink } from "react-router-dom";
/**
 * El componente Nav renderiza un menú de navegación responsivo con un botón
 * hamburguesa para alternar su visibilidad. Incluye enlaces a diferentes rutas
 * e íconos para el carrito y el perfil.
 *
 * @component
 * @example
 * return (
 *   <Nav />
 * )
 *
 * @returns {JSX.Element} El componente de navegación renderizado.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <button onClick={() => setOpen(!open)} className="nav-toggle">
        {open ? "✕" : "☰"}
      </button>

      {/* Menú controlado por estado */}
      <nav className={`nav-menu ${open ? "nav-open" : ""}`}>
        <ul className="nav-list">
          <li>
            <NavLink to="/"  onClick={() => setOpen(false)}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos" onClick={() => setOpen(false)}>
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" onClick={() => setOpen(false)}>
              Admin
            </NavLink>
          </li>
          <li className="nav-icons">
            <img src="/imagenes/carrito.png" alt="Carrito" width="40" height="40" />
            <img src="/imagenes/perfil.png" alt="Perfil" width="40" height="40" />
          </li>
        </ul>
      </nav>
    </>
  );
}
