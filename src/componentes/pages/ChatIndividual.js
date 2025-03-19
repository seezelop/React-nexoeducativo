import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Form, Button, ListGroup } from "react-bootstrap";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const ChatIndividual = () => {
  const { mail } = useParams(); // Usuario seleccionado
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoContenido, setNuevoContenido] = useState("");
  const [userEmail, setUserEmail] = useState(""); // Correo del usuario logueado

  // Obtener el correo del usuario logueado
  useEffect(() => {
    const obtenerUsuarioAutenticado = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/usuario/usuarioLogueado", {
          withCredentials: true,
        });
        setUserEmail(response.data); // Suponiendo que el backend devuelve el correo del usuario
      } catch (error) {
        console.error("Error al obtener el usuario autenticado:", error);
      }
    };

    obtenerUsuarioAutenticado();
  }, []);

  // Cargar mensajes
  useEffect(() => {
    const cargarMensajes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/obtenerMensajesEntreUsuarios/${mail}`,
          { withCredentials: true }
        );
        if (response.status === 204) {
          setMensajes([]); // Si no hay contenido, se deja vacío
        } else {
          setMensajes(response.data);
        }
      } catch (error) {
        console.error("Error al cargar los mensajes:", error);
      }
    };

    cargarMensajes();
  }, [mail]);

  // Enviar mensaje
  const enviarMensaje = async () => {
    if (!mensaje.trim()) return;
    if (mensaje.length < 2 || mensaje.length > 255) {
      alert("El mensaje debe tener entre 2 y 255 caracteres.");
      return;
    }

    const nuevoMensaje = { contenido: mensaje, destinatario: mail };

    try {
      await axios.post("http://localhost:8080/nuevoMensaje", nuevoMensaje, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      setMensajes([...mensajes, { idMensaje: Date.now(), contenido: mensaje, mail: userEmail }]);
      setMensaje("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  // Editar mensaje
  const editarMensaje = async (idMensaje, nuevoContenido) => {
    try {
      await axios.patch(
        `http://localhost:8080/editarMensajePrivado/${idMensaje}`,
        nuevoContenido,
        {
          headers: { "Content-Type": "text/plain" },
          withCredentials: true,
        }
      );

      // Actualizar el estado de los mensajes
      setMensajes(mensajes.map((msg) =>
        msg.idMensaje === idMensaje ? { ...msg, contenido: nuevoContenido } : msg
      ));
      setEditandoId(null);
    } catch (error) {
      console.error("Error al editar el mensaje:", error);
    }
  };

  // Borrar mensaje
  const borrarMensaje = async (idMensaje) => {
    try {
      await axios.delete(`http://localhost:8080/borrarMensaje/${idMensaje}`, { withCredentials: true });

      setMensajes(mensajes.filter((msg) => msg.idMensaje !== idMensaje));
    } catch (error) {
      console.error("Error al borrar el mensaje:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">Chat con usuario {mail}</Card.Header>
        <Card.Body>
          <ListGroup>
            {mensajes.length === 0 ? (
              <p>No hay mensajes con este usuario.</p>
            ) : (
              mensajes.map((msg) => {
                
                return (
                  <ListGroup.Item key={msg.idMensaje} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong>{msg.mail}:</strong>{" "}
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
                      {msg.mail === userEmail && ( // Solo mostrar botones si el mensaje fue enviado por el usuario logueado
                        editandoId === msg.idMensaje ? (
                          <>
                            <FaCheck style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => editarMensaje(msg.idMensaje, nuevoContenido)} />
                            <FaTimes style={{ cursor: "pointer" }} onClick={() => setEditandoId(null)} />
                          </>
                        ) : (
                          <>
                            <FaEdit style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => { setEditandoId(msg.idMensaje); setNuevoContenido(msg.contenido); }} />
                            <FaTrash style={{ cursor: "pointer" }} onClick={() => borrarMensaje(msg.idMensaje)} />
                          </>
                        )
                      )}
                    </div>
                  </ListGroup.Item>
                );
              })
            )}
          </ListGroup>
          <Form className="mt-3">
            <Form.Group>
              <Form.Control type="text" value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Escribe un mensaje..." />
            </Form.Group>
            <Button className="mt-2" variant="primary" onClick={enviarMensaje} disabled={mensaje.length < 2 || mensaje.length > 255}>
              Enviar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ChatIndividual;