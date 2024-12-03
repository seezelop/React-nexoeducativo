import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const GestionarAsistenciaProfesor = () => {
  const [profesores, setProfesores] = useState([]);
  const [asistencia, setAsistencia] = useState({});

  // Cargar la lista de profesores al cargar el componente
  const cargarProfesores = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/profesores'); // Suponiendo que esta es la ruta que devuelve los profesores
      setProfesores(response.data);
    } catch (error) {
      console.error('Error al cargar los profesores:', error);
    }
  };

  // Manejar el cambio de asistencia
  const handleAsistenciaChange = (idProfesor, estado) => {
    setAsistencia({
      ...asistencia,
      [idProfesor]: estado
    });
  };

  // Enviar la asistencia al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { profesores: Object.entries(asistencia).map(([id, estado]) => ({ id_profesor: id, estado })) };
      const response = await axios.post('http://localhost:8080/api/asistencia-profesor', data, { withCredentials: true });
      if (response.status === 200) {
        alert('Asistencia registrada con éxito!');
      } else {
        alert('Error al registrar la asistencia');
      }
    } catch (error) {
      console.error('Error al registrar la asistencia:', error);
    }
  };

  // Cargar profesores al montar el componente
  useEffect(() => {
    cargarProfesores();
  }, []);

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        
        <h3 className="mb-4 text-center">GESTIÓN DE ASISTENCIA PROFESORES</h3>

        <Form onSubmit={handleSubmit} className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h4 className="mb-4">Asistencia de profesores</h4>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Profesor</th>
                  <th>Asistencia</th>
                </tr>
              </thead>
              <tbody>
                {profesores.map((profesor) => (
                  <tr key={profesor.id_profesor}>
                    <td>{profesor.nombre} {profesor.apellido}</td>
                    <td>
                      <Form.Check
                        type="radio"
                        label="Presente"
                        checked={asistencia[profesor.id_profesor] === 'presente'}
                        onChange={() => handleAsistenciaChange(profesor.id_profesor, 'presente')}
                      />
                      <Form.Check
                        type="radio"
                        label="Ausente"
                        checked={asistencia[profesor.id_profesor] === 'ausente'}
                        onChange={() => handleAsistenciaChange(profesor.id_profesor, 'ausente')}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Button variant="primary" type="submit">
              Registrar Asistencia
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default GestionarAsistenciaProfesor;
