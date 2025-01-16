import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class BajaCurso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursos: [],
      cursoSeleccionado: '',
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

  // Manejar cambio en el desplegable de curso
  handleCursoChange = (event) => {
    const cursoSeleccionado = event.target.value;
    this.setState({ cursoSeleccionado});
  };

  // Manejar envío del formulario para eliminar la materia
  handleSubmit = async (event) => {
  }

  render() {
    const { cursos,cursoSeleccionado} = this.state;

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
                {curso.numero+curso.division}
              </option>
            ))}
          </Form.Select>
        </div>


        <Button type="submit" className="btn btn-danger">Eliminar Curso</Button>
      </form>
    );
  }
}

export default BajaCurso;
