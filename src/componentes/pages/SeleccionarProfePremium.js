import React, { useState, useEffect, useRef } from 'react';
import { Alert, Spinner, Container, Form, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const SeleccionarProfePremium = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState({
    general: false,
    profesores: false,
    info: false
  });
  const [error, setError] = useState(null);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState('');
  const [infoProfesor, setInfoProfesor] = useState(null);
  const [planValido, setPlanValido] = useState(null); // null: no verificado, true: válido, false: no válido
  
  // Referencias para controlar si ya se ejecutaron las llamadas y para mantener la instancia de API
  const planVerificado = useRef(false);
  const profesoresCargados = useRef(false);
  const apiRef = useRef(null);

  // Inicializar la API una vez
  useEffect(() => {
    if (!apiRef.current) {
      apiRef.current = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
      });
    }
  }, []);

  // Verificar el plan al cargar el componente
  useEffect(() => {
    // Evitar llamadas repetidas si ya se verificó el plan
    if (planVerificado.current || !apiRef.current) return;
    
    const verificarPlan = async () => {
      setLoading(prev => ({ ...prev, general: true }));
      try {
        const response = await apiRef.current.get('/api/usuario/getPlanEscuela', {
          withCredentials: true
        });
        setPlanValido(response.data === 2);
        planVerificado.current = true; // Marcar como verificado
      } catch (err) {
        setError('Error al verificar el plan de la escuela: ' + (err.response?.data || err.message));
        setPlanValido(false);
      } finally {
        setLoading(prev => ({ ...prev, general: false }));
      }
    };

    verificarPlan();
  }, []);

  // Cargar profesores solo si el plan es válido
  useEffect(() => {
    if (planValido && !profesoresCargados.current && apiRef.current) {
      const cargarProfesores = async () => {
        setLoading(prev => ({ ...prev, profesores: true }));
        try {
          const response = await apiRef.current.get(`/api/usuario/getUsuarios/profesor`, {
            withCredentials: true,
          });

          const profesores = response.data.map((profesor) => ({
            idProfesor: profesor.idUsuario,
            nombre: `${profesor.nombre} ${profesor.apellido}`,
          }));

          setProfesores(profesores);
          profesoresCargados.current = true; // Marcar como cargados
        } catch (error) {
          setError('Error al cargar los profesores: ' + (error.response?.data || error.message));
        } finally {
          setLoading(prev => ({ ...prev, profesores: false }));
        }
      };

      cargarProfesores();
    }
  }, [planValido]);

  const handleProfesorChange = async (e) => {
    const idUsuario = e.target.value;
    setProfesorSeleccionado(idUsuario);

    if (idUsuario && apiRef.current) {
      setLoading(prev => ({ ...prev, info: true }));
      try {
        const response = await apiRef.current.get(`/api/usuario/verInfoProfe/${idUsuario}`, {
          withCredentials: true,
        });

        setInfoProfesor(response.data);
      } catch (error) {
        setError('Error al cargar la información del profesor: ' + (error.response?.data || error.message));
        setInfoProfesor(null);
      } finally {
        setLoading(prev => ({ ...prev, info: false }));
      }
    } else {
      setInfoProfesor(null);
    }
  };

  // Si el plan no es válido, mostrar mensaje de plan requerido
  if (planValido === false) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          Esta función requiere un plan premium. Por favor, actualice su plan para acceder a esta característica.
        </Alert>
      </Container>
    );
  }

  // Si aún está verificando el plan, mostrar cargando
  if (planValido === null) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
        <p className="text-white">Verificando plan...</p>
      </Container>
    );
  }

  // Si el plan es válido, mostrar el componente completo
  return (
    <Container className="mt-4 d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <h1 className="text-center text-white mb-4">Información del Profesor</h1>

        {loading.profesores && <div className="text-center"><Spinner animation="border" /></div>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Seleccione un profesor</Form.Label>
                  <Form.Control 
                    as="select" 
                    value={profesorSeleccionado} 
                    onChange={handleProfesorChange}
                    disabled={loading.profesores}
                  >
                    <option value="">Seleccione un profesor</option>
                    {profesores.map((profesor) => (
                      <option key={profesor.idProfesor} value={profesor.idProfesor}>
                        {profesor.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {loading.info && <div className="text-center mt-3"><Spinner animation="border" /></div>}

        {infoProfesor && !loading.info && (
          <Card className="mt-4">
            <Card.Body>
              <h4>Información del Profesor Seleccionado</h4>
              <p><strong>Cantidad de Cursos:</strong> {infoProfesor.cantCursos}</p>
              <p><strong>Horas Totales:</strong> {infoProfesor.cantHoras}</p>
              <p><strong>Asistencias:</strong></p>
              <ul>
                {infoProfesor.asistencias && infoProfesor.asistencias.length > 0 ? (
                  infoProfesor.asistencias.map((asistencia, index) => (
                    <li key={index}>{asistencia}</li>
                  ))
                ) : (
                  <li>No hay asistencias registradas</li>
                )}
              </ul>
            </Card.Body>
          </Card>
        )}
      </div>
    </Container>
  );
};

export default SeleccionarProfePremium;