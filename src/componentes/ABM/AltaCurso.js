import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

const AltaCurso = () => {
  const [formData, setFormData] = useState({
    r: {
      numero: '',
      division: '',
      activo: 1, 
    },
    m: [],
  });

  const [materiasList, setMateriasList] = useState([]);
  const [profesoresList, setProfesoresList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cantidadMaterias, setCantidadMaterias] = useState(0);
  const [error, setError] = useState(null);

    // Crear una instancia de axios con la URL base
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const materiasResponse = await api.get('/api/usuario/verMaterias', {
          withCredentials: true,
        });
        const profesoresResponse = await api.get('/api/usuario/verProfesAdministrativo', {
          withCredentials: true,
        });
        setMateriasList(materiasResponse.data);
        setProfesoresList(profesoresResponse.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setError('Error al cargar los datos iniciales');
      }
    };
    fetchData();
  }, []);

  const handleCursoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      r: {
        ...prev.r,
        [name]: value,
      },
    }));
    setError(null);
  };

  const handleCantidadMateriasChange = (e) => {
    const cantidad = parseInt(e.target.value, 10);
    setCantidadMaterias(cantidad);
    setFormData((prev) => ({
      ...prev,
      m: Array.from({ length: cantidad }, () => ({
        idMateria: null,
        idProfesor: null,
        dia: "",
        horaInicio: "",
        horaFin: "",
      })),
    }));
    setError(null);
  };

  const handleMateriaChange = (index, field, value) => {
    const updatedMaterias = [...formData.m];
    updatedMaterias[index][field] = field.includes("id") ? Number(value) || null : value;
    setFormData((prev) => ({
      ...prev,
      m: updatedMaterias,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.r.numero || !formData.r.division || formData.m.length === 0) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    // Validación adicional de horarios
    const hasInvalidSchedule = formData.m.some(materia => 
      !materia.idMateria || !materia.idProfesor || !materia.dia || !materia.horaInicio || !materia.horaFin
    );

    if (hasInvalidSchedule) {
      setError('Por favor, complete todos los campos de cada materia.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/api/usuario/saveCurso', formData, {
        withCredentials: true,
      });

      if (response.status == 201) {
        // Mostrar alerta de JavaScript
        alert(`¡Curso ${formData.r.numero}° "${formData.r.division}" registrado exitosamente`);
        //console.log('estus: '+response.status)
        // Reset form
        setFormData({
          r: {
            numero: '',
            division: '',
            activo: 1,
          },
          m: [],
        });
        setCantidadMaterias(0);
      }
    } catch (error) {
      console.error('Error al registrar el curso:', error);
      
      // Manejo detallado de errores del backend
      if (error.response) {
        // Si el error viene como string directo (ej: "Ya existe...")
        if (typeof error.response.data === 'string') {
          setError(error.response.data);
        } 
        // Si el error viene en un objeto { message: "..." }
        else if (error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        }
        // Para otros tipos de errores 400
        else if (error.response.status === 400) {
          setError('Error en los datos enviados al servidor');
        }
        else {
          setError(`Error del servidor (${error.response.status})`);
        }
      } else if (error.request) {
        setError('No se recibió respuesta del servidor');
      } else {
        setError('Error al configurar la solicitud');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderMateriasFields = () => {
    return formData.m.map((materia, i) => (
      <div key={i} className="mb-4 p-3 border rounded">
        <h5>Materia {i + 1}</h5>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Materia</Form.Label>
              <Form.Control
                as="select"
                value={materia.idMateria || ""}
                onChange={(e) => handleMateriaChange(i, "idMateria", e.target.value)}
                required
              >
                <option value="">Seleccione una materia</option>
                {materiasList.map((m) => (
                  <option key={m.idMateria} value={m.idMateria}>
                    {m.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Profesor</Form.Label>
              <Form.Control
                as="select"
                value={materia.idProfesor || ""}
                onChange={(e) => handleMateriaChange(i, "idProfesor", e.target.value)}
                required
              >
                <option value="">Seleccione un profesor</option>
                {profesoresList.map((profesor) => (
                  <option key={profesor.id_usuario} value={profesor.id_usuario}>
                    {profesor.nombre} {profesor.apellido}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Día</Form.Label>
              <Form.Control
                as="select"
                value={materia.dia || ""}
                onChange={(e) => handleMateriaChange(i, "dia", e.target.value)}
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
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Hora Inicio</Form.Label>
              <Form.Control
                type="time"
                value={materia.horaInicio || ""}
                onChange={(e) => handleMateriaChange(i, "horaInicio", e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Hora Fin</Form.Label>
              <Form.Control
                type="time"
                value={materia.horaFin || ""}
                onChange={(e) => handleMateriaChange(i, "horaFin", e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
    ));
  };

  return (
    <div className="container mt-4">   
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible className="mb-4">
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Número del Curso</Form.Label>
              <Form.Control
                type="number"
                name="numero"
                value={formData.r.numero}
                onChange={handleCursoChange}
                min="1"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>División</Form.Label>
              <Form.Control
                type="text"
                name="division"
                value={formData.r.division}
                onChange={handleCursoChange}
                maxLength="1"
                pattern="[A-Za-z]"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Cantidad de Materias</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={cantidadMaterias}
                onChange={handleCantidadMateriasChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {cantidadMaterias > 0 && (
          <div className="mb-4">
            <h4 className="mb-3">Materias del Curso</h4>
            {renderMateriasFields()}
          </div>
        )}

        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit" disabled={loading} size="lg">
            {loading ? 'Registrando...' : 'Registrar Curso'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AltaCurso;