// import React, { useState, useContext } from 'react';
// import { auth, db } from '../../firebase';
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { useNavigate } from 'react-router-dom'; 
// import { UserContext } from '../../context/UserContext';  // Importa el contexto

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { setUserRole } = useContext(UserContext); // Accede a setUserRole desde el contexto
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       const userDoc = await getDoc(doc(db, "usuarios", user.uid));
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         setUserRole(userData.rol);  // Guarda el rol en el contexto
//         if (userData.rol === "admin") {
//           navigate('/admin'); // Redirige a la página del admin
//         } else {
//           navigate('/user');  // Redirige a la página de usuario común
//         }
//       } else {
//         setError("No se encontró información del usuario");
//       }
//     } catch (error) {
//       setError("Error al iniciar sesión: " + error.message);
//     }
//   };

//   return (
//     <section className="d-flex flex-column min-vh-100">
//       <section className="container d-flex justify-content-center align-items-center flex-grow-1">
//         <section className="col-md-6">
//           <h2 className="text-center mb-4">Iniciar sesión</h2>
//           <form onSubmit={handleSubmit}>
//             <section className="mb-3">
//               <label htmlFor="email" className="form-label">Correo electrónico</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 placeholder="Ingrese su correo"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </section>
//             <section className="mb-3">
//               <label htmlFor="password" className="form-label">Contraseña</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 placeholder="Ingrese su contraseña"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </section>
//             {error && <p className="text-danger">{error}</p>}
//             <button type="submit" className="btn btn-primary w-100 mb-4">Iniciar sesión</button>
//           </form>
//         </section>
//       </section>
//     </section>
//   );
// }

// export default Login;




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
      const response = await axios.post('http://localhost:8080/auth/login', { // Conecta con la API
        mail: mail, 
        clave: clave,
      });

      const userData = response.data;
      setUserRole(userData.rol);  // Guarda el rol en el contexto

      if (userData.rol === "super admin") {
        navigate('/admin'); // Redirige a la página del admin
      } else {
        navigate('/user');  // Redirige a la página de usuario común
      }
    } catch (error) {
      if (error.response) {
        setError("Error al iniciar sesión: " + error.response.data); // Mostrar el mensaje de error del servidor
      } else {
        setError("Error 2 al iniciar sesión: " + error.message); // Error general
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


