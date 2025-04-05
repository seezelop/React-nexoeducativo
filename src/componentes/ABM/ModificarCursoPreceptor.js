import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const ModificarCursoPreceptor = () => {
  const [cursos, setCursos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [materiasOriginales, setMateriasOriginales] = useState([]);
  const [formData, setFormData] = useState({
    idCurso: '',
    numero: '',
    division: '',
    activo: 1,
  });
  const [formDataOriginal, setFormDataOriginal] = useState({
    idCurso: '',
    numero: '',
    division: '',
    activo: 1,
  });
  const [loading, setLoading] = useState(false);
  const [editingIndices, setEditingIndices] = useState({});
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8080/api/usuario/verCursoPreceptor', {
          withCredentials: true,
        });
        setCursos(response.data);
      } catch (error) {
        console.error('Error al obtener cursos:', error);
        setError('Hubo un error al cargar los cursos.');
      } finally {
        setLoading(false);
      }
    };
    fetchCursos();
  }, []);

  const obtenerInfoMaterias = async (idCurso) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/api/usuario/infoMateriasActualizarCurso/${idCurso}`, {
        withCredentials: true,
      });

      const materiasData = response.data;
      setMaterias(materiasData);
      setMateriasOriginales(JSON.parse(JSON.stringify(materiasData)));
      setEditingIndices({});
      setSuccessMessage(null);
    } catch (error) {
      console.error('Error al cargar las materias:', error.response?.data || error.message);
      setError('Error al cargar las materias del curso.');
    } finally {
      setLoading(false);
    }
  };

  const handleCursoChange = (e) => {
    const cursoSeleccionado = cursos.find((curso) => curso.idCurso === Number(e.target.value));
    if (cursoSeleccionado) {
      const cursoData = {
        idCurso: cursoSeleccionado.idCurso,
        numero: cursoSeleccionado.numero,
        division: cursoSeleccionado.division,
        activo: cursoSeleccionado.activo,
      };
      
      setFormData(cursoData);
      setFormDataOriginal(JSON.parse(JSON.stringify(cursoData)));
      setError(null);
      setSuccessMessage(null);
      obtenerInfoMaterias(cursoSeleccionado.idCurso);
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

  const handleMateriaChange = (index, field, value) => {
    const nuevasMaterias = [...materias];
    nuevasMaterias[index][field] = value;
    setMaterias(nuevasMaterias);
  };

  const toggleEditing = (index) => {
    setEditingIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getModifiedCourseData = () => {
    const modified = {};
    
    modified.idCurso = formData.idCurso;
    
    if (formData.numero !== formDataOriginal.numero) {
      modified.numero = formData.numero;
    }
    
    if (formData.division !== formDataOriginal.division) {
      modified.division = formData.division;
    }
    
    if (formData.activo !== formDataOriginal.activo) {
      modified.activo = formData.activo;
    }
    
    return modified;
  };

  const getModifiedSubjects = () => {
    const materiasModificadas = [];
    
    materias.forEach((materia, index) => {
      const materiaOriginal = materiasOriginales[index];
      const modified = {};
      let hasChanges = false;
      
      if (materia.idMateria) {
        modified.idMateria = materia.idMateria;
      }
      
      const camposAComparar = ['dia', 'horaInicio', 'horaFin'];
      
      camposAComparar.forEach(campo => {
        if (materia[campo] !== materiaOriginal[campo]) {
          modified[campo] = materia[campo];
          hasChanges = true;
        }
      });
      
      if (hasChanges) {
        materiasModificadas.push(modified);
      }
    });
    
    return materiasModificadas;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.idCurso) {
      setError('Debe seleccionar un curso para modificar.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const cursoModificado = getModifiedCourseData();
      const materiasModificadas = getModifiedSubjects();
      
      const dataToSend = {
        ...cursoModificado
      };
      
      if (materiasModificadas.length > 0) {
        dataToSend.materias = materiasModificadas;
      }

      const cursoResponse = await axios.patch(
        `http://localhost:8080/api/usuario/modificarCurso/${formData.idCurso}`,
        dataToSend,
        { withCredentials: true }
      );

      if (cursoResponse.status === 200) {
        setSuccessMessage('Curso modificado exitosamente!');
        const cursosActualizados = await axios.get('http://localhost:8080/api/usuario/verCursoAdministrativo', {
          withCredentials: true,
        });
        setCursos(cursosActualizados.data);
        obtenerInfoMaterias(formData.idCurso);
      } else {
        setError('Error al modificar el curso.');
      }
    } catch (error) {
      console.error('Error al modificar el curso:', error);
      setError(error.response?.data?.message || 'Hubo un error al modificar el curso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="mb-4">Modificar Curso</h3>
      
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      {successMessage && <Alert variant="success" className="mb-3">{successMessage}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Seleccionar Curso</Form.Label>
          {cursos.length === 0 ? (
            <Alert variant="info">
              No hay cursos disponibles para modificar.
            </Alert>
          ) : (
            <Form.Control
              as="select"
              value={formData.idCurso}
              onChange={handleCursoChange}
              required
              className="form-select text-dark bg-white"
              disabled={loading}
            >
              <option value="">Seleccione un curso</option>
              {cursos.map((curso) => (
                <option key={curso.idCurso} value={curso.idCurso}>
                  {curso.numero}° "{curso.division}"
                </option>
              ))}
            </Form.Control>
          )}
        </Form.Group>

        {formData.idCurso && (
          <>
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
                    disabled={loading}
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
                    disabled={loading}
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
                disabled={loading}
              />
            </Form.Group>

            {materias.length > 0 ? (
              <div className="mt-4">
                <h4>Materias del Curso</h4>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Día</th>
                      <th>Hora Inicio</th>
                      <th>Hora Fin</th>
                      <th>Materia</th>
                      <th>Profesor</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materias.map((materia, index) => (
                      <tr key={index}>
                        <td>
                          {editingIndices[index] ? (
                            <Form.Control
                              type="text"
                              value={materia.dia}
                              onChange={(e) => handleMateriaChange(index, 'dia', e.target.value)}
                              disabled={loading}
                            />
                          ) : (
                            materia.dia
                          )}
                        </td>
                        <td>
                          {editingIndices[index] ? (
                            <Form.Control
                              type="time"
                              value={materia.horaInicio}
                              onChange={(e) => handleMateriaChange(index, 'horaInicio', e.target.value)}
                              disabled={loading}
                            />
                          ) : (
                            materia.horaInicio
                          )}
                        </td>
                        <td>
                          {editingIndices[index] ? (
                            <Form.Control
                              type="time"
                              value={materia.horaFin}
                              onChange={(e) => handleMateriaChange(index, 'horaFin', e.target.value)}
                              disabled={loading}
                            />
                          ) : (
                            materia.horaFin
                          )}
                        </td>
                        <td>{materia.nombre}</td>
                        <td>{`${materia.nombreProfesor} ${materia.apellidoProfesor}`}</td>
                        <td>
                          <Button
                            variant={editingIndices[index] ? "success" : "primary"}
                            size="sm"
                            onClick={() => toggleEditing(index)}
                            disabled={loading}
                          >
                            {editingIndices[index] ? (
                              loading ? <Spinner size="sm" /> : "Guardar"
                            ) : "Editar"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : formData.idCurso && !loading && (
              <Alert variant="info" className="mt-3">
                Este curso no tiene materias asignadas.
              </Alert>
            )}

            <Button 
              variant="primary" 
              type="submit" 
              disabled={loading} 
              className="mt-3"
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Modificando...
                </>
              ) : 'Modificar Curso'}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default ModificarCursoPreceptor;