import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const GestionarAsistenciaAlumno = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [asistencia, setAsistencia] = useState({});

  // Cargar lista de alumnos al montar el componente
  const cargarAlumnos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/verAlumnosCurso/1'); // Cambia el ID del curso dinámicamente según sea necesario
      setAlumnos(response.data);
    } catch (error) {
      console.error('Error al cargar los alumnos:', error);
    }
  };

  // Manejar el cambio de asistencia
  const handleAsistenciaChange = (idAlumno, tipoAsistencia) => {
    setAsistencia({
      ...asistencia,
      [idAlumno]: tipoAsistencia
    });
  };

  // Enviar la asistencia al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const alumnosAsistencia = alumnos.map((alumno) => ({
      idUsuario: alumno.idUsuario,
      asistio: asistencia[alumno.idUsuario] === 'asistio' ? 1 : 0,
      mediaFalta: asistencia[alumno.idUsuario] === 'mediaFalta' ? 1 : 0,
      retiroAntes: asistencia[alumno.idUsuario] === 'retiroAntes' ? 1 : 0
    }));

    try {
      const response = await axios.post(
        'http://localhost:8080/tomarAsistencia/1', // Cambia el ID del curso según sea necesario
        { alumnosCurso: alumnosAsistencia },
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert('Asistencia registrada con éxito!');
      } else {
        alert('Error al registrar la asistencia');
      }
    } catch (error) {
      console.error('Error al registrar la asistencia:', error);
    }
  };

  useEffect(() => {
    cargarAlumnos();
  }, []);

  return (
    <section className="d-flex flex-column min-vh-100">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        
        <h3 className="mb-4 text-center">GESTIÓN DE ASISTENCIA ALUMNOS</h3>

        <Form onSubmit={handleSubmit} className="col-md-10 mb-5">
          <div className="card shadow-sm p-3">
            <h4 className="mb-4">Asistencia del curso</h4>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Asistió al 100%</th>
                  <th>No asistió</th>
                  <th>Se retiró antes</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno) => (
                  <tr key={alumno.idUsuario}>
                    <td>{alumno.nombre}</td>
                    <td>{alumno.apellido}</td>
                    <td>
                      <Form.Check
                        type="radio"
                        name={`asistencia-${alumno.idUsuario}`}
                        checked={asistencia[alumno.idUsuario] === 'asistio'}
                        onChange={() => handleAsistenciaChange(alumno.idUsuario, 'asistio')}
                      />
                    </td>
                    <td>
                      <Form.Check
                        type="radio"
                        name={`asistencia-${alumno.idUsuario}`}
                        checked={asistencia[alumno.idUsuario] === 'ausente'}
                        onChange={() => handleAsistenciaChange(alumno.idUsuario, 'ausente')}
                      />
                    </td>
                    <td>
                      <Form.Check
                        type="radio"
                        name={`asistencia-${alumno.idUsuario}`}
                        checked={asistencia[alumno.idUsuario] === 'retiroAntes'}
                        onChange={() => handleAsistenciaChange(alumno.idUsuario, 'retiroAntes')}
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
