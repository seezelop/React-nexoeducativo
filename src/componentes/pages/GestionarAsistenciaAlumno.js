import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const GestionarAsistenciaAlumno = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [asistencia, setAsistencia] = useState({});

  // Cargar la lista de alumnos al cargar el componente
  const cargarAlumnos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/alumnos'); // Suponiendo que esta es la ruta que devuelve los alumnos
      setAlumnos(response.data);
    } catch (error) {
      console.error('Error al cargar los alumnos:', error);
    }
  };

  // Manejar el cambio de asistencia
  const handleAsistenciaChange = (idAlumno, estado) => {
    setAsistencia({
      ...asistencia,
      [idAlumno]: estado
    });
  };

  // Enviar la asistencia al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { alumnos: Object.entries(asistencia).map(([id, estado]) => ({ id_alumno: id, estado })) };
      const response = await axios.post('http://localhost:8080/api/asistencia', data, { withCredentials: true });
      if (response.status === 200) {
        alert('Asistencia registrada con éxito!');
      } else {
        alert('Error al registrar la asistencia');
      }
    } catch (error) {
      console.error('Error al registrar la asistencia:', error);
    }
  };

  // Cargar alumnos al montar el componente
  React.useEffect(() => {
    cargarAlumnos();
  }, []);

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        
        <h3 className="mb-4 text-center">GESTIÓN DE ASISTENCIA ALUMNOS</h3>

        <Form onSubmit={handleSubmit} className="col-md-8 mb-5">
          <div className="card shadow-sm p-3">
            <h4 className="mb-4">Asistencia del curso</h4>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Alumno</th>
                  <th>Asistencia</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno) => (
                  <tr key={alumno.id_alumno}>
                    <td>{alumno.nombre} {alumno.apellido}</td>
                    <td>
                      <Form.Check
                        type="radio"
                        label="Presente"
                        checked={asistencia[alumno.id_alumno] === 'presente'}
                        onChange={() => handleAsistenciaChange(alumno.id_alumno, 'presente')}
                      />
                      <Form.Check
                        type="radio"
                        label="Ausente"
                        checked={asistencia[alumno.id_alumno] === 'ausente'}
                        onChange={() => handleAsistenciaChange(alumno.id_alumno, 'ausente')}
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

export default GestionarAsistenciaAlumno;
