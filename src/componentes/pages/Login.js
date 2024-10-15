import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "usuarios", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.rol === "admin") {
          navigate('/admin'); // Redirige a la página del admin
        } else {
          navigate('/user');  // Redirige a la página de usuario común
        }
      } else {
        setError("No se encontró información del usuario");
      }
    } catch (error) {
      setError("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <section className="d-flex flex-column min-vh-100"> {/* Contenedor principal usando section */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '10px', width: '100%' }}
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
                style={{ padding: '10px', width: '100%' }}
              />
            </section>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary w-100 mb-4">Iniciar sesión</button> {/* Margen abajo */}
          </form>
        </section>
      </section>


    </section>
  );
}

export default Login;
