import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const BajaCurso = () => {
  const [idCurso, setIdCurso] = useState('');

  const handleChange = (e) => {
    setIdCurso(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:8080/api/curso/baja/${idCurso}`, { withCredentials: true });
      if (response.status === 200) {
        alert('Curso dado de baja exitosamente!');
      } else {
        alert('Error al dar de baja el curso');
      }
    } catch (error) {
      console.error('Error al dar de baja el curso:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="idCurso">
        <Form.Label>ID Curso</Form.Label>
        <Form.Control type="text" value={idCurso} onChange={handleChange} required />
      </Form.Group>
      <Button variant="danger" type="submit">
        Dar de Baja Curso
      </Button>
    </Form>
  );
};

export default BajaCurso;
