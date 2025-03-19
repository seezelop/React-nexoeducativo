import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:8080/chatIndividual", {
          withCredentials: true,
        });

        if (Array.isArray(response.data)) {
          //console.log('INFO DATAA: '+JSON.stringify(response.data))
          setUsuarios(response.data);
        } else {
          setError("Datos de usuarios no válidos");
        }
      } catch (error) {
        setError("Error al obtener usuarios");
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const iniciarChat = (usuario) => {
    navigate(`/usuario/chat/${usuario.mail}`);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>Selecciona un Usuario para Chatear</h2>
      {usuarios.length === 0 ? (
        <p>No hay usuarios disponibles.</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.mail}>
              {usuario.nombre} {usuario.apellido} - {usuario.mail}
              <button onClick={() => iniciarChat(usuario)}>Chatear</button>
            </li>
          ))}
        </ul>
      )}
    </div>
    
  );
};

export default Chats;