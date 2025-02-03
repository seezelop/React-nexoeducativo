import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AltaCurso = () => {
  const [formData, setFormData] = useState({
    numero: '',
    division: '',
    cantidadMaterias: 0,
    materias: [],
    activo: 1 // Valor por defecto en 1 (activo)
  });

  const [materiasList, setMateriasList] = useState([]); // Lista de materias disponibles
  const [profesoresList, setProfesoresList] = useState([]); // Lista de profesores disponibles
  const [loading, setLoading] = useState(false);

  // Obtener listas de materias y profesores al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const materiasResponse = await axios.get('http://localhost:8080/api/usuario/verMaterias');
        const profesoresResponse = await axios.get('http://localhost:8080/api/usuario/verProfesAdministrativo');
        setMateriasList(materiasResponse.data);
        setProfesoresList(profesoresResponse.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchData();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? (checked ? 1 : 0) : value
    });
  };

  // Manejar cambios en los campos de materias
  const handleMateriaChange = (index, field, value) => {
    const updatedMaterias = [...formData.materias];
    updatedMaterias[index] = { ...updatedMaterias[index], [field]: value };
    setFormData({ ...formData, materias: updatedMaterias });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.numero || !formData.division || formData.cantidadMaterias === 0) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/usuario/saveCurso', formData, { withCredentials: true });

      if (response.status === 200) {
        alert('Curso y materias registrados exitosamente!');
        // Reiniciar el formulario
        setFormData({
          numero: '',
          division: '',
          cantidadMaterias: 0,
          materias: [],
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

  // Generar campos dinámicos para materias
  const renderMateriasFields = () => {
    const fields = [];
    for (let i = 0; i < formData.cantidadMaterias; i++) {
      fields.push(
        <div key={i} className="mb-4 p-3 border rounded">
          <h5>Materia {i + 1}</h5>
          <Row>
            <Col md={6}>
              <Form.Group controlId={`materia-${i}`} className="mb-3">
                <Form.Label>Nombre de la Materia</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.materias[i]?.nombre || ''}
                  onChange={(e) => handleMateriaChange(i, 'nombre', e.target.value)}
                  required
                >
                  <option value="">Seleccione una materia</option>
                  {materiasList.map((materia) => (
                    <option key={materia.id} value={materia.nombre}>
                      {materia.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId={`dia-${i}`} className="mb-3">
                <Form.Label>Día de la semana</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.materias[i]?.dia || ''}
                  onChange={(e) => handleMateriaChange(i, 'dia', e.target.value)}
                  required
                >
                  <option value="">Seleccione un día</option>
                  <option value="Lunes">Lunes</option>
                  <option value="Martes">Martes</option>
                  <option value="Miércoles">Miércoles</option>
                  <option value="Jueves">Jueves</option>
                  <option value="Viernes">Viernes</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId={`horaInicio-${i}`} className="mb-3">
                <Form.Label>Hora de inicio</Form.Label>
                <Form.Control
                  type="time"
                  value={formData.materias[i]?.horaInicio || ''}
                  onChange={(e) => handleMateriaChange(i, 'horaInicio', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId={`horaFin-${i}`} className="mb-3">
                <Form.Label>Hora de fin</Form.Label>
                <Form.Control
                  type="time"
                  value={formData.materias[i]?.horaFin || ''}
                  onChange={(e) => handleMateriaChange(i, 'horaFin', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId={`profesor-${i}`} className="mb-3">
            <Form.Label>Profesor</Form.Label>
            <Form.Control
              as="select"
              value={formData.materias[i]?.profesor || ''}
              onChange={(e) => handleMateriaChange(i, 'profesor', e.target.value)}
              required
            >
              <option value="">Seleccione un profesor</option>
              {profesoresList.map((profesor) => (
                <option key={profesor.id} value={profesor.nombre}>
                  {profesor.nombre} {profesor.apellido}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
      );
    }
    return fields;
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

      <Form.Group controlId="cantidadMaterias" className="mb-3">
        <Form.Label>Cantidad de Materias</Form.Label>
        <Form.Control
          type="number"
          min="0"
          value={formData.cantidadMaterias}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      {formData.cantidadMaterias > 0 && renderMateriasFields()}

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