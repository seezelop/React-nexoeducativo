import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ModificarPadre = () => {
  const [formData, setFormData] = useState({
    id_usuario: '',
    nombre: '',
    apellido: '',
    dni: '',
    mail: '',
    clave: '',
    telefono: '',
    activo: true,
    pago_cuota: false,
    Rol_id_rol: ''
  });

  useEffect(() => {
    if (formData.id_usuario) {
      // Cargar datos del padre a modificar
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/padre/${formData.id_usuario}`,
            { withCredentials: true }
          );
          if (response.status === 200) {
            setFormData(response.data);
          }
        } catch (error) {
          console.error('Error al cargar los datos del padre:', error);
        }
      };
      fetchData();
    }
  }, [formData.id_usuario]);

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
      const response = await axios.put(
        `http://localhost:8080/api/padre/modificar/${formData.id_usuario}`, 
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert('Padre modificado exitosamente!');
      } else {
        alert('Error al modificar el padre');
      }
    } catch (error) {
      console.error('Error al modificar el padre:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="id_usuario">
        <Form.Label>ID Usuario</Form.Label>
        <Form.Control 
          type="text" 
          value={formData.id_usuario} 
          onChange={handleInputChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control 
          type="text" 
          value={formData.nombre} 
          onChange={handleInputChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="apellido">
        <Form.Label>Apellido</Form.Label>
        <Form.Control 
          type="text" 
          value={formData.apellido} 
          onChange={handleInputChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="dni">
        <Form.Label>DNI</Form.Label>
        <Form.Control 
          type="text" 
          value={formData.dni} 
          onChange={handleInputChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="mail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          value={formData.mail} 
          onChange={handleInputChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="clave">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control 
          type="password" 
          value={formData.clave} 
          onChange={handleInputChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="telefono">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control 
          type="text" 
          value={formData.telefono} 
          onChange={handleInputChange} 
          required 
        />
      </Form.Group>
      <Form.Group controlId="activo">
        <Form.Check 
          type="checkbox" 
          label="Activo" 
          checked={formData.activo} 
          onChange={handleCheckboxChange} 
        />
      </Form.Group>
      <Form.Group controlId="pago_cuota">
        <Form.Check 
          type="checkbox" 
          label="Pago de cuota" 
          checked={formData.pago_cuota} 
          onChange={handleCheckboxChange} 
        />
      </Form.Group>
      <Form.Group controlId="Rol_id_rol">
        <Form.Label>Rol ID</Form.Label>
        <Form.Control 
          type="text" 
          value={formData.Rol_id_rol} 
          onChange={handleInputChange} 
          required 
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Modificar Padre
      </Button>
    </Form>
  );
};

export default ModificarPadre;
