import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';  // Importa el contexto
import axios from 'axios'; 

function Login() {
  const [mail, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const { setUserRole } = useContext(UserContext); // Accede a setUserRole desde el contexto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/login', {
      username: mail, 
      password: clave,
    }, { withCredentials: true }); // Permitir cookies en solicitudes CORS

    const userData = response.data;
    setUserRole(userData);
    if (userData === "super admin") {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  } catch (error) {
    if (error.response) {
      setError("Error al iniciar sesión: " + error.response.data);
    } else {
      setError("Error al iniciar sesión: " + error.message); // Cambia aquí si solo dice "Network Error"
    }
  }
};


  return (
    <section className="d-flex flex-column min-vh-100">
      <section className="container d-flex justify-content-center align-items-center flex-grow-1">
        <section className="col-md-6">
          <h2 className="text-center mb-4">Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <section className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Ingrese su correo"
                value={mail}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </section>
            <section className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Ingrese su contraseña"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                required
              />
            </section>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary w-100 mb-4">Iniciar sesión</button>
          </form>
        </section>
      </section>
    </section>
  );
}

export default Login;


