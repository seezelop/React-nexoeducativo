import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaPaperPlane } from "react-icons/fa";

// ✅ Instancia axios fuera del componente
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const ChatIndividual = () => {
  const { mail: mailDestinatario } = useParams();
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoContenido, setNuevoContenido] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener usuario logueado
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await api.get(
          "/api/usuario/usuarioLogueado",
          { withCredentials: true }
        );
        setUserEmail(response.data);
        //console.log("Usuario logueado:", response.data);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
        setError("No se pudo cargar la información del usuario");
      }
    };
    fetchUserEmail();
  }, []);

  // Cargar mensajes
  useEffect(() => {
    if (!userEmail) return;

    const fetchMensajes = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/obtenerMensajesEntreUsuarios/${mailDestinatario}`,
          { withCredentials: true }
        );
        const data = response.status === 204 ? [] : response.data;
       // console.log("Mensajes recibidos:", JSON.stringify(data));
        setMensajes(data);
      } catch (err) {
        console.error("Error al cargar mensajes:", err);
        setError("No se pudieron cargar los mensajes");
      } finally {
        setLoading(false);
      }
    };

    fetchMensajes();
  }, [userEmail, mailDestinatario]);

  const esMensajePropio = (mensaje) => {
    const esPropio = mensaje.mail === userEmail;
    return esPropio;
  };

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!mensaje.trim() || mensaje.length < 2 || mensaje.length > 255) {
      alert("El mensaje debe tener entre 2 y 255 caracteres");
      return;
    }

    try {
      setLoading(true);
      await api.post(
        "/nuevoMensaje",
        { contenido: mensaje, destinatario: mailDestinatario },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      const response = await api.get(
        `/obtenerMensajesEntreUsuarios/${mailDestinatario}`,
        { withCredentials: true }
      );
      setMensajes(response.status === 204 ? [] : response.data);
      setMensaje("");
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
      alert("Error al enviar el mensaje");
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = async (id) => {
    if (!nuevoContenido.trim()) {
      alert("El mensaje no puede estar vacío");
      return;
    }

    try {
      setLoading(true);
      await api.patch(
        `/editarMensajePrivado/${id}`,
        nuevoContenido,
        { withCredentials: true, headers: { "Content-Type": "text/plain" } }
      );

      setMensajes(mensajes.map(msg =>
        msg.idMensaje === id ? { ...msg, contenido: nuevoContenido } : msg
      ));
      setEditandoId(null);
    } catch (err) {
      console.error("Error al editar mensaje:", err);
      alert("Error al editar el mensaje");
    } finally {
      setLoading(false);
    }
  };

  const handleBorrar = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este mensaje?")) return;

    try {
      setLoading(true);
      await api.delete(
        `/borrarMensaje/${id}`,
        { withCredentials: true }
      );

      setMensajes(mensajes.filter(msg => msg.idMensaje !== id));
    } catch (err) {
      console.error("Error al borrar mensaje:", err);
      alert("Error al borrar el mensaje");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Chat con {mailDestinatario}</h5>
        </Card.Header>

        <Card.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {loading && mensajes.length === 0 ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Cargando mensajes...</p>
            </div>
          ) : mensajes.length === 0 ? (
            <p className="text-center text-muted">No hay mensajes aún</p>
          ) : (
            mensajes.map((msg) => (
              <div
                key={msg.idMensaje}
                className={`mb-3 p-3 rounded ${esMensajePropio(msg) ? "bg-light align-self-end" : "bg-white"}`}
                style={{
                  maxWidth: "75%",
                  border: "1px solid #dee2e6",
                  marginLeft: esMensajePropio(msg) ? "auto" : "0",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className={`font-weight-bold ${esMensajePropio(msg) ? "text-primary" : "text-secondary"}`}>
                    {esMensajePropio(msg) ? "Tú" : msg.mail}
                  </small>
                </div>

                {editandoId === msg.idMensaje ? (
                  <div className="d-flex align-items-center gap-2">
                    <Form.Control
                      type="text"
                      value={nuevoContenido}
                      onChange={(e) => setNuevoContenido(e.target.value)}
                      className="flex-grow-1"
                    />
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleEditar(msg.idMensaje)}
                      disabled={loading}
                    >
                      <FaCheck />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setEditandoId(null)}
                      disabled={loading}
                    >
                      <FaTimes />
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">{msg.contenido}</p>
                    {esMensajePropio(msg) && (
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => {
                            setEditandoId(msg.idMensaje);
                            setNuevoContenido(msg.contenido);
                          }}
                          disabled={loading}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleBorrar(msg.idMensaje)}
                          disabled={loading}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </Card.Body>

        <Card.Footer>
          <Form onSubmit={enviarMensaje} className="d-flex gap-2">
            <Form.Control
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe tu mensaje..."
              disabled={loading}
            />
            <Button
              variant="primary"
              type="submit"
              disabled={mensaje.length < 2 || mensaje.length > 255 || loading}
            >
              <FaPaperPlane />
            </Button>
          </Form>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ChatIndividual;
