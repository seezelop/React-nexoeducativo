import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AltaCurso = () => {
  const [formData, setFormData] = useState({
    numero: '',
    division: '',
    activo: 1 // Valor por defecto en 1 (activo)
  });

  const [loading, setLoading] = useState(false);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? (checked ? 1 : 0) : value
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.numero || !formData.division) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/usuario/saveCurso', formData, { withCredentials: true });
      
      if (response.status === 200) {
        alert('Curso registrado exitosamente!');
        // Reiniciar el formulario
        setFormData({
          numero: '',
          division: '',
          activo: 1
        });
      } else {
        alert('Error al registrar el curso.');
      }
    } catch (error) {
      console.error('Error al registrar el curso:', error);
      alert('Hubo un error al registrar el curso. Verifica la consola para más detalles.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="numero" className="mb-3">
        <Form.Label>Número del Curso</Form.Label>
        <Form.Control
          type="number"
          min="1"
          value={formData.numero}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="division" className="mb-3">
        <Form.Label>División (letra)</Form.Label>
        <Form.Control
          type="text"
          value={formData.division}
          onChange={handleInputChange}
          maxLength="1"
          pattern="[A-Za-z]"
          title="Ingrese solo una letra"
          required
        />
      </Form.Group>

      <Form.Group controlId="activo" className="mb-3">
        <Form.Check 
          type="checkbox"
          label="Curso Activo"
          checked={formData.activo === 1}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrar Curso'}
      </Button>
    </Form>
  );
};

export default AltaCurso;
