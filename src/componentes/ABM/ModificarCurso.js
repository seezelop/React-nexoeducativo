import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ModificarCurso = () => {
  const [formData, setFormData] = useState({
    id_curso: '',
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
      const response = await axios.put(`http://localhost:8080/api/curso/modificar/${formData.id_curso}`, formData, { withCredentials: true });
      if (response.status === 200) {
        alert('Curso modificado exitosamente!');
      } else {
        alert('Error al modificar el curso');
      }
    } catch (error) {
      console.error('Error al modificar el curso:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="id_curso">
        <Form.Label>ID Curso</Form.Label>
        <Form.Control type="text" value={formData.id_curso} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" value={formData.nombre} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="descripcion">
        <Form.Label>Descripción</Form.Label>
        <Form.Control type="text" value={formData.descripcion} onChange={handleInputChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Modificar Curso
      </Button>
    </Form>
  );
};

export default ModificarCurso;
