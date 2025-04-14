import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Spinner, Card, ListGroup } from 'react-bootstrap';
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function BajaEvento() {
  // Estados
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState('');

  // Cargar cursos al montar el componente
  useEffect(() => {
    cargarCursos();
  }, []);

  // Cargar eventos cuando se selecciona un curso
  useEffect(() => {
    if (cursoSeleccionado) {
      cargarEventos(cursoSeleccionado);
    } else {
      setEventos([]);
      setEventoSeleccionado('');
    }
  }, [cursoSeleccionado]);

  // Función para cargar los cursos del profesor
  const cargarCursos = async () => {
    setCargando(true);
    setMensaje(null);

    try {
      const response = await api.get('/api/usuario/verCursoProfesor', {
        withCredentials: true
      });
      setCursos(response.data);
      setCargando(false);
    } catch (error) {
      console.error('Error al cargar los cursos:', error);
      setMensaje('Error al cargar los cursos. Por favor, intente nuevamente.');
      setTipoMensaje('danger');
      setCargando(false);
    }
  };

  // Función para cargar los eventos de un curso
  const cargarEventos = async (idCurso) => {
    setCargando(true);
    setMensaje(null);

    try {
      const response = await api.get(`/api/usuario/verEventos/${idCurso}`, {
        withCredentials: true
      });
      setEventos(response.data);
      setCargando(false);
    } catch (error) {
      console.error('Error al cargar los eventos:', error);
      setMensaje('Error al cargar los eventos. Por favor, intente nuevamente.');
      setTipoMensaje('danger');
      setCargando(false);
    }
  };

  // Manejar eliminación de evento
  const eliminarEvento = async () => {
    if (!eventoSeleccionado) {
      setMensaje('Por favor, seleccione un evento para eliminar.');
      setTipoMensaje('warning');
      return;
    }

    // Obtener información del evento seleccionado para la confirmación
    const eventoAEliminar = eventos.find(evento => evento.idEvento.toString() === eventoSeleccionado.toString());
    //const nombreEvento = eventoAEliminar ? eventoAEliminar.nombre || `ID: ${eventoSeleccionado}` : `ID: ${eventoSeleccionado}`;

    // Confirmación antes de eliminar
    const confirmar = window.confirm(`¿Está seguro que desea eliminar el evento? Esta acción no se puede deshacer.`);

    if (confirmar) {
      setCargando(true);
      setMensaje(null);

      try {
        await api.delete(`/api/usuario/borrarEvento/${eventoSeleccionado}`, {
          withCredentials: true
        });

        // Recargar eventos después de eliminar
        await cargarEventos(cursoSeleccionado);

        setEventoSeleccionado('');
        setMensaje(`El evento ha sido eliminado con éxito.`);
        setTipoMensaje('success');
        setCargando(false);
      } catch (error) {
        console.error('Error al eliminar el evento:', error);

        // Mostrar mensaje de error específico si está disponible
        let mensajeError = 'Error al eliminar el evento. Por favor, intente nuevamente.';
        if (error.response && error.response.data) {
          mensajeError = `Error: ${error.response.data.mensaje || JSON.stringify(error.response.data)}`;
        }

        setMensaje(mensajeError);
        setTipoMensaje('danger');
        setCargando(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    eliminarEvento();
  };

  return (
    <div className="container mt-4">
      {mensaje && (
        <Alert variant={tipoMensaje} onClose={() => setMensaje(null)} dismissible>
          {mensaje}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Selector de Curso */}
        <Form.Group className="mb-3">
          <Form.Label>Seleccionar Curso</Form.Label>
          <Form.Select
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
            disabled={cargando}
          >
            <option value="">Seleccione un curso</option>
            {cursos.map((curso) => (
              <option key={curso.idCurso} value={curso.idCurso}>
                {curso.numero}{curso.division}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Lista de Eventos */}
        {cursoSeleccionado && (
          <Form.Group className="mb-3">
            <Form.Label>Seleccionar Evento</Form.Label>
            {eventos.length > 0 ? (
              <Card className="border-light bg-transparent">
                <ListGroup variant="flush" className="bg-transparent">
                  {eventos.map((evento) => (
                    <ListGroup.Item
                      key={evento.idEvento}
                      action
                      active={eventoSeleccionado === evento.idEvento.toString()}
                      onClick={() => setEventoSeleccionado(evento.idEvento.toString())}
                      disabled={cargando}
                      style={{
                        backgroundColor: eventoSeleccionado === evento.idEvento.toString() ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                        color: 'white',
                        border: 'none' // Elimina posibles bordes blancos
                      }}
                      className="border-0 text-white bg-transparent"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{evento.descripcion && evento.descripcion.trim() !== '' ? evento.descripcion : 'Evento sin nombre'}</strong>
                        </div>
                        <div>
                          <small>{evento.fecha}</small>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            ) : (
              <Alert variant="info">
                No hay eventos disponibles para este curso.
              </Alert>
            )}
          </Form.Group>
        )}


        {/* Botón de eliminar */}
        <Button
          type="submit"
          variant="danger"
          disabled={cargando || !eventoSeleccionado}
        >
          {cargando ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="ms-2">Procesando...</span>
            </>
          ) : (
            'Eliminar Evento'
          )}
        </Button>
      </Form>
    </div>
  );
}

export default BajaEvento;