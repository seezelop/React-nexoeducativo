import React, { useState, useEffect, useCallback } from 'react';
import { Table, Alert, Spinner, Container, Button, Form, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const GestionarAsistenciaProfesor = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState({
    general: false,
    profesores: false,
    asistencias: false,
    guardando: false
  });
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [asistencia, setAsistencia] = useState({});
  const [activeTab, setActiveTab] = useState('tomar');
  const [fechasAsistencias, setFechasAsistencias] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [profesorSeleccionado, setProfesorSeleccionado] = useState('');
  const [planValido, setPlanValido] = useState(null); // null: no verificado, true: válido, false: no válido

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  // Verificar el plan al cargar el componente
  useEffect(() => {
    const verificarPlan = async () => {
      setLoading(prev => ({ ...prev, general: true }));
      try {
        const response = await api.get('/api/usuario/getPlanEscuela', { 
          withCredentials: true 
        });
        setPlanValido(response.data === 2);
      } catch (err) {
        setError('Error al verificar el plan de la escuela');
        setPlanValido(false);
      } finally {
        setLoading(prev => ({ ...prev, general: false }));
      }
    };

    verificarPlan();
  }, [api]);

  // Cargar datos si el plan es válido
  useEffect(() => {
    if (planValido === true) {
      obtenerProfesores();
      if (activeTab === 'modificar') {
        obtenerFechasAsistencias();
      }
    }
  }, [planValido, activeTab, obtenerProfesores, obtenerFechasAsistencias]);

  const obtenerProfesores = useCallback(async () => {
    setLoading(prev => ({ ...prev, profesores: true }));
    try {
      const response = await api.get('/api/usuario/verProfesAdministrativo', { 
        withCredentials: true 
      });
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
      setLoading(prev => ({ ...prev, profesores: false }));
    }
  }, [api]);

  const obtenerFechasAsistencias = useCallback(async () => {
    setLoading(prev => ({ ...prev, asistencias: true }));
    try {
      const response = await api.get('/api/usuario/obtenerAsistenciaProfe', { 
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
      setLoading(prev => ({ ...prev, asistencias: false }));
    }
  }, [api]);

  const obtenerAsistenciasPorFecha = async (fecha) => {
    setLoading(prev => ({ ...prev, asistencias: true }));
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
      setLoading(prev => ({ ...prev, asistencias: false }));
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
    setLoading(prev => ({ ...prev, guardando: true }));
    try {
      const data = {
        alumnosCurso: Object.keys(asistencia).map((id_usuario) => ({
          idUsuario: parseInt(id_usuario),  
          asistio: asistencia[id_usuario].asistio,
          mediaFalta: asistencia[id_usuario].mediaFalta,
          retiroAntes: asistencia[id_usuario].retiroAntes,
        })),
      };
      
      await api.post('/api/usuario/tomarAsistenciaProfesor', data, { 
        withCredentials: true 
      });

      setMensaje('Asistencia registrada correctamente');
      
      // Si se registra correctamente, actualizar la lista de fechas
      if (activeTab === 'modificar') {
        obtenerFechasAsistencias();
      }
    } catch (err) {
      setMensaje('Error al registrar la asistencia: ' + (JSON.stringify(err.response?.data) || err.message));
    } finally {
      setLoading(prev => ({ ...prev, guardando: false }));
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

    setLoading(prev => ({ ...prev, guardando: true }));
    try {
      // Solo enviar la asistencia del profesor seleccionado
      const dataToSend = [{
        idUsuario: parseInt(profesorSeleccionado),
        asistio: asistencia[profesorSeleccionado].asistio,
        mediaFalta: asistencia[profesorSeleccionado].mediaFalta,
        retiroAntes: asistencia[profesorSeleccionado].retiroAntes,
      }];
      
      await api.patch(
        `/api/usuario/editarAsistenciaProfe?fecha=${fechaSeleccionada}`, 
        dataToSend, 
        { withCredentials: true }
      );

      setMensaje('Asistencia editada correctamente');
    } catch (err) {
      setMensaje('Error al editar la asistencia: ' + (JSON.stringify(err.response?.data) || err.message));
    } finally {
      setLoading(prev => ({ ...prev, guardando: false }));
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

  // Si aún no se ha verificado el plan
  if (planValido === null) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
        <p>Verificando permisos...</p>
      </Container>
    );
  }

  // Si el plan no es válido
  if (planValido === false) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <h4>Acceso restringido</h4>
          <p>Su plan escolar no permite acceder a esta funcionalidad.</p>
          <p>Por favor, contacte al administrador para más información.</p>
        </Alert>
      </Container>
    );
  }

  // Si el plan es válido (2), mostrar el componente
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
      
      {loading.general && <Spinner animation="border" />}
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
                          disabled={
                            asistencia[profesor.id_usuario]?.mediaFalta === 1 || 
                            asistencia[profesor.id_usuario]?.retiroAntes === 1
                          }
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={asistencia[profesor.id_usuario]?.mediaFalta === 1}
                          onChange={() => handleCheckboxChange(profesor.id_usuario, 'mediaFalta')}
                          disabled={asistencia[profesor.id_usuario]?.asistio === 1}
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={asistencia[profesor.id_usuario]?.retiroAntes === 1}
                          onChange={() => handleCheckboxChange(profesor.id_usuario, 'retiroAntes')}
                          disabled={asistencia[profesor.id_usuario]?.asistio === 1}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No se encontraron profesores.</p>
            )}
            <Button 
              variant="success" 
              onClick={enviarAsistencia} 
              disabled={loading.guardando}
            >
              {loading.guardando ? 'Guardando...' : 'Registrar Asistencia'}
            </Button>
          </Card.Body>
        </Card>
      )}

      {activeTab === 'modificar' && (
        <Card className="mb-4">
          <Card.Body>
            <h2 className="mb-3">Modificar Asistencia</h2>
            <Form.Group controlId="formFecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control 
                as="select" 
                value={fechaSeleccionada}
                onChange={handleFechaChange}
                disabled={loading.asistencias}
              >
                <option value="">Seleccione una fecha</option>
                {fechasAsistencias.map((fecha) => (
                  <option key={fecha.fecha} value={fecha.fecha}>
                    {fecha.fecha}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {fechaSeleccionada && (
              <>
                <Form.Group controlId="formProfesor">
                  <Form.Label>Profesor</Form.Label>
                  <Form.Control 
                    as="select" 
                    value={profesorSeleccionado}
                    onChange={handleProfesorChange}
                    disabled={loading.asistencias}
                  >
                    <option value="">Seleccione un profesor</option>
                    {profesores.map((profesor) => (
                      <option key={profesor.id_usuario} value={profesor.id_usuario}>
                        {profesor.nombreCompleto || `${profesor.nombre} ${profesor.apellido}`}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                {profesorSeleccionado && (
                  <>
                    <Table striped bordered hover className="mt-4">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Asistió</th>
                          <th>Media Falta</th>
                          <th>Retiro Antes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{getProfesorSeleccionadoData()?.profesor.nombreCompleto || 'N/A'}</td>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={asistencia[profesorSeleccionado]?.asistio === 1}
                              onChange={() => handleCheckboxChange(profesorSeleccionado, 'asistio')}
                            />
                          </td>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={asistencia[profesorSeleccionado]?.mediaFalta === 1}
                              onChange={() => handleCheckboxChange(profesorSeleccionado, 'mediaFalta')}
                            />
                          </td>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={asistencia[profesorSeleccionado]?.retiroAntes === 1}
                              onChange={() => handleCheckboxChange(profesorSeleccionado, 'retiroAntes')}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <Button 
                      variant="success" 
                      onClick={editarAsistencia} 
                      disabled={loading.guardando}
                    >
                      {loading.guardando ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                  </>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default GestionarAsistenciaProfesor;
