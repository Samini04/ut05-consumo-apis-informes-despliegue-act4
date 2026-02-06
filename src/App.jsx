/**
 * Componente Raíz y Configuración de Enrutamiento.
 * * Define la arquitectura de navegación de DOM.
 * Gestiona redirecciones y rutas comodín para errores 404.
 * * @component
 */
import { Routes, Route, Navigate } from 'react-router-dom';
import Contenedor from './components/Contenedor';

// Importación de páginas
import HomePage from './pages/HomePage';
import ProductosPage from "./pages/ProductosPages";
import DetailPage from './pages/DetailPage';
import ErrorPage from './pages/ErrorPage';
import Admin from './pages/Admin';
import FormularioControlado from './pages/FormularioControlado';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route element={<Contenedor />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/productos' element={<ProductosPage />} />
        <Route path='/producto/:id' element={<DetailPage />} />
        {/* Añade la ruta de Login aquí para que se vea dentro del diseño general */}
        <Route path='/login' element={<LoginPage />} />
      </Route>

      {/* Rutas Privadas */}
      <Route path="/admin" element={<PrivateRoute />}>
        {/* Contenedor envuelve también al Admin para mantener Header/Footer */}
        <Route element={<Contenedor />}>
          <Route index element={<Admin />} />
          {/* Si usas subrutas, asegúrate que Admin tenga un <Outlet /> */}
          <Route path="formulario" element={<FormularioControlado />} />
        </Route>
      </Route>

      <Route path='*' element={<Contenedor><ErrorPage /></Contenedor>} />
    </Routes>
  );
}

export default App;