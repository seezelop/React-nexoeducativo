import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

// Mover la instancia de axios fuera del componente
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const GestionarAsistenciaAlumnos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');
  const [asistencia, setAsistencia] = useState([]);
  const [fechasAsistencias, setFechasAsistencias] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ text: '', type: '' });

  // Cargar los cursos al iniciar el componente
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await api.get('/api/usuario/verCursoPreceptor', {
          withCredentials: true,
        });
        setCursos(response.data);

        // Verificar si no hay cursos y mostrar mensaje
        if (response.data.length === 0) {
          setMensaje({
            text: 'No tenes cursos asignados',
            type: 'info'
          });
        }
      } catch (error) {
        console.error('Error al obtener cursos:', error);
        setMensaje({ text: 'Hubo un error al cargar los cursos.', type: 'danger' });
      }
    };

    fetchCursos();
  }, []); // Ya no necesitas incluir 'api' como dependencia aquí

  // Obtener los alumnos del curso seleccionado
  const fetchAlumnos = async (cursoId) => {
    if (!cursoId) return;

    setLoading(true);
    try {
      const response = await api.get(`/api/usuario/verAlumnosCurso/${cursoId}`, {
        withCredentials: true,
      });

      const alumnosData = response.data;
      setAlumnos(alumnosData);

      // Inicializar el estado de asistencia para cada alumno
      const asistenciaInicial = alumnosData.map(alumno => ({
        idUsuario: alumno.id_usuario,
        asistio: 0,
        mediaFalta: 0,
        retiroAntes: 0,
      }));

      setAsistencia(asistenciaInicial);
    } catch (error) {
      console.error('Error al obtener alumnos:', error);
      setMensaje({ text: 'Hubo un error al cargar los alumnos del curso.', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  // Obtener fechas de asistencias
  const fetchFechasAsistencias = async (cursoId) => {
    if (!cursoId) return;

    try {
      const response = await api.get(
        `/api/usuario/obtenerAsistencia/${cursoId}`,
        { withCredentials: true }
      );

      // Asegurarse de que siempre trabajamos con un array
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setFechasAsistencias(data);
    } catch (error) {
      console.error('Error al obtener fechas de asistencias:', error);
      setMensaje({ text: 'Hubo un error al cargar las fechas de asistencias.', type: 'danger' });
    }
  };

  // Manejar cambios en la asistencia de un alumno
  const handleAsistenciaChange = (index, field, value) => {
    const updatedAsistencia = [...asistencia];
    updatedAsistencia[index] = {
      ...updatedAsistencia[index],
      [field]: value,
      // Asegurar que solo un campo esté activo a la vez
      ...(field === 'asistio' && { mediaFalta: 0, retiroAntes: 0 }),
      ...(field === 'mediaFalta' && { asistio: 0, retiroAntes: 0 }),
      ...(field === 'retiroAntes' && { asistio: 0, mediaFalta: 0 })
    };
    setAsistencia(updatedAsistencia);
  };

  // Enviar la asistencia al backend (Tomar Asistencia)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cursoSeleccionado) {
      setMensaje({ text: 'Debe seleccionar un curso.', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(
        `/usuario/tomarAsistencia/${cursoSeleccionado}`,
        { alumnosCurso: asistencia },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setMensaje({ text: 'Asistencia registrada correctamente.', type: 'success' });
        // Recargar las fechas después de registrar nueva asistencia
        fetchFechasAsistencias(cursoSeleccionado);
      }
    } catch (error) {
      console.error('Error al registrar asistencia:', error);
      setMensaje({
        text: `Error al registrar la asistencia: ${error.response?.data?.message || error.message}`,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  // Editar la asistencia existente
  const handleEditarAsistencia = async () => {
    if (!cursoSeleccionado || !fechaSeleccionada) {
      setMensaje({ text: 'Debe seleccionar un curso y una fecha.', type: 'warning' });
      return;
    }

    if (!alumnoSeleccionado) {
      setMensaje({ text: 'Debe seleccionar un alumno.', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const alumnoIndex = alumnos.findIndex(a => a.id_usuario === parseInt(alumnoSeleccionado));
      if (alumnoIndex === -1) {
        throw new Error('Alumno no encontrado');
      }

      const asistenciaAlumno = [{
        idUsuario: parseInt(alumnoSeleccionado),
        ...asistencia[alumnoIndex]
      }];

      const response = await api.patch(
        `/usuario/editarAsistencia/${cursoSeleccionado}?fecha=${fechaSeleccionada}`,
        asistenciaAlumno,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setMensaje({ text: 'Asistencia modificada correctamente.', type: 'success' });
      }
    } catch (error) {
      console.error('Error al editar asistencia:', error);
      setMensaje({
        text: `Error al editar la asistencia: ${error.response?.data?.message || error.message}`,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambio de curso (para tomar asistencia)
  const handleCursoChange = (e) => {
    const cursoId = e.target.value;
    setCursoSeleccionado(cursoId);
    setAlumnos([]);
    setAsistencia([]);
    if (cursoId) {
      fetchAlumnos(cursoId);
    }
  };

  // Manejar cambio de curso (para modificar asistencia)
  const handleCursoChangeModificar = (e) => {
    const cursoId = e.target.value;
    setCursoSeleccionado(cursoId);
    setAlumnos([]);
    setFechasAsistencias([]);
    setFechaSeleccionada('');
    setAlumnoSeleccionado('');
    if (cursoId) {
      fetchAlumnos(cursoId);
      fetchFechasAsistencias(cursoId);
    }
  };

  // Manejar cambio de fecha seleccionada
  const handleFechaChange = (e) => {
    setFechaSeleccionada(e.target.value);
  };

  // Manejar cambio de alumno seleccionado
  const handleAlumnoChange = (e) => {
    setAlumnoSeleccionado(e.target.value);
  };

  // Obtener los datos del alumno seleccionado
  const alumnoActual = alumnos.find(a => a.id_usuario === parseInt(alumnoSeleccionado)) || {};
  const asistenciaActual = asistencia.find(a => a.idUsuario === parseInt(alumnoSeleccionado)) || {};

  return (
    <div className="container mt-4 text-white pb-5">
      <h2>Gestionar Asistencia de Alumnos</h2>

      {mensaje.text && <Alert variant={mensaje.type}>{mensaje.text}</Alert>}

      <Card className="mb-4">
        <Card.Body>
          <h4>Tomar Asistencia</h4>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Seleccionar Curso</Form.Label>
                  <Form.Control
                    as="select"
                    value={cursoSeleccionado}
                    onChange={handleCursoChange}
                    disabled={loading}
                  >
                    <option value="">Seleccione un curso</option>
                    {cursos.length > 0 ? (
                      cursos.map(curso => (
                        <option key={curso.idCurso} value={curso.idCurso}>
                          {curso.numero}° {curso.division}
                        </option>
                      ))
                    ) : (
                      <option disabled>No hay cursos disponibles</option>
                    )}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {alumnos.length > 0 && (
              <>
                <h5 className="mt-4">Lista de Alumnos</h5>
                <Table striped bordered hover className="mt-3">
                  <thead>
                    <tr>
                      <th>Alumno</th>
                      <th>Presente</th>
                      <th>Media Falta</th>
                      <th>Retiro Anticipado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumnos.map((alumno, index) => (
                      <tr key={alumno.id_usuario}>
                        <td>{alumno.nombre} {alumno.apellido}</td>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={asistencia[index]?.asistio === 1}
                            onChange={(e) => handleAsistenciaChange(index, 'asistio', e.target.checked ? 1 : 0)}
                          />
                        </td>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={asistencia[index]?.mediaFalta === 1}
                            onChange={(e) => handleAsistenciaChange(index, 'mediaFalta', e.target.checked ? 1 : 0)}
                          />
                        </td>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={asistencia[index]?.retiroAntes === 1}
                            onChange={(e) => handleAsistenciaChange(index, 'retiroAntes', e.target.checked ? 1 : 0)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? 'Registrando...' : 'Registrar Asistencia'}
                </Button>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Body>
          <h4>Modificar Asistencia</h4>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Seleccionar Curso</Form.Label>
                  <Form.Control
                    as="select"
                    value={cursoSeleccionado}
                    onChange={handleCursoChangeModificar}
                    disabled={loading}
                  >
                    <option value="">Seleccione un curso</option>
                    {cursos.length > 0 ? (
                      cursos.map(curso => (
                        <option key={curso.idCurso} value={curso.idCurso}>
                          {curso.numero}° {curso.division}
                        </option>
                      ))
                    ) : (
                      <option disabled>No hay cursos disponibles</option>
                    )}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Seleccionar Fecha</Form.Label>
                  <Form.Control
                    as="select"
                    value={fechaSeleccionada}
                    onChange={handleFechaChange}
                    disabled={loading || !fechasAsistencias.length}
                  >
                    <option value="">Seleccione una fecha</option>
                    {fechasAsistencias.map(fecha => (
                      <option key={fecha.id} value={fecha.fecha}>
                        {fecha.fecha}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Seleccionar Alumno</Form.Label>
                  <Form.Control
                    as="select"
                    value={alumnoSeleccionado}
                    onChange={handleAlumnoChange}
                    disabled={loading || !alumnos.length}
                  >
                    <option value="">Seleccione un alumno</option>
                    {alumnos.map((alumno) => (
                      <option key={alumno.id_usuario} value={alumno.id_usuario}>
                        {alumno.nombre} {alumno.apellido}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {alumnoSeleccionado && (
              <div className="mt-3">
                <h5>{alumnoActual.nombre} {alumnoActual.apellido}</h5>
                <div>
                  <Form.Check
                    type="checkbox"
                    label="Asistió"
                    checked={asistenciaActual.asistio === 1}
                    onChange={(e) => handleAsistenciaChange(
                      alumnos.findIndex(a => a.id_usuario === parseInt(alumnoSeleccionado)),
                      'asistio',
                      e.target.checked ? 1 : 0
                    )}
                  />
                </div>
                <div>
                  <Form.Check
                    type="checkbox"
                    label="Media Falta"
                    checked={asistenciaActual.mediaFalta === 1}
                    onChange={(e) => handleAsistenciaChange(
                      alumnos.findIndex(a => a.id_usuario === parseInt(alumnoSeleccionado)),
                      'mediaFalta',
                      e.target.checked ? 1 : 0
                    )}
                  />
                </div>
                <div>
                  <Form.Check
                    type="checkbox"
                    label="Retiro Anticipado"
                    checked={asistenciaActual.retiroAntes === 1}
                    onChange={(e) => handleAsistenciaChange(
                      alumnos.findIndex(a => a.id_usuario === parseInt(alumnoSeleccionado)),
                      'retiroAntes',
                      e.target.checked ? 1 : 0
                    )}
                  />
                </div>
              </div>
            )}

            <Button variant="primary" onClick={handleEditarAsistencia} disabled={loading}>
              {loading ? 'Editando...' : 'Editar Asistencia'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GestionarAsistenciaAlumnos;
