import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const BajaPadre = () => {
  const [idUsuario, setIdUsuario] = useState('');

  const handleInputChange = (e) => {
    setIdUsuario(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/padre/baja/${idUsuario}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert('Padre eliminado exitosamente!');
        setIdUsuario('');
      } else {
        alert('Error al eliminar el padre');
      }
    } catch (error) {
      console.error('Error al eliminar el padre:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="id_usuario">
        <Form.Label>ID Usuario</Form.Label>
        <Form.Control 
          type="text" 
          value={idUsuario} 
          onChange={handleInputChange} 
          required 
        />
      </Form.Group>
      <Button variant="danger" type="submit">
        Eliminar Padre
      </Button>
    </Form>
  );
};

export default BajaPadre;
