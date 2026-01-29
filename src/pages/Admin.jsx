import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos el hook de creación
import { useCreateProducto } from '../hooks/useProductos'; 
import '../assets/styles/formulario.css'; 

const Admin = () => {
    const navigate = useNavigate();
    // Usamos el hook aquí
    const { addProducto, loading, error } = useCreateProducto();

    const [form, setForm] = useState({
        name: '', description: '', price: '', category: 'Zumos', photo: ''
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Llamamos a la función del hook
        const exito = await addProducto(form);
        
        if (exito) {
            alert('Producto creado con éxito');
            navigate('/productos');
        }
        // Si falla, el 'error' del hook se actualizará y puedes mostrarlo abajo
    };
    return (
        // 2. Usamos 'form-container' para que el CSS funcione
        <div className="form-container">
        <h2>Añadir Producto</h2>
        {error && <p style={{color:'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                
                {/* Agrupamos Label + Input para que se vea ordenado */}
                <div className="form-group">
                    <label>Nombre del producto:</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Ej: Zumo de Naranja" 
                        value={form.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea 
                        name="description" 
                        placeholder="Breve descripción del producto" 
                        value={form.description} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Precio (€):</label>
                    <input 
                        type="number" 
                        name="price" 
                        placeholder="0.00" 
                        value={form.price} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Categoría:</label>
                    {/* El select suele necesitar estilo propio, pero heredará el ancho del input */}
                    <select 
                        name="category" 
                        value={form.category} 
                        onChange={handleChange}
                        style={{width: '100%', padding: '0.6rem', marginTop: '0.3rem', borderRadius: '0.5rem', border: '1px solid var(--color-grey-4)'}}
                    >
                        <option value="Zumos">Zumos</option>
                        <option value="Frutas">Frutas</option>
                        <option value="Verduras">Verduras</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>URL de la imagen:</label>
                    <input 
                        type="text" 
                        name="photo" 
                        placeholder="http://..." 
                        value={form.photo} 
                        onChange={handleChange} 
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar Producto'}
                </button>
            </form>
        </div>
    );
};

export default Admin;