import React, { useState, useEffect } from "react";
import WebSocketService from "../context/WebSocketService";

const ChatIndividual = () => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  useEffect(() => {
    WebSocketService.connect((mensajeRecibido) => {
      setMensajes((prevMensajes) => [...prevMensajes, mensajeRecibido]);
    });
  }, []);

  const enviarMensaje = () => {
    WebSocketService.sendMessage("correo@ejemplo.com", nuevoMensaje);
    setNuevoMensaje("");
  };

  return (
    <div>
      <h2>Chat Individual</h2>
      <div>
        {mensajes.map((msg, index) => (
          <p key={index}>{msg.contenido}</p>
        ))}
      </div>
      <input
        type="text"
        value={nuevoMensaje}
        onChange={(e) => setNuevoMensaje(e.target.value)}
      />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
};

export default ChatIndividual;
