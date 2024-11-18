import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';  // Importa el contexto
import axios from 'axios';
import Cookies from 'universal-cookie';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [escuelas, setEscuelas] = useState([]);
  const { setUserRole } = useContext(UserContext); // Accede a setUserRole desde el contexto
  const navigate = useNavigate();

  
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const login= await fetch("http://localhost:8080/login", {
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
      if(login.ok){
        const response = await axios.get('http://localhost:8080/api/usuario/getRolUsuarioLogueado', {
          withCredentials: true
        });
        if (response.status === 200) {
          const userRole = response.data.split(': ')[1]; //separar lo que esta despues del : en el response
          setUserRole(userRole);
          const usuarioCookie = new Cookies();
          const vencimiento= new Date();
          vencimiento.setDate(vencimiento.getDate()+1)
          usuarioCookie.set('rol', userRole, {path:'/',expires: vencimiento});
          switch(userRole){
            case 'super admin':
              //console.log('valor almacenado en la cookie'+usuarioCookie.get('rol'));
              navigate('/admin');
              break;
            default:
              navigate('/user');
          }
          
          //console.log("rol usuario: "+userRole);
          //console.log('Complete response:', response.data);
        } else {
          console.log('No hay escuelas o rol no disponible');
        }
      }

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


