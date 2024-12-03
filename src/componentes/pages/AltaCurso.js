import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AltaCurso = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/curso/alta', formData, { withCredentials: true });
      if (response.status === 200) {
        alert('Curso registrado exitosamente!');
      } else {
        alert('Error al registrar el curso');
      }
    } catch (error) {
      console.error('Error al registrar el curso:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" value={formData.nombre} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="descripcion">
        <Form.Label>Descripción</Form.Label>
        <Form.Control type="text" value={formData.descripcion} onChange={handleInputChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Registrar Curso
      </Button>
    </Form>
  );
};

export default AltaCurso;
