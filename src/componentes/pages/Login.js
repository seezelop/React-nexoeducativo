import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';  // Importa el contexto
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [escuelas, setEscuelas] = useState([]);
  const { setUserRole } = useContext(UserContext); // Accede a setUserRole desde el contexto
  const navigate = useNavigate();

  //metodo que obtien el rol del usuario logueado
  const rolUsuario = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/usuario/getRolUsuarioLogueado', {
        withCredentials: true
      });
      
      if (response.status === 200) {
        const userRole = response.data.role; 
        setUserRole(userRole);
      } else {
        console.log('No hay escuelas o rol no disponible');
      }
    } catch (error) {
      console.error('Error al cargar las escuelas', error);
      setError('Error al cargar las escuelas');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {//seteo los headers que puse en el postman
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({//métodos útiles
          // para trabajar con los parámetros de búsqueda de 
          //una URL
          username: username,
          password: password
        }),
        credentials: "include"
      })
        .then(response => {
          if (response.ok) {
            rolUsuario();
            navigate('/admin')
            console.log('todo bien')
          } else {
            console.log("todo mal")
          }
        })
    } catch (e) {
      console.log("error en la solicutud", e);
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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


