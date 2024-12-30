import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AltaCurso = () => {
  const [formData, setFormData] = useState({
    numeroCurso: '',
    division: '',
    activo: 1 // Valor por defecto en 1 (activo)
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? (checked ? 1 : 0) : value // Si es checkbox, enviar 1 si está tildado, 0 si no lo está
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados al backend:', formData); // Verifica los datos
  
    try {
      const response = await axios.post('http://localhost:8080/api/usuario/saveCurso', formData, { withCredentials: true });
      if (response.status === 200) {
        alert('Curso registrado exitosamente!');
      } else {
        alert('Error al registrar el curso');
      }
    } catch (error) {
      console.error('Error al registrar el curso:', error);
      alert('Hubo un error al registrar el curso. Ver consola para más detalles.');
    }
  };
  

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="numeroCurso">
        <Form.Label>Número del Curso</Form.Label>
        <Form.Control type="number" value={formData.numeroCurso} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="division">
        <Form.Label>División (letra)</Form.Label>
        <Form.Control type="text" value={formData.division} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group controlId="activo">
        <Form.Check 
          type="checkbox"
          label="Curso Activo"
          checked={formData.activo === 1} // Si el valor es 1, el checkbox estará tildado
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Registrar Curso
      </Button>
    </Form>
  );
};

export default AltaCurso;
