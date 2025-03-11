import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WebSocketService from "../../context/WebSocketService";

const ChatIndividual = () => {
  const { mail } = useParams();
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Conectar al WebSocket
    WebSocketService.connect((nuevoMensaje) => {
      setMensajes((prevMensajes) => [...prevMensajes, nuevoMensaje]);
    });

    return () => {
      WebSocketService.client.deactivate();
    };
  }, []);

  const enviarMensaje = () => {
    if (!WebSocketService.client.connected) {
      console.error("El cliente STOMP no está conectado");
      return;
    }

    if (mensaje.trim() === "") {
      console.error("El mensaje no puede estar vacío");
      return;
    }

    WebSocketService.sendMessage(mail, mensaje);
    setMensajes([...mensajes, { comunicador: "lorencita2@gmail.com", contenido: mensaje }]);
    setMensaje("");
  };

  return (
    <div>
      <h2>Chat con {mail}</h2>
      <div>
        {mensajes.map((msg, index) => (
          <p key={index}>
            <strong>{msg.comunicador}:</strong> {msg.contenido}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
};

export default ChatIndividual;