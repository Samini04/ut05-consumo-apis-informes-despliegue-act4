import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        login(); // 1. Cambia el estado a logueado en el Context y LocalStorage
        navigate('/admin'); // 2. Te mueve automáticamente a la ruta admin
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>Acceso Administrativo</h2>
            <p>Haz clic para entrar al panel de control.</p>
            <button 
                onClick={handleLogin}
                className="btn-login" 
            >
                Iniciar Sesión
            </button>
        </div>
    );
}