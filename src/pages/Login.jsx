import React, { useState, useEffect } from 'react';
import { showToast } from '../utils/showToast';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar la carga
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Activar el spinner
    try {
      const data = await login(email, password);

      showToast('¡Inicio de sesión exitoso!', 'success');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al hacer login:', error);
      showToast(error.message || 'Hubo un problema con el inicio de sesión', 'error');
    } finally {
      setIsLoading(false); // Desactivar el spinner al finalizar
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center bg-white p-6 md:p-8 h-full w-full">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-4">Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="usuario" className="block text-sm font-medium text-gray-600 pb-1">Usuario</label>
              <input
                type="email"
                id="usuario"
                name="usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su usuario"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 pb-1">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading} // Deshabilitar el botón mientras carga
            >
              {isLoading ? (
                <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin mx-auto"></div> // Spinner
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="flex items-center justify-center bg-gray-200 h-full p-0 w-full">
        <img
          src="./images/fondo_login.jpg"
          alt="Dinero"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
