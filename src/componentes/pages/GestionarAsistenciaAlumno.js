import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table, Card } from 'react-bootstrap';
import axios from 'axios';

const GestionarAsistenciaAlumnos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');
  const [asistencia, setAsistencia] = useState([]);
  const [fechasAsistencias, setFechasAsistencias] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [idAsistenciaSeleccionada, setIdAsistenciaSeleccionada] = useState('');
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
        asistio: 0, // Ausente por defecto
        mediaFalta: 0,
        retiroAntes: 0,
      }));

      setAsistencia(asistenciaInicial);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener alumnos:', error);
      setMensaje({ text: 'Hubo un error al cargar los alumnos del curso.', type: 'danger' });
      setLoading(false);
    }
  };

  // Obtener fechas de asistencias
  const fetchFechasAsistencias = async (cursoId) => {
    if (!cursoId) return;

    try {
      const response = await axios.get(
        `http://localhost:8080/api/usuario/obtenerAsistencias/${cursoId}`,
        { withCredentials: true }
      );
      setFechasAsistencias(response.data);
      console.log('INFO QUE VIENE DESDE OBTENER ASISTENCIAS: ' + JSON.stringify(response.data))
    } catch (error) {
      console.error('Error al obtener fechas de asistencias:', error);
      setMensaje({ text: 'Hubo un error al cargar las fechas de asistencias.', type: 'danger' });
    }
  };

  // Obtener asistencias por fecha
  /*const fetchAsistenciasPorFecha = async (cursoId, idAsistencia) => {
    if (!cursoId || !idAsistencia) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/usuario/obtenerAsistenciasPorFecha/${cursoId}?fecha=${idAsistencia}`,
        { withCredentials: true }
      );

      // Actualizar el estado de asistencia con los datos obtenidos
      const asistenciasData = response.data;
      const asistenciaActualizada = alumnos.map(alumno => {
        const asistenciaAlumno = asistenciasData.find(a => a.idUsuario === alumno.id_usuario);
        return {
          idUsuario: alumno.id_usuario,
          asistio: asistenciaAlumno ? asistenciaAlumno.asistio : 0,
          mediaFalta: asistenciaAlumno ? asistenciaAlumno.mediaFalta : 0,
          retiroAntes: asistenciaAlumno ? asistenciaAlumno.retiroAntes : 0,
        };
      });

      setAsistencia(asistenciaActualizada);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener asistencias por fecha:', error);
      setMensaje({ text: 'Hubo un error al cargar las asistencias.', type: 'danger' });
      setLoading(false);
    }
  };*/

  // Manejar el cambio de curso seleccionado (Tomar Asistencia)
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

  // Manejar el cambio de curso seleccionado (Modificar Asistencia)
  const handleCursoChange2 = async (e) => {
    const cursoId = e.target.value;
    setCursoSeleccionado(cursoId);
    setAlumnoSeleccionado(''); // Resetear el alumno seleccionado
    setFechaSeleccionada(''); // Resetear la fecha seleccionada
    setIdAsistenciaSeleccionada(''); // Resetear el ID de asistencia

    if (cursoId) {
      await fetchAlumnos(cursoId);
      await fetchFechasAsistencias(cursoId);

      /*if (idAsistenciaSeleccionada) {
        await fetchAsistenciasPorFecha(cursoId, idAsistenciaSeleccionada);
      }*/
    } else {
      setAlumnos([]);
      setAsistencia([]);
      setFechasAsistencias([]);
    }
  };

  // Manejar cambios en la asistencia de un alumno
  const handleAsistenciaChange = (index, field, value) => {
    const updatedAsistencia = [...asistencia];

    if (field === 'asistio') {
      updatedAsistencia[index] = {
        ...updatedAsistencia[index],
        asistio: value,
        mediaFalta: value === 1 ? 0 : updatedAsistencia[index].mediaFalta,
        retiroAntes: value === 1 ? 0 : updatedAsistencia[index].retiroAntes,
      };
    } else if (field === 'mediaFalta') {
      updatedAsistencia[index] = {
        ...updatedAsistencia[index],
        mediaFalta: value,
        asistio: value === 1 ? 0 : updatedAsistencia[index].asistio,
        retiroAntes: value === 1 ? 0 : updatedAsistencia[index].retiroAntes,
      };
    } else if (field === 'retiroAntes') {
      updatedAsistencia[index] = {
        ...updatedAsistencia[index],
        retiroAntes: value,
        asistio: value === 1 ? 0 : updatedAsistencia[index].asistio,
        mediaFalta: value === 1 ? 0 : updatedAsistencia[index].mediaFalta,
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
        retiroAntes: 0,
      };
    }

    setAsistencia(updatedAsistencia);
  };

  // Enviar la asistencia al backend (Tomar Asistencia)
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
        alumnosCurso: asistencia,
      };

      console.log('LO QUE SE VA A ENVIAR:', JSON.stringify(dataToSend, null, 2));

      const response = await axios.post(
        `http://localhost:8080/api/usuario/tomarAsistencia/${cursoSeleccionado}`,
        dataToSend,
        { withCredentials: true }
      );

      if (response.status === 201) {
        setMensaje({ text: 'Asistencia registrada correctamente.', type: 'success' });
      }
    } catch (error) {
      console.error('Error al registrar asistencia:', error);
      setMensaje({
        text: `Error al registrar la asistencia: ${error.response?.data || error.message}`,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  // Editar la asistencia (Modificar Asistencia)
  const handleEditarAsistencia = async () => {
    if (!cursoSeleccionado || !fechaSeleccionada || !idAsistenciaSeleccionada) {
      setMensaje({ text: 'Debe seleccionar un curso y una fecha.', type: 'warning' });
      return;
    }
  
    if (asistencia.length === 0) {
      setMensaje({ text: 'No hay alumnos para editar asistencia.', type: 'warning' });
      return;
    }
  
    if (!alumnoSeleccionado) {
      setMensaje({ text: 'Debe seleccionar un alumno para editar su asistencia.', type: 'warning' });
      return;
    }
  
    setLoading(true);
    try {
      // Filtrar solo la asistencia del alumno seleccionado
      const alumnoIndex = alumnos.findIndex(alumno => alumno.id_usuario === parseInt(alumnoSeleccionado));
      
      if (alumnoIndex === -1) {
        setMensaje({ text: 'Alumno no encontrado.', type: 'danger' });
        setLoading(false);
        return;
      }
      
      const asistenciaAlumno = [asistencia[alumnoIndex]];
      
      console.log('SE VA A ENVIAR: ' + JSON.stringify(asistenciaAlumno));
      console.log('VALOR FECHA A ENVIAR: ' + fechaSeleccionada);
      console.log('ID ASISTENCIA A ENVIAR: ' + idAsistenciaSeleccionada);
      
      // Cambiado aquí: Usar fechaSeleccionada en lugar de idAsistenciaSeleccionada
      const response = await axios.patch(
        `http://localhost:8080/api/usuario/editarAsistencia/${cursoSeleccionado}?fecha=${fechaSeleccionada}`,
        asistenciaAlumno,
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        setMensaje({ text: 'Asistencia editada correctamente.', type: 'success' });
      }
    } catch (error) {
      console.error('Error al editar asistencia:', error);
      setMensaje({
        text: `Error al editar la asistencia: ${JSON.stringify(error.response?.data) || error.message}`,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambio de alumno seleccionado
  const handleAlumnoChange = (e) => {
    setAlumnoSeleccionado(e.target.value);
  };

  // Manejar cambio de fecha seleccionada
  const handleFechaChange = (e) => {
    const idAsistencia = e.target.value;
    setIdAsistenciaSeleccionada(idAsistencia);
    
    // Encontrar la fecha correspondiente al ID de asistencia seleccionado
    const asistenciaSeleccionada = fechasAsistencias.find(a => a.idAsistencia === parseInt(idAsistencia));
    if (asistenciaSeleccionada) {
      setFechaSeleccionada(asistenciaSeleccionada.fecha);
    } else {
      setFechaSeleccionada('');
    }
    
    if (cursoSeleccionado && idAsistencia) {
      //fetchAsistenciasPorFecha(cursoSeleccionado, idAsistencia);
    }
  };

  // Obtener el alumno seleccionado para mostrar en la tabla
  const getAlumnoSeleccionadoData = () => {
    if (!alumnoSeleccionado) return null;
    
    const alumnoIndex = alumnos.findIndex(alumno => alumno.id_usuario === parseInt(alumnoSeleccionado));
    if (alumnoIndex === -1) return null;
    
    return {
      alumno: alumnos[alumnoIndex],
      asistencia: asistencia[alumnoIndex],
      index: alumnoIndex
    };
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

      <h2>Modificar Asistencia</h2>
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Seleccionar Curso</Form.Label>
                <Form.Control
                  as="select"
                  value={cursoSeleccionado}
                  onChange={handleCursoChange2}
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
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Seleccionar Fecha</Form.Label>
                <Form.Control
                  as="select"
                  value={idAsistenciaSeleccionada}
                  onChange={handleFechaChange}
                  required
                  className="form-select"
                >
                  <option value="">Seleccione una fecha</option>
                  {fechasAsistencias.map((asistencia, index) => (
                    <option key={index} value={asistencia.idAsistencia}>
                      {asistencia.fecha}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Seleccionar Alumno</Form.Label>
                <Form.Control
                  as="select"
                  value={alumnoSeleccionado}
                  onChange={handleAlumnoChange}
                  required
                  className="form-select"
                  disabled={!cursoSeleccionado || !idAsistenciaSeleccionada}
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

          {alumnoSeleccionado && alumnos.length > 0 && (
            <>
              <h4 className="mt-4">Modificar Asistencia del Alumno</h4>
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
                  {(() => {
                    const alumnoData = getAlumnoSeleccionadoData();
                    if (!alumnoData) return null;
                    
                    return (
                      <tr key={alumnoData.alumno.id_usuario}>
                        <td>{alumnoData.alumno.nombre} {alumnoData.alumno.apellido}</td>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={alumnoData.asistencia?.asistio === 1}
                            onChange={(e) =>
                              handleAsistenciaChange(alumnoData.index, 'asistio', e.target.checked ? 1 : 0)
                            }
                            disabled={alumnoData.asistencia?.mediaFalta === 1 || alumnoData.asistencia?.retiroAntes === 1}
                          />
                        </td>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={alumnoData.asistencia?.mediaFalta === 1}
                            onChange={(e) =>
                              handleAsistenciaChange(alumnoData.index, 'mediaFalta', e.target.checked ? 1 : 0)
                            }
                            disabled={alumnoData.asistencia?.asistio === 1 || alumnoData.asistencia?.retiroAntes === 1}
                          />
                        </td>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={alumnoData.asistencia?.retiroAntes === 1}
                            onChange={(e) =>
                              handleAsistenciaChange(alumnoData.index, 'retiroAntes', e.target.checked ? 1 : 0)
                            }
                            disabled={alumnoData.asistencia?.asistio === 1 || alumnoData.asistencia?.mediaFalta === 1}
                          />
                        </td>
                      </tr>
                    );
                  })()}
                </tbody>
              </Table>

              <Button
                variant="warning"
                onClick={handleEditarAsistencia}
                disabled={loading || !fechaSeleccionada || !alumnoSeleccionado}
                className="mt-3"
              >
                {loading ? 'Editando...' : 'Editar Asistencia'}
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default GestionarAsistenciaAlumnos;