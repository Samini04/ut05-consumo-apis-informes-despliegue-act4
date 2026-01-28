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


function App() {
  return (
    <Routes>
      <Route element={<Contenedor />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/inicio' element={<Navigate to='/' />} />
        <Route path='/productos' element={<ProductosPage />} />
        <Route path='/producto/:id' element={<DetailPage />} />
      </Route>
      {/* Rutas Anidadas para Administración.*/}
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Navigate to="formularioControlado" replace />} />
        <Route path="formularioControlado" element={<FormularioControlado />} />
      </Route>
      {/* Ruta en caso del error nos llevara a la página error */}
      <Route path='*' element={
        <Contenedor>
          <ErrorPage />
        </Contenedor>
      } />
    </Routes>
  );
}

export default App;