import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const BajaAlumno = () => {
  const [idAlumno, setIdAlumno] = useState('');

  const handleChange = (e) => {
    setIdAlumno(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:8080/api/alumno/baja/${idAlumno}`, { withCredentials: true });
      if (response.status === 200) {
        alert('Alumno dado de baja exitosamente!');
      } else {
        alert('Error al dar de baja el alumno');
      }
    } catch (error) {
      console.error('Error al dar de baja el alumno:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="idAlumno">
        <Form.Label>ID Alumno</Form.Label>
        <Form.Control type="text" value={idAlumno} onChange={handleChange} required />
      </Form.Group>
      <Button variant="danger" type="submit">
        Dar de Baja Alumno
      </Button>
    </Form>
  );
};

export default BajaAlumno;
