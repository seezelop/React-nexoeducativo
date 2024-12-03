import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AltaAlumno = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    mail: '',
    clave: '',
    telefono: '',
    activo: false,
    pago_cuota: false,
    Rol_id_rol: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData({
      ...formData,
      [id]: checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/alumno/alta', formData, { withCredentials: true });
      if (response.status === 200) {
        alert('Alumno registrado exitosamente!');
      } else {
        alert('Error al registrar el alumno');
      }
    } catch (error) {
      console.error('Error al registrar el alumno:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Campos de formulario */}
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
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={formData.mail} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="clave">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" value={formData.clave} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="telefono">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control type="text" value={formData.telefono} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="activo">
        <Form.Check type="checkbox" label="Activo" checked={formData.activo} onChange={handleCheckboxChange} />
      </Form.Group>
      <Form.Group controlId="pago_cuota">
        <Form.Check type="checkbox" label="Pago de cuota" checked={formData.pago_cuota} onChange={handleCheckboxChange} />
      </Form.Group>
      <Form.Group controlId="Rol_id_rol">
        <Form.Label>Rol ID</Form.Label>
        <Form.Control type="text" value={formData.Rol_id_rol} onChange={handleInputChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Registrar Alumno
      </Button>
    </Form>
  );
};

export default AltaAlumno;
