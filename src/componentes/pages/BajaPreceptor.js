import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const BajaPreceptor = () => {
  const [idPreceptor, setIdPreceptor] = useState('');

  const handleChange = (e) => {
    setIdPreceptor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:8080/api/preceptor/baja/${idPreceptor}`, { withCredentials: true });
      if (response.status === 200) {
        alert('Preceptor dado de baja exitosamente!');
      } else {
        alert('Error al dar de baja el preceptor');
      }
    } catch (error) {
      console.error('Error al dar de baja el preceptor:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="idPreceptor">
        <Form.Label>ID Preceptor</Form.Label>
        <Form.Control type="text" value={idPreceptor} onChange={handleChange} required />
      </Form.Group>
      <Button variant="danger" type="submit">
        Dar de Baja Preceptor
      </Button>
    </Form>
  );
};

export default BajaPreceptor;
