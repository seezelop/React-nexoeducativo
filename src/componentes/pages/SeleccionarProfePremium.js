import React, { useState, useEffect } from 'react';
import { Alert, Spinner, Container, Form, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const SeleccionarProfePremium = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState('');
  const [infoProfesor, setInfoProfesor] = useState(null);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  // Cargar profesores al montar el componente
  useEffect(() => {
    const cargarProfesores = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/usuario/getUsuarios/profesor`, {
          withCredentials: true,
        });

        const profesores = response.data.map((profesor) => ({
          idProfesor: profesor.idUsuario,
          nombre: `${profesor.nombre} ${profesor.apellido}`,
        }));

        setProfesores(profesores);
      } catch (error) {
        setError('Error al cargar los profesores: ' + (error.response?.data || error.message));
      } finally {
        setLoading(false);
      }
    };

    cargarProfesores();
  }, []); // No es necesario agregar 'cargarProfesores' a las dependencias

  const handleProfesorChange = async (e) => {
    const idUsuario = e.target.value;
    setProfesorSeleccionado(idUsuario);

    if (idUsuario) {
      setLoading(true);
      try {
        const response = await api.get(`/api/usuario/verInfoProfe/${idUsuario}`, {
          withCredentials: true,
        });

        setInfoProfesor(response.data);
      } catch (error) {
        setError('Error al cargar la información del profesor: ' + (error.response?.data || error.message));
        setInfoProfesor(null);
      } finally {
        setLoading(false);
      }
    } else {
      setInfoProfesor(null);
    }
  };

  return (
    <Container className="mt-4 d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <h1 className="text-center text-white mb-4">Información del Profesor</h1>

        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}

        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Seleccione un profesor</Form.Label>
                  <Form.Control as="select" value={profesorSeleccionado} onChange={handleProfesorChange}>
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

        {infoProfesor && (
          <Card className="mt-4">
            <Card.Body>
              <h4>Información del Profesor Seleccionado</h4>
              <p><strong>Cantidad de Cursos:</strong> {infoProfesor.cantCursos}</p>
              <p><strong>Horas Totales:</strong> {infoProfesor.cantHoras}</p>
              <p><strong>Asistencias:</strong></p>
              <ul>
                {infoProfesor.asistencias.map((asistencia, index) => (
                  <li key={index}>{asistencia}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        )}
      </div>
    </Container>
  );
};

export default SeleccionarProfePremium;
