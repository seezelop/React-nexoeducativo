import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:8080/chatIndividual", {
          withCredentials: true,
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const iniciarChat = (usuario) => {
    navigate(`/admin/chat/${usuario.mail}`);
  };

  return (
    <div>
      <h2>Selecciona un Usuario para Chatear</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.mail}>
            {usuario.nombre} - {usuario.rol}
            <button onClick={() => iniciarChat(usuario)}>Chatear</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
