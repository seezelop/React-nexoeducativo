import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class AltaMateria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      cursos: [],
      profesores: [],
      cursoSeleccionado: '',
      profesorSeleccionado: '',
    };
  }

  componentDidMount() {
    this.cargarCursos();
    this.cargarProfesores();
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

  // Cargar profesores desde el endpoint
  cargarProfesores = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/usuario/verProfesAdministrativo', {
        withCredentials: true,
      });
      this.setState({ profesores: response.data });
    } catch (error) {
      console.error('Error al cargar los profesores:', error);
      alert('Error al cargar los profesores.');
    }
  };

  // Manejar cambios en los campos del formulario
  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  // Manejar envío del formulario
  handleSubmit = async (event) => {
    event.preventDefault();

    const { nombre, cursoSeleccionado, profesorSeleccionado } = this.state;

    try {
      const response = await axios.post(
        'http://localhost:8080/api/usuario/saveMateria',
        {
          nombre,
          cursoId: cursoSeleccionado,
          profesorId: profesorSeleccionado,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        alert('Materia agregada exitosamente!');
        this.setState({
          nombre: '',
          cursoSeleccionado: '',
          profesorSeleccionado: '',
        });
      } else {
        alert('Error al agregar la materia.');
      }
    } catch (error) {
      console.error('Error al agregar la materia:', error);
      alert('Ocurrió un error al agregar la materia.');
    }
  };

  render() {
    const { nombre, cursos, profesores, cursoSeleccionado, profesorSeleccionado } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre de la Materia:</label>
          <Form.Control
            id="nombre"
            type="text"
            value={nombre}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cursoSeleccionado" className="form-label">Seleccionar Curso:</label>
          <Form.Select
            id="cursoSeleccionado"
            value={cursoSeleccionado}
            onChange={this.handleInputChange}
            required
          >
            <option value="">Seleccione un curso</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.nombre}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className="mb-3">
          <label htmlFor="profesorSeleccionado" className="form-label">Seleccionar Profesor:</label>
          <Form.Select
            id="profesorSeleccionado"
            value={profesorSeleccionado}
            onChange={this.handleInputChange}
            required
          >
            <option value="">Seleccione un profesor</option>
            {profesores.map((profesor) => (
              <option key={profesor.id} value={profesor.id}>
                {profesor.nombre} {profesor.apellido}
              </option>
            ))}
          </Form.Select>
        </div>

        <Button type="submit" className="btn btn-primary">Agregar Materia</Button>
      </form>
    );
  }
}

export default AltaMateria;
