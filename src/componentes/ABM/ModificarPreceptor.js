import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ModificarPreceptor = () => {
  const [formData, setFormData] = useState({
    id_preceptor: '',
    nombre: '',
    apellido: '',
    dni: '',
    mail: '',
    telefono: ''
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
      const response = await axios.put(`http://localhost:8080/api/preceptor/modificar/${formData.id_preceptor}`, formData, { withCredentials: true });
      if (response.status === 200) {
        alert('Preceptor modificado exitosamente!');
      } else {
        alert('Error al modificar el preceptor');
      }
    } catch (error) {
      console.error('Error al modificar el preceptor:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="id_preceptor">
        <Form.Label>ID Preceptor</Form.Label>
        <Form.Control type="text" value={formData.id_preceptor} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" value={formData.nombre} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="apellido">
        <Form.Label>Apellido</Form.Label>
        <Form.Control type="text" value={formData.apellido} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="dni">
        <Form.Label>DNI</Form.Label>
        <Form.Control type="text" value={formData.dni} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="mail">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control type="email" value={formData.mail} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="telefono">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control type="text" value={formData.telefono} onChange={handleInputChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Modificar Preceptor
      </Button>
    </Form>
  );
};

export default ModificarPreceptor;
