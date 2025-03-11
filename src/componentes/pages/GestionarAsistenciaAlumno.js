import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table, Card } from 'react-bootstrap';
import axios from 'axios';

const GestionarAsistenciaAlumnos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [asistencia, setAsistencia] = useState([]);
  // const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ text: '', type: '' });

  // Cargar los cursos al iniciar el componente
  useEffect(() => {
    fetchCursos();
  }, []);

  // Obtener los cursos asignados al preceptor
  const fetchCursos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/usuario/verCursoPreceptor', {
        withCredentials: true,
      });
      setCursos(response.data);
    } catch (error) {
      console.error('Error al obtener cursos:', error);
      setMensaje({ text: 'Hubo un error al cargar los cursos.', type: 'danger' });
    }
  };

  // Obtener los alumnos del curso seleccionado
  const fetchAlumnos = async (cursoId) => {
    if (!cursoId) return;

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/usuario/verAlumnosCurso/${cursoId}`, {
        withCredentials: true,
      });

      const alumnosData = response.data;
      setAlumnos(alumnosData);

      // Inicializar el estado de asistencia para cada alumno
      const asistenciaInicial = alumnosData.map(alumno => ({
        idUsuario: alumno.id_usuario,
        asistio: 0,         // ausente por defecto
        mediaFalta: 0,    
        retiroAntes: 0     
      }));

      setAsistencia(asistenciaInicial);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener alumnos:', error);
      setMensaje({ text: 'Hubo un error al cargar los alumnos del curso.', type: 'danger' });
      setLoading(false);
    }
  };

  // Manejar el cambio de curso seleccionado
  const handleCursoChange = (e) => {
    const cursoId = e.target.value;
    setCursoSeleccionado(cursoId);
    if (cursoId) {
      fetchAlumnos(cursoId);
    } else {
      setAlumnos([]);
      setAsistencia([]);
    }
  };

  // Manejar cambios en la asistencia de un alumno
  const handleAsistenciaChange = (index, field, value) => {
    const updatedAsistencia = [...asistencia];

    // Si se selecciona "Presente"
    if (field === 'asistio') {
      updatedAsistencia[index] = {
        ...updatedAsistencia[index],
        asistio: value,
        mediaFalta: value === 1 ? 0 : updatedAsistencia[index].mediaFalta,
        retiroAntes: value === 1 ? 0 : updatedAsistencia[index].retiroAntes
      };
    }
    // Si se selecciona "Media Falta"
    else if (field === 'mediaFalta') {
      updatedAsistencia[index] = {
        ...updatedAsistencia[index],
        mediaFalta: value,
        asistio: value === 1 ? 0 : updatedAsistencia[index].asistio,
        retiroAntes: value === 1 ? 0 : updatedAsistencia[index].retiroAntes
      };
    }
    // Si se selecciona "Retiro Antes"
    else if (field === 'retiroAntes') {
      updatedAsistencia[index] = {
        ...updatedAsistencia[index],
        retiroAntes: value,
        asistio: value === 1 ? 0 : updatedAsistencia[index].asistio,
        mediaFalta: value === 1 ? 0 : updatedAsistencia[index].mediaFalta
      };
    }

    // Si ninguna opción está seleccionada, establecer todas en 0
    if (
      updatedAsistencia[index].asistio === 0 &&
      updatedAsistencia[index].mediaFalta === 0 &&
      updatedAsistencia[index].retiroAntes === 0
    ) {
      updatedAsistencia[index] = {
        ...updatedAsistencia[index],
        asistio: 0,
        mediaFalta: 0,
        retiroAntes: 0
      };
    }

    setAsistencia(updatedAsistencia);
  };

  // Enviar la asistencia al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cursoSeleccionado) {
      setMensaje({ text: 'Debe seleccionar un curso.', type: 'warning' });
      return;
    }

    if (asistencia.length === 0) {
      setMensaje({ text: 'No hay alumnos para registrar asistencia.', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        //fecha: fecha,
        alumnosCurso: asistencia
      };

      console.log('LO QUE SE VA A ENVIAR: '+JSON.stringify(dataToSend))
      const response = await axios.post(
        `http://localhost:8080/api/usuario/tomarAsistencia/${cursoSeleccionado}`,
        dataToSend,
        { withCredentials: true }
      );

      if (response.status === 201) {
        setMensaje({ text: 'Asistencia registrada correctamente.', type: 'success' });
        // Reiniciar formulario o redirigir según necesidad
      }
    } catch (error) {
      console.error('Error al registrar asistencia:', error);
      setMensaje({
        text: `Error al registrar la asistencia: ${error.response?.data || error.message}`,
        type: 'danger'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Tomar Asistencia</h2>

      {mensaje.text && (
        <div className={`alert alert-${mensaje.type}`}>
          {mensaje.text}
        </div>
      )}

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Seleccionar Curso</Form.Label>
                  <Form.Control
                    as="select"
                    value={cursoSeleccionado}
                    onChange={handleCursoChange}
                    required
                    className="form-select"
                  >
                    <option value="">Seleccione un curso</option>
                    {cursos.map((curso) => (
                      <option key={curso.idCurso} value={curso.idCurso}>
                        {curso.numero + curso.division}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {alumnos.length > 0 ? (
              <>
                <h4 className="mt-4">Lista de Alumnos</h4>
                <Table striped bordered hover responsive>
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
                            onChange={(e) =>
                              handleAsistenciaChange(index, 'asistio', e.target.checked ? 1 : 0)
                            }
                            disabled={asistencia[index]?.mediaFalta === 1 || asistencia[index]?.retiroAntes === 1}
                          />
                        </td>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={asistencia[index]?.mediaFalta === 1}
                            onChange={(e) =>
                              handleAsistenciaChange(index, 'mediaFalta', e.target.checked ? 1 : 0)
                            }
                            disabled={asistencia[index]?.asistio === 1 || asistencia[index]?.retiroAntes === 1}
                          />
                        </td>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={asistencia[index]?.retiroAntes === 1}
                            onChange={(e) =>
                              handleAsistenciaChange(index, 'retiroAntes', e.target.checked ? 1 : 0)
                            }
                            disabled={asistencia[index]?.asistio === 1 || asistencia[index]?.mediaFalta === 1}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="mt-3"
                >
                  {loading ? 'Registrando...' : 'Registrar Asistencia'}
                </Button>
              </>
            ) : cursoSeleccionado ? (
              loading ? (
                <p className="text-center mt-4">Cargando alumnos...</p>
              ) : (
                <p className="text-center mt-4">No hay alumnos registrados en este curso.</p>
              )
            ) : (
              <p className="text-center mt-4">Seleccione un curso para ver los alumnos.</p>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GestionarAsistenciaAlumnos;