import React, { useState, useEffect } from 'react';
import { Table, Alert, Spinner, Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const GestionarAsistenciaProfesor = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [asistencia, setAsistencia] = useState({});

  useEffect(() => {
    const obtenerProfesores = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/usuario/verProfesAdministrativo', { withCredentials: true });
        setProfesores(response.data);
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
    obtenerProfesores();
  }, []);

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
      

      console.log('esto se va a enviar: '+JSON.stringify(data))
      
      await axios.post('http://localhost:8080/api/usuario/tomarAsistenciaProfesor', data, { withCredentials: true });

      setMensaje('Asistencia registrada correctamente');
    } catch (err) {
      setMensaje('Error al registrar la asistencia: ' + (JSON.stringify(err.response?.data) || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Gestión de Asistencia de Profesores</h1>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {mensaje && <Alert variant={mensaje.includes('Error') ? 'danger' : 'success'}>{mensaje}</Alert>}

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
    </Container>
  );
};

export default GestionarAsistenciaProfesor;
