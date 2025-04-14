import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Instancia de axios definida fuera del componente
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const Chats = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get("/chatIndividual", {
          withCredentials: true,
        });

        if (Array.isArray(response.data)) {
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
  }, []); // ya no hay advertencia por dependencias

  const iniciarChat = (usuario) => {
    navigate(`/usuario/chat/${usuario.mail}`);
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div
        className="container mt-5"
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <h2 className="text-center mb-4">Selecciona un Usuario para Chatear</h2>
        {usuarios.length === 0 ? (
          <p className="text-center">No hay usuarios disponibles.</p>
        ) : (
          <ul className="list-group">
            {usuarios.map((usuario) => (
              <li
                key={usuario.mail}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#e9ecef" }}
              >
                <span>
                  {usuario.nombre} {usuario.apellido} - {usuario.mail}
                </span>
                <button
                  className="btn btn-primary"
                  onClick={() => iniciarChat(usuario)}
                >
                  Chatear
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Chats;
