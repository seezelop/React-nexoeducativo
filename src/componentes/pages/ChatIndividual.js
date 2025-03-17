import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Form, Button, ListGroup } from "react-bootstrap";

const ChatIndividual = () => {
  const { mail } = useParams(); // Obtiene el ID del destinatario desde la URL
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Aquí podrías cargar mensajes previos si el backend lo permite
  }, []);

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return;
    if (mensaje.length < 2 || mensaje.length > 255) {
      alert("El mensaje debe tener entre 2 y 255 caracteres.");
      return;
    }

    const nuevoMensaje = {
      contenido: mensaje,
      destinatario: mail, // Se envía el ID del destinatario
    };

    try {
      await axios.post("http://localhost:8080/nuevoMensaje", nuevoMensaje, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setMensajes([...mensajes, { comunicador: "Tú", contenido: mensaje }]);
      setMensaje("");
    } catch (error) {
      console.error("Error al enviar el mensaje", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">Chat con usuario {mail}</Card.Header>
        <Card.Body>
          <ListGroup>
            {mensajes.map((msg, index) => (
              <ListGroup.Item key={index}>
                <strong>{msg.comunicador}:</strong> {msg.contenido}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form className="mt-3">
            <Form.Group>
              <Form.Control
                type="text"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe un mensaje..."
              />
            </Form.Group>
            <Button
              className="mt-2"
              variant="primary"
              onClick={enviarMensaje}
              disabled={mensaje.length < 10 || mensaje.length > 255} // Validación en el botón
            >
              Enviar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ChatIndividual;
