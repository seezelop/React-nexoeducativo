import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Form, Button, ListGroup } from "react-bootstrap";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const ChatIndividual = () => {
  const { mail } = useParams(); 
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [editandoId, setEditandoId] = useState(null); 
  const [nuevoContenido, setNuevoContenido] = useState(""); 

  useEffect(() => {
    const cargarMensajes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/obtenerMensajeDestinatario/${mail}`, {
          withCredentials: true,
        });
        setMensajes(response.data);
      } catch (error) {
        console.error("Error al cargar los mensajes:", error);
      }
    };

    cargarMensajes();
  }, [mail]);

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return;
    if (mensaje.length < 2 || mensaje.length > 255) {
      alert("El mensaje debe tener entre 2 y 255 caracteres.");
      return;
    }

    const nuevoMensaje = {
      contenido: mensaje,
      destinatario: mail,
    };

    try {
      await axios.post("http://localhost:8080/nuevoMensaje", nuevoMensaje, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setMensajes([...mensajes, { idMensaje: Date.now(), contenido: mensaje, mail: "Tú" }]);
      setMensaje("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const editarMensaje = async (idMensaje, nuevoContenido) => {
    try {
      await axios.patch(
        `http://localhost:8080/editarMensajePrivado/${idMensaje}`,
        nuevoContenido,
        {
          headers: {
            "Content-Type": "text/plain",
          },
          withCredentials: true,
        }
      );

      const mensajesActualizados = mensajes.map((msg) =>
        msg.idMensaje === idMensaje ? { ...msg, contenido: nuevoContenido } : msg
      );
      setMensajes(mensajesActualizados);
      setEditandoId(null); // Termina la edición
    } catch (error) {
      console.error("Error al editar el mensaje:", error);
    }
  };

  const borrarMensaje = async (idMensaje) => {
    try {
      await axios.delete(`http://localhost:8080/borrarMensaje/${idMensaje}`, {
        withCredentials: true,
      });

      const mensajesActualizados = mensajes.filter((msg) => msg.idMensaje !== idMensaje);
      setMensajes(mensajesActualizados);
    } catch (error) {
      console.error("Error al borrar el mensaje:", error);
    }
  };

  const iniciarEdicion = (idMensaje, contenidoActual) => {
    setEditandoId(idMensaje); // Activa la edición para este mensaje
    setNuevoContenido(contenidoActual); 
  };

  const cancelarEdicion = () => {
    setEditandoId(null); // Cancela la edición
    setNuevoContenido(""); // Limpia el campo de edición
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">Chat con usuario {mail}</Card.Header>
        <Card.Body>
          <ListGroup>
            {mensajes.map((msg) => (
              <ListGroup.Item
                key={msg.idMensaje}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <div>
                  <strong>{msg.mail}:</strong>
                  {editandoId === msg.idMensaje ? (
                    <input
                      type="text"
                      value={nuevoContenido}
                      onChange={(e) => setNuevoContenido(e.target.value)}
                      style={{ marginLeft: "10px" }}
                    />
                  ) : (
                    <span style={{ marginLeft: "10px" }}>{msg.contenido}</span>
                  )}
                </div>
                <div>
                  {editandoId === msg.idMensaje ? (
                    <>
                      <FaCheck
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        onClick={() => editarMensaje(msg.idMensaje, nuevoContenido)}
                      />
                      <FaTimes
                        style={{ cursor: "pointer" }}
                        onClick={cancelarEdicion}
                      />
                    </>
                  ) : (
                    <>
                      <FaEdit
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        onClick={() => iniciarEdicion(msg.idMensaje, msg.contenido)}
                      />
                      <FaTrash
                        style={{ cursor: "pointer" }}
                        onClick={() => borrarMensaje(msg.idMensaje)}
                      />
                    </>
                  )}
                </div>
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
              disabled={mensaje.length < 2 || mensaje.length > 255}
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