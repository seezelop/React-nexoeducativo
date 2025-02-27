import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const materiasResponse = await axios.get('http://localhost:8080/api/usuario/verMaterias', {
          withCredentials: true,
        });
        const profesoresResponse = await axios.get('http://localhost:8080/api/usuario/verProfesAdministrativo', {
          withCredentials: true,
        });
        setMateriasList(materiasResponse.data);
        setProfesoresList(profesoresResponse.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
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
  };

  const handleMateriaChange = (index, field, value) => {
    const updatedMaterias = [...formData.m];
    updatedMaterias[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      m: updatedMaterias,
    }));

    console.log('infooo'+formData);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.r.numero || !formData.r.division || formData.m.length === 0) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/usuario/saveCurso', formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert('Curso y materias registrados exitosamente!');
        setFormData({
          r: {
            numero: '',
            division: '',
            activo: 1,
          },
          m: [],
        });
        setCantidadMaterias(0);
      } else {
        alert('Error al registrar el curso.');
      }
    } catch (error) {
      console.error('Error al registrar el curso:', error);
      alert('Hubo un error al registrar el curso.');
      console.log('INFO A ENVAR: ',formData);

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
                 className="form-select text-dark bg-white"
                value={materia.idMateria || ""}
                onChange={(e) => handleMateriaChange(i, "idMateria", Number(e.target.value))}

                required
              >
                <option value="">Seleccione una materia</option>
                {materiasList.map((materia) => (
                  <option key={materia.id} value={materia.id}>
                    {materia.nombre}
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
                value={materia.idProfesor}
                 className="form-select text-dark bg-white"
                onChange={(e) => handleMateriaChange(i, 'idProfesor', e.target.value)}
                required
              >
                <option value="">Seleccione un profesor</option>
                {profesoresList.map((profesor) => (
                  <option key={profesor.id} value={profesor.id}>
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
                value={materia.nombre}
                 className="form-select text-dark bg-white"
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
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Hora Inicio</Form.Label>
              <Form.Control
                type="time"
                value={materia.horaInicio}
                onChange={(e) => handleMateriaChange(i, 'horaInicio', e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Hora Fin</Form.Label>
              <Form.Control
                type="time"
                value={materia.horaFin}
                onChange={(e) => handleMateriaChange(i, 'horaFin', e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
    ));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Número del Curso</Form.Label>
        <Form.Control
          type="number"
          name="numero"
          value={formData.r.numero}
          onChange={handleCursoChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
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

      <Form.Group className="mb-3">
        <Form.Label>Cantidad de Materias</Form.Label>
        <Form.Control
          type="number"
          min="0"
          value={cantidadMaterias}
          onChange={handleCantidadMateriasChange}
          required
        />
      </Form.Group>

      {cantidadMaterias > 0 && renderMateriasFields()}

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Curso Activo"
          checked={formData.r.activo === 1}
          onChange={() =>
            setFormData((prev) => ({
              ...prev,
              r: { ...prev.r, activo: prev.r.activo === 1 ? 0 : 1 },
            }))
          }
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrar Curso'}
      </Button>
    </Form>
  );
};

export default AltaCurso;
