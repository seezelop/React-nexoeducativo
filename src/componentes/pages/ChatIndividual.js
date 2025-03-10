import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const ChatIndividual = () => {
  const { mail } = useParams();
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ms");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Conectado al WebSocket");
        client.subscribe(`/usuario/${mail}/privado`, (message) => {
          setMensajes((prevMensajes) => [...prevMensajes, JSON.parse(message.body)]);
        });
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [mail]);

  const enviarMensaje = () => {
    if (stompClient && mensaje.trim() !== "") {
      const nuevoMensaje = {
        comunicador: "tu_email@ejemplo.com", // Aquí debes poner el email del usuario autenticado
        destinatario: mail,
        contenido: mensaje,
      };

      stompClient.publish({
        destination: "/enviar/mensajePrivado",
        body: JSON.stringify(nuevoMensaje),
      });

      setMensajes([...mensajes, nuevoMensaje]);
      setMensaje("");
    }
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
