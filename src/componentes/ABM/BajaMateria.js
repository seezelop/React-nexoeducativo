import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class BajaMateria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursos: [],
      materias: [],
      cursoSeleccionado: '',
      materiaSeleccionada: '',
    };
  }

  componentDidMount() {
    this.cargarCursos();
  }

  // Cargar cursos desde el endpoint
  cargarCursos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/usuario/verCursoAdministrativo', {
        withCredentials: true,
      });
      this.setState({ cursos: response.data });
    } catch (error) {
      console.error('Error al cargar los cursos:', error);
      alert('Error al cargar los cursos.');
    }
  };

  // Cargar materias según el curso seleccionado
  cargarMaterias = async (cursoId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/usuario/verMaterias/${cursoId}`, {
        withCredentials: true,
      });
      this.setState({ materias: response.data });
    } catch (error) {
      console.error('Error al cargar las materias:', error);
      alert('Error al cargar las materias.');
    }
  };

  // Manejar cambio en el desplegable de curso
  handleCursoChange = (event) => {
    const cursoSeleccionado = event.target.value;
    this.setState({ cursoSeleccionado, materiaSeleccionada: '' });

    if (cursoSeleccionado) {
      this.cargarMaterias(cursoSeleccionado);
    } else {
      this.setState({ materias: [] });
    }
  };

  // Manejar cambio en el desplegable de materia
  handleMateriaChange = (event) => {
    this.setState({ materiaSeleccionada: event.target.value });
  };

  // Manejar envío del formulario para eliminar la materia
  handleSubmit = async (event) => {
    event.preventDefault();

    const { materiaSeleccionada } = this.state;

    if (!materiaSeleccionada) {
      alert('Por favor, selecciona una materia para eliminar.');
      return;
    }

    try {
      await axios.delete('http://localhost:8080/api/usuario/borrarMateria', {
        data: { idMateria: materiaSeleccionada },
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      alert('Materia eliminada exitosamente.');
      this.setState({
        cursoSeleccionado: '',
        materiaSeleccionada: '',
        materias: [],
      });
    } catch (error) {
      console.error('Error al eliminar la materia:', error);
      alert('Error al eliminar la materia.');
    }
  };

  render() {
    const { cursos, materias, cursoSeleccionado, materiaSeleccionada } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {/* Desplegable de Cursos */}
        <div className="mb-3">
          <label htmlFor="cursoSeleccionado" className="form-label">Seleccionar Curso:</label>
          <Form.Select
            id="cursoSeleccionado"
            value={cursoSeleccionado}
            onChange={this.handleCursoChange}
            required
          >
            <option value="">Seleccione un curso</option>
            {cursos.map((curso) => (
              <option key={curso.idCurso} value={curso.idCurso}>
                {curso.nombre}
              </option>
            ))}
          </Form.Select>
        </div>

        {/* Desplegable de Materias */}
        <div className="mb-3">
          <label htmlFor="materiaSeleccionada" className="form-label">Seleccionar Materia:</label>
          <Form.Select
            id="materiaSeleccionada"
            value={materiaSeleccionada}
            onChange={this.handleMateriaChange}
            required
            disabled={!cursoSeleccionado}
          >
            <option value="">Seleccione una materia</option>
            {materias.map((materia) => (
              <option key={materia.idMateria} value={materia.idMateria}>
                {materia.nombre}
              </option>
            ))}
          </Form.Select>
        </div>

        <Button type="submit" className="btn btn-danger">Eliminar Materia</Button>
      </form>
    );
  }
}

export default BajaMateria;
