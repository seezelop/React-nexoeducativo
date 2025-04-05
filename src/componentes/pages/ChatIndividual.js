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
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const obtenerUsuarioAutenticado = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/usuario/usuarioLogueado", {
          withCredentials: true,
        });
        setUserEmail(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario autenticado:", error);
      }
    };

    obtenerUsuarioAutenticado();
  }, []);

  useEffect(() => {
    const cargarMensajes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/obtenerMensajesEntreUsuarios/${mail}`,
          { withCredentials: true }
        );
        setMensajes(response.status === 204 ? [] : response.data);
      } catch (error) {
        console.error("Error al cargar los mensajes:", error);
      }
    };

    cargarMensajes();
  }, [mail]);

  const enviarMensaje = async () => {
    if (!mensaje.trim() || mensaje.length < 2 || mensaje.length > 255) {
      alert("El mensaje debe tener entre 2 y 255 caracteres.");
      return;
    }

    const nuevoMensaje = { contenido: mensaje, destinatario: mail };

    try {
      const response = await axios.post("http://localhost:8080/nuevoMensaje", nuevoMensaje, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      
      // Si el backend devuelve el mensaje creado, usamos eso
      if (response.data) {
        setMensajes([...mensajes, response.data]);
      } else {
        // Si no, creamos uno temporal con la información que tenemos
        setMensajes([...mensajes, { 
          idMensaje: Date.now(), 
          contenido: mensaje, 
          mail: userEmail  // Asegúrate de que este es el correo y no el ID
        }]);
      }
      setMensaje("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const editarMensaje = async (idMensaje, nuevoContenido) => {
    try {
      // Convertir idMensaje a número si es una cadena
      const id = typeof idMensaje === 'string' ? parseInt(idMensaje, 10) : idMensaje;
      
      await axios.patch(`http://localhost:8080/editarMensajePrivado/${id}`, nuevoContenido, {
        headers: { "Content-Type": "text/plain" },
        withCredentials: true,
      });

      setMensajes(mensajes.map((msg) =>
        msg.idMensaje === idMensaje ? { ...msg, contenido: nuevoContenido } : msg
      ));
      setEditandoId(null);
    } catch (error) {
      console.error("Error al editar el mensaje:", error);
      alert("Error al editar el mensaje. Verifica la consola para más detalles.");
    }
  };

  const borrarMensaje = async (idMensaje) => {
    try {
      // Convertir idMensaje a número si es una cadena
      const id = typeof idMensaje === 'string' ? parseInt(idMensaje, 10) : idMensaje;
      
      await axios.delete(`http://localhost:8080/borrarMensaje/${id}`, { 
        withCredentials: true 
      });
      
      setMensajes(mensajes.filter((msg) => msg.idMensaje !== idMensaje));
    } catch (error) {
      console.error("Error al borrar el mensaje:", error);
      alert("Error al borrar el mensaje. Verifica la consola para más detalles.");
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{
        width: "60%",
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
        border: "none",
        backgroundColor: "#f9fafb"
      }}>
        {/* Header */}
        <Card.Header as="h5" className="text-center bg-gradient-primary text-white" 
          style={{ 
            borderTopLeftRadius: "20px", 
            borderTopRightRadius: "20px", 
            padding: "15px", 
            fontSize: "1.5rem",
            background: "linear-gradient(90deg, #6a11cb, #2575fc)"
          }}>
          Chat con {mail}
        </Card.Header>

        {/* Body */}
        <Card.Body style={{ maxHeight: "500px", overflowY: "auto", padding: "20px" }}>
          <ListGroup variant="flush">
            {mensajes.length === 0 ? (
              <p className="text-center text-muted" style={{ fontStyle: "italic", fontSize: "1.1rem" }}>
                No hay mensajes aún.
              </p>
            ) : (
              mensajes.map((msg) => (
                <ListGroup.Item
                  key={msg.idMensaje}
                  className={`mb-3 p-3 rounded ${msg.mail === userEmail ? "bg-light-primary" : "bg-light-secondary"}`}
                  style={{
                    maxWidth: "80%",
                    marginLeft: msg.mail === userEmail ? "auto" : "0",
                    marginRight: msg.mail !== userEmail ? "auto" : "0",
                    position: "relative",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s ease-in-out",
                    transform: "scale(1)",
                    animation: "fadeIn 0.5s ease-in-out",
                    backgroundColor: msg.mail === userEmail ? "#e6f7ff" : "#f0f2f5"
                  }}
                >
                  {/* Message Content */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong style={{ fontSize: "0.9rem", color: "#555" }}>
                      {/* Asegúrate de que aquí se muestre el correo y no el ID */}
                      {msg.mail || userEmail}:
                    </strong>
                    {editandoId === msg.idMensaje ? (
                      <input
                        type="text"
                        value={nuevoContenido}
                        onChange={(e) => setNuevoContenido(e.target.value)}
                        className="form-control mt-2"
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "20px",
                          border: "1px solid #ddd",
                          outline: "none",
                          transition: "border-color 0.2s ease-in-out"
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: "1rem", color: "#333" }}>{msg.contenido}</span>
                    )}
                  </div>

                  {/* Edit/Delete Buttons */}
                  <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                    {msg.mail === userEmail && (
                      editandoId === msg.idMensaje ? (
                        <>
                          <FaCheck
                            className="text-success"
                            style={{ cursor: "pointer", fontSize: "1.2rem" }}
                            onClick={() => editarMensaje(msg.idMensaje, nuevoContenido)}
                          />
                          <FaTimes
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "1.2rem" }}
                            onClick={() => setEditandoId(null)}
                          />
                        </>
                      ) : (
                        <>
                          <FaEdit
                            className="text-info"
                            style={{ cursor: "pointer", fontSize: "1.2rem" }}
                            onClick={() => {
                              setEditandoId(msg.idMensaje);
                              setNuevoContenido(msg.contenido);
                            }}
                          />
                          <FaTrash
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "1.2rem" }}
                            onClick={() => borrarMensaje(msg.idMensaje)}
                          />
                        </>
                      )
                    )}
                  </div>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Card.Body>

        {/* Input Section */}
        <Card.Footer className="p-3" style={{ borderTop: "1px solid #ddd" }}>
          <Form className="d-flex align-items-center">
            <Form.Control
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="me-2"
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                outline: "none",
                transition: "border-color 0.2s ease-in-out",
                fontSize: "1rem"
              }}
            />
            <Button
              variant="primary"
              onClick={enviarMensaje}
              disabled={mensaje.length < 2 || mensaje.length > 255}
              style={{
                padding: "10px 20px",
                borderRadius: "20px",
                fontSize: "1rem",
                backgroundColor: "#2575fc",
                borderColor: "#2575fc",
                fontWeight: "bold",
                transition: "background-color 0.2s ease-in-out"
              }}
            >
              Enviar
            </Button>
          </Form>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ChatIndividual;