import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

const ModificarCurso = () => {
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

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/usuario/verCursoAdministrativo', {
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

  const obtenerInfoMaterias = async (idCurso) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/usuario/infoMateriasActualizarCurso/${idCurso}`, {
        withCredentials: true,
      });

      // Guardamos una copia de las materias originales para comparar después
      const materiasData = response.data;
      console.log('Materias obtenidas:', materiasData);
      setMaterias(materiasData);
      setMateriasOriginales(JSON.parse(JSON.stringify(materiasData))); // Copia profunda
      setEditingIndices({}); // Reiniciar el estado de edición

    } catch (error) {
      console.error('Error al cargar las materias:', error.response?.data || error.message);
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
      setFormDataOriginal(JSON.parse(JSON.stringify(cursoData))); // Copia profunda

      // Obtener las materias cuando se selecciona un curso
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

  // Manejar la edición de campos de materia
  const handleMateriaChange = (index, field, value) => {
    const nuevasMaterias = [...materias];
    nuevasMaterias[index][field] = value;
    setMaterias(nuevasMaterias);
  };

  // Alternar el modo de edición para una materia
  const toggleEditing = (index) => {
    setEditingIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Obtener solo los datos modificados del curso
  const getModifiedCourseData = () => {
    const modified = {};
    
    // Siempre incluir el ID del curso
    modified.idCurso = formData.idCurso;
    
    // Verificar cada campo para ver si ha cambiado
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

  // Obtener solo las materias modificadas
  const getModifiedSubjects = () => {
    const materiasModificadas = [];
    
    materias.forEach((materia, index) => {
      const materiaOriginal = materiasOriginales[index];
      const modified = {};
      let hasChanges = false;
      
      // Siempre incluir el ID de la materia si existe
      if (materia.idMateria) {
        modified.idMateria = materia.idMateria;
      }
      
      // Verificar solo los campos editables para ver si han cambiado
      // Excluimos 'nombre', 'nombreProfesor', 'apellidoProfesor'
      const camposAComparar = ['dia', 'horaInicio', 'horaFin'];
      
      camposAComparar.forEach(campo => {
        if (materia[campo] !== materiaOriginal[campo]) {
          modified[campo] = materia[campo];
          hasChanges = true;
        }
      });
      
      // Solo agregar la materia si tiene cambios
      if (hasChanges) {
        materiasModificadas.push(modified);
      }
    });
    
    return materiasModificadas;
  };

  // Método unificado para enviar al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.idCurso) {
      alert('Debe seleccionar un curso para modificar.');
      return;
    }

    setLoading(true);
    try {
      // Obtener solo los datos modificados del curso y materias
      const cursoModificado = getModifiedCourseData();
      const materiasModificadas = getModifiedSubjects();
      
      // Crear el objeto de datos a enviar
      const dataToSend = {
        ...cursoModificado
      };
      
      // Solo incluir materias si hay cambios
      if (materiasModificadas.length > 0) {
        dataToSend.materias = materiasModificadas;
      }

      console.log('INFO A EDITAR: '+JSON.stringify(dataToSend))
      
      // Actualizar la información del curso (esto incluirá las materias modificadas)
      const cursoResponse = await axios.patch(
        `http://localhost:8080/api/usuario/modificarCurso/${formData.idCurso}`,
        dataToSend,
        { withCredentials: true }
      );

      if (cursoResponse.status === 200) {
        alert('Curso modificado exitosamente!');
        // Actualizar la lista de cursos y materias
        const cursosActualizados = await axios.get('http://localhost:8080/api/usuario/verCursoAdministrativo', {
          withCredentials: true,
        });
        setCursos(cursosActualizados.data);
        obtenerInfoMaterias(formData.idCurso);
        //comentario
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

      {/* Tabla de Materias */}
      {materias.length > 0 && (
        <div className="mt-4">
          <h4>Materias del Curso</h4>
          <Table striped>
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
          />
        ) : (
          materia.dia
        )}
      </td>
      <td>
        {editingIndices[index] ? (
          <Form.Control
            type="text"
            value={materia.horaInicio}
            onChange={(e) => handleMateriaChange(index, 'horaInicio', e.target.value)}
          />
        ) : (
          materia.horaInicio
        )}
      </td>
      <td>
        {editingIndices[index] ? (
          <Form.Control
            type="text"
            value={materia.horaFin}
            onChange={(e) => handleMateriaChange(index, 'horaFin', e.target.value)}
          />
        ) : (
          materia.horaFin
        )}
      </td>
      <td>
        {/* Materia siempre no editable */}
        {materia.nombre}
      </td>
      <td>
        {/* Profesor siempre no editable */}
        {`${materia.nombreProfesor} ${materia.apellidoProfesor}`}
      </td>
      <td>
        <Button
          variant={editingIndices[index] ? "success" : "primary"}
          size="sm"
          onClick={() => toggleEditing(index)}
        >
          {editingIndices[index] ? "Guardar" : "Editar"}
        </Button>
      </td>
    </tr>
  ))}
</tbody>
</Table>

        </div>
      )}

      <Button variant="primary" type="submit" disabled={loading} className="mt-3">
        {loading ? 'Modificando...' : 'Modificar Curso'}
      </Button>
    </Form>
  );
};

export default ModificarCurso;