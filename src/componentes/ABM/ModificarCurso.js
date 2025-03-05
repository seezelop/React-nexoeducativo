import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ModificarCurso = () => {
  const [cursos, setCursos] = useState([]);
  const [formData, setFormData] = useState({
    idCurso: '',
    numero: '',
    division: '',
    activo: 1,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/usuario/verCursos', {
          withCredentials: true,
        });
        setCursos(response.data);
      } catch (error) {
        console.error('Error al obtener cursos:', error);
        alert('Hubo un error al cargar los cursos.');
      }
    };
    fetchCursos();
  }, []);

  const handleCursoChange = (e) => {
    const cursoSeleccionado = cursos.find((curso) => curso.idCurso === Number(e.target.value));
    if (cursoSeleccionado) {
      setFormData({
        idCurso: cursoSeleccionado.idCurso,
        numero: cursoSeleccionado.numero,
        division: cursoSeleccionado.division,
        activo: cursoSeleccionado.activo,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => ({
      ...prev,
      activo: prev.activo === 1 ? 0 : 1,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.idCurso) {
      alert('Debe seleccionar un curso para modificar.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/curso/modificarCursos/${formData.idCurso}`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert('Curso modificado exitosamente!');
      } else {
        alert('Error al modificar el curso.');
      }
    } catch (error) {
      console.error('Error al modificar el curso:', error);
      alert('Hubo un error al modificar el curso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Seleccionar Curso</Form.Label>
        <Form.Control
          as="select"
          value={formData.idCurso}
          onChange={handleCursoChange}
          required
          className="form-select text-dark bg-white"
        >
          <option value="">Seleccione un curso</option>
          {cursos.map((curso) => (
            <option key={curso.idCurso} value={curso.idCurso}>
              {curso.numero + curso.division}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Número del Curso</Form.Label>
            <Form.Control
              type="number"
              name="numero"
              value={formData.numero}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>División</Form.Label>
            <Form.Control
              type="text"
              name="division"
              value={formData.division}
              onChange={handleInputChange}
              maxLength="1"
              pattern="[A-Za-z]"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Curso Activo"
          checked={formData.activo === 1}
          onChange={handleCheckboxChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Modificando...' : 'Modificar Curso'}
      </Button>
    </Form>
  );
};

export default ModificarCurso;
