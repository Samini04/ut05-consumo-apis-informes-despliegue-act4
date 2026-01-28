/**
 * Componente Admin que sirve como diseño para la página de administración.
 * Incluye un botón para navegar a la página anterior y un espacio reservado
 * para renderizar rutas anidadas utilizando el componente `Outlet` de `react-router-dom`.
 *
 * @componente
 * @returns {JSX.Element} El componente Admin renderizado.
 *
 * @ejemplo
 * // Uso en una configuración de rutas:
 * <Route path="/admin" element={<Admin />}>
 *   <Route path="add-product" element={<AddProductForm />} />
 * </Route>
 *
 * @dependencias
 * - `useNavigate` de `react-router-dom` para la navegación.
 * - `Outlet` de `react-router-dom` para renderizar rutas anidadas.
 * - Estilos CSS importados desde "../assets/styles/index.css".
 */
import { useNavigate, Outlet } from 'react-router-dom';
import "../assets/styles/index.css";

export default function Admin() {
  const navigate = useNavigate();

  return (
    <section className="layout-main"> 
      <button onClick={() => navigate(-1)} className="detail-back">
         <p>←</p> Volver a la tienda
      </button>

      <p className='detail-title'>Formulario añadir producto</p>
      {/* Outlet renderiza los hijos de la ruta /admin (rutas anidadas) */}
      <Outlet/> 
    </section>
  );
}