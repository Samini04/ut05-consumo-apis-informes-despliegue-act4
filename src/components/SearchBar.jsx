import "../assets/styles/index.css";
/**
 * El componente SearchBar renderiza un campo de entrada estilizado para realizar búsquedas.
 *
 * @componente
 * @param {Object} props - El objeto de propiedades.
 * @param {string} props.searchTerm - El valor actual del campo de búsqueda.
 * @param {Function} props.onSearchChange - Función de callback para manejar los cambios en el campo de búsqueda.
 * @param {string} [props.placeholder="Buscar..."] - Texto de marcador de posición para el campo de búsqueda.
 *
 * @returns {JSX.Element} Un componente de barra de búsqueda estilizado.
 */

function SearchBar({ searchTerm, onSearchChange, placeholder = "Buscar..." }) {
  return (
   // El mismo estilo de mis formulario
    <div className="form-container" style={{ border: "none", padding: 0 }}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label={placeholder} 
      />
    </div>
  );
}

export default SearchBar;