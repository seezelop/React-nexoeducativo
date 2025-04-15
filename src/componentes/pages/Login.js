import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';  // Importa el contexto
import axios from 'axios';
import Cookies from 'universal-cookie';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUserRole, setInfoSesion } = useContext(UserContext); // Accede a setUserRole desde el contexto
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;
  const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const login = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          username: username,
          password: password
        }),
        credentials: "include"
      });

      if (login.ok) {
        const response = await api.get('/api/usuario/getRolUsuarioLogueado', {
          withCredentials: true
        });

        //console.log('INFO DE AQUI: '+JSON.stringify(response.data))

        const response2 = await api.get('/auth/info', {
          withCredentials: true
        });

        //console.log('INFO DE AQUI 2: '+JSON.stringify(response2.data))

        if (response.status === 200) {
          const userRole = response.data.split(': ')[1]; // Obtén el nombre del rol del usuario
          setUserRole(userRole);
          //setInfoSesion(response.data); // Guarda la información para mostrarla más tarde
          //console.log("Rol obtenido: " + userRole);
         setInfoSesion(response2.data) //aca se guarda el nombre y apellido del usuario para despues mostrarlo

          const usuarioCookie = new Cookies();
          const vencimiento = new Date();
          vencimiento.setDate(vencimiento.getDate() + 1);
          usuarioCookie.set('rol', userRole, { path: '/', expires: vencimiento });

          // Redireccionar según el nombre del rol
          switch (userRole) {
            case 'super admin':
              navigate('/admin');
              break;
            case 'jefe colegio':
              navigate('/jefeColegio');
              break;
            case 'administrativo':
              navigate('/administrativo');
              break;
            case 'preceptor':
              navigate('/preceptor');
              break;
            case 'profesor':
              navigate('/profesor');
              break;
            case 'padre':
              navigate('/padre');
              break;
            case 'alumno':
              navigate('/alumno');
              break;
            default:
              console.error('Rol no reconocido');
              setError('Error: Rol no reconocido');
          }
        } else {
          console.error('Error al obtener el rol del usuario');
          setError('Error al obtener el rol del usuario');
        }
      } else {
        console.error('Error en el inicio de sesión');
        setError('Credenciales incorrectas');
      }
    } catch (e) {
      console.error("Error en la solicitud", e);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <section className="d-flex flex-column min-vh-100">
      <section className="container d-flex justify-content-center align-items-center flex-grow-1">
        <section className="col-md-6">
          <h2 className="text-center text-white mb-4">Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <section className="mb-3">
            <label htmlFor="email" className="form-label text-white">
              Correo electrónico
            </label>

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
              <label htmlFor="password" className="form-label text-white">Contraseña</label>
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
