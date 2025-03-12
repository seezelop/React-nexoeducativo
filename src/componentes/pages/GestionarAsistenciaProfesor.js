import React, { useState, useEffect } from 'react';
import { Table, Alert, Spinner, Container, Button, Form, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const GestionarAsistenciaProfesor = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [asistencia, setAsistencia] = useState({});
  const [activeTab, setActiveTab] = useState('tomar'); // 'tomar' or 'modificar'
  const [fechasAsistencias, setFechasAsistencias] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [profesorSeleccionado, setProfesorSeleccionado] = useState('');

  useEffect(() => {
    obtenerProfesores();
    if (activeTab === 'modificar') {
      obtenerFechasAsistencias();
    }
  }, [activeTab]);

  const obtenerProfesores = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/usuario/verProfesAdministrativo', { withCredentials: true });
      setProfesores(response.data);
      
      // Inicializar asistencia para cada profesor
      const asistenciaInicial = response.data.reduce((acc, profe) => {
        acc[profe.id_usuario] = { asistio: 0, mediaFalta: 0, retiroAntes: 0 };
        return acc;
      }, {});
      setAsistencia(asistenciaInicial);
    } catch (err) {
      setError('Error al cargar los profesores: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  const obtenerFechasAsistencias = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/usuario/obtenerAsistenciasProfe', { 
        withCredentials: true 
      });
      
      setFechasAsistencias(response.data);
    } catch (err) {
      if (err.response?.status === 204) {
        setFechasAsistencias([]);
      } else {
        setError('Error al cargar las fechas de asistencias: ' + (err.response?.data || err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  const obtenerAsistenciasPorFecha = async (fecha) => {
    setLoading(true);
    try {
      // Reiniciar asistencia a ceros
      const asistenciaInicial = profesores.reduce((acc, profe) => {
        acc[profe.id_usuario] = { asistio: 0, mediaFalta: 0, retiroAntes: 0 };
        return acc;
      }, {});
      
      // Buscar en fechasAsistencias los registros para esta fecha
      const asistenciasFecha = fechasAsistencias.find(a => a.fecha === fecha);
      
      if (asistenciasFecha && asistenciasFecha.asistencias) {
        // Actualizar el estado con los datos obtenidos
        asistenciasFecha.asistencias.forEach(registro => {
          if (asistenciaInicial[registro.idUsuario]) {
            asistenciaInicial[registro.idUsuario] = {
              asistio: registro.asistio,
              mediaFalta: registro.mediaFalta,
              retiroAntes: registro.retiroAntes
            };
          }
        });
      }
      
      setAsistencia(asistenciaInicial);
    } catch (err) {
      setError('Error al obtener asistencias: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id_usuario, campo) => {
    setAsistencia((prev) => {
      const nuevoEstado = { asistio: 0, mediaFalta: 0, retiroAntes: 0 };
      nuevoEstado[campo] = prev[id_usuario][campo] === 1 ? 0 : 1;
      return { ...prev, [id_usuario]: nuevoEstado };
    });
  };

  const enviarAsistencia = async () => {
    setLoading(true);
    try {
      const data = {
        alumnosCurso: Object.keys(asistencia).map((id_usuario) => ({
          idUsuario: parseInt(id_usuario),  
          asistio: asistencia[id_usuario].asistio,
          mediaFalta: asistencia[id_usuario].mediaFalta,
          retiroAntes: asistencia[id_usuario].retiroAntes,
        })),
      };
      
      console.log('esto se va a enviar: '+JSON.stringify(data));
      
      await axios.post('http://localhost:8080/api/usuario/tomarAsistenciaProfesor', data, { withCredentials: true });

      setMensaje('Asistencia registrada correctamente');
      
      // Si se registra correctamente, actualizar la lista de fechas
      if (activeTab === 'modificar') {
        obtenerFechasAsistencias();
      }
    } catch (err) {
      setMensaje('Error al registrar la asistencia: ' + (JSON.stringify(err.response?.data) || err.message));
    } finally {
      setLoading(false);
    }
  };

  const editarAsistencia = async () => {
    if (!fechaSeleccionada) {
      setMensaje('Por favor, seleccione una fecha');
      return;
    }

    if (!profesorSeleccionado) {
      setMensaje('Por favor, seleccione un profesor');
      return;
    }

    setLoading(true);
    try {
      // Solo enviar la asistencia del profesor seleccionado
      const dataToSend = [{
        idUsuario: parseInt(profesorSeleccionado),
        asistio: asistencia[profesorSeleccionado].asistio,
        mediaFalta: asistencia[profesorSeleccionado].mediaFalta,
        retiroAntes: asistencia[profesorSeleccionado].retiroAntes,
      }];

      console.log('Datos a enviar para edición:', JSON.stringify(dataToSend));
      console.log('Fecha seleccionada:', fechaSeleccionada);
      
      // Formato de fecha esperado por el backend: yyyy-MM-dd
      // Asegurarse de que fechaSeleccionada está en el formato correcto
      await axios.patch(
        `http://localhost:8080/api/usuario/editarAsistenciaProfe?fecha=${fechaSeleccionada}`, 
        dataToSend, 
        { withCredentials: true }
      );

      setMensaje('Asistencia editada correctamente');
    } catch (err) {
      setMensaje('Error al editar la asistencia: ' + (JSON.stringify(err.response?.data) || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleFechaChange = (e) => {
    const fecha = e.target.value;
    setFechaSeleccionada(fecha);
    if (fecha) {
      obtenerAsistenciasPorFecha(fecha);
    }
  };

  const handleProfesorChange = (e) => {
    setProfesorSeleccionado(e.target.value);
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
    // Limpiar mensajes y errores al cambiar de pestaña
    setMensaje('');
    setError(null);
  };

  const getProfesorSeleccionadoData = () => {
    if (!profesorSeleccionado) return null;
    
    const profesor = profesores.find(p => p.id_usuario === parseInt(profesorSeleccionado));
    if (!profesor) return null;
    
    return {
      profesor,
      asistencia: asistencia[profesor.id_usuario]
    };
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Gestión de Asistencia de Profesores</h1>
      
      <div className="mb-3">
        <Button 
          variant={activeTab === 'tomar' ? 'primary' : 'outline-primary'} 
          className="me-2" 
          onClick={() => toggleTab('tomar')}
        >
          Tomar Asistencia
        </Button>
        <Button 
          variant={activeTab === 'modificar' ? 'primary' : 'outline-primary'} 
          onClick={() => toggleTab('modificar')}
        >
          Modificar Asistencia
        </Button>
      </div>
      
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {mensaje && <Alert variant={mensaje.includes('Error') ? 'danger' : 'success'}>{mensaje}</Alert>}

      {activeTab === 'tomar' && (
        <Card className="mb-4">
          <Card.Body>
            <h2 className="mb-3">Tomar Asistencia</h2>
            {profesores.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Asistió</th>
                    <th>Media Falta</th>
                    <th>Retiro Antes</th>
                  </tr>
                </thead>
                <tbody>
                  {profesores.map((profesor) => (
                    <tr key={profesor.id_usuario}>
                      <td>{profesor.nombreCompleto || `${profesor.nombre} ${profesor.apellido}`}</td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={asistencia[profesor.id_usuario]?.asistio === 1}
                          onChange={() => handleCheckboxChange(profesor.id_usuario, 'asistio')}
                          disabled={asistencia[profesor.id_usuario]?.mediaFalta === 1 || asistencia[profesor.id_usuario]?.retiroAntes === 1}
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={asistencia[profesor.id_usuario]?.mediaFalta === 1}
                          onChange={() => handleCheckboxChange(profesor.id_usuario, 'mediaFalta')}
                          disabled={asistencia[profesor.id_usuario]?.asistio === 1 || asistencia[profesor.id_usuario]?.retiroAntes === 1}
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={asistencia[profesor.id_usuario]?.retiroAntes === 1}
                          onChange={() => handleCheckboxChange(profesor.id_usuario, 'retiroAntes')}
                          disabled={asistencia[profesor.id_usuario]?.asistio === 1 || asistencia[profesor.id_usuario]?.mediaFalta === 1}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              !loading && <Alert variant="warning">No hay profesores disponibles</Alert>
            )}

            <Button className="mt-3" onClick={enviarAsistencia} disabled={loading || profesores.length === 0}>
              {loading ? 'Procesando...' : 'Registrar Asistencia'}
            </Button>
          </Card.Body>
        </Card>
      )}

      {activeTab === 'modificar' && (
        <Card className="mb-4">
          <Card.Body>
            <h2 className="mb-3">Modificar Asistencia</h2>
            
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Seleccionar Fecha</Form.Label>
                  <Form.Control
                    as="select"
                    value={fechaSeleccionada}
                    onChange={handleFechaChange}
                    className="form-select"
                  >
                    <option value="">Seleccione una fecha</option>
                    {fechasAsistencias.map((asistencia, index) => (
                      <option key={index} value={asistencia.fecha}>
                        {asistencia.fecha}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Seleccionar Profesor</Form.Label>
                  <Form.Control
                    as="select"
                    value={profesorSeleccionado}
                    onChange={handleProfesorChange}
                    disabled={!fechaSeleccionada}
                    className="form-select"
                  >
                    <option value="">Seleccione un profesor</option>
                    {profesores.map((profesor) => (
                      <option key={profesor.id_usuario} value={profesor.id_usuario}>
                        {profesor.nombreCompleto || `${profesor.nombre} ${profesor.apellido}`}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {fechaSeleccionada && profesorSeleccionado && (
              <>
                <h4 className="mt-4">Modificar Asistencia del Profesor</h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Profesor</th>
                      <th>Presente</th>
                      <th>Media Falta</th>
                      <th>Retiro Anticipado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const profesorData = getProfesorSeleccionadoData();
                      if (!profesorData) return null;
                      
                      return (
                        <tr key={profesorData.profesor.id_usuario}>
                          <td>
                            {profesorData.profesor.nombreCompleto || 
                              `${profesorData.profesor.nombre} ${profesorData.profesor.apellido}`}
                          </td>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={profesorData.asistencia?.asistio === 1}
                              onChange={() => handleCheckboxChange(profesorData.profesor.id_usuario, 'asistio')}
                              disabled={
                                profesorData.asistencia?.mediaFalta === 1 || 
                                profesorData.asistencia?.retiroAntes === 1
                              }
                            />
                          </td>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={profesorData.asistencia?.mediaFalta === 1}
                              onChange={() => handleCheckboxChange(profesorData.profesor.id_usuario, 'mediaFalta')}
                              disabled={
                                profesorData.asistencia?.asistio === 1 || 
                                profesorData.asistencia?.retiroAntes === 1
                              }
                            />
                          </td>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={profesorData.asistencia?.retiroAntes === 1}
                              onChange={() => handleCheckboxChange(profesorData.profesor.id_usuario, 'retiroAntes')}
                              disabled={
                                profesorData.asistencia?.asistio === 1 || 
                                profesorData.asistencia?.mediaFalta === 1
                              }
                            />
                          </td>
                        </tr>
                      );
                    })()}
                  </tbody>
                </Table>

                <Button
                  variant="warning"
                  onClick={editarAsistencia}
                  disabled={loading || !fechaSeleccionada || !profesorSeleccionado}
                  className="mt-3"
                >
                  {loading ? 'Editando...' : 'Editar Asistencia'}
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default GestionarAsistenciaProfesor;
