import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class BajaCursoPreceptor extends Component {
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
      const response = await axios.get('http://localhost:8080/api/usuario/verCursoPreceptor', {
        withCredentials: true,
      });
      this.setState({ cursos: response.data });
      //console.log('CARGANDO CURSOS PRECEPTOR: '+response.data)
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
    event.preventDefault();
  
  const { cursoSeleccionado } = this.state;
  
  // Validar que se haya seleccionado un curso
  if (!cursoSeleccionado) {
    alert('Por favor, seleccione un curso para eliminar.');
    return;
  }
  
  // Confirmación antes de eliminar
  const confirmar = window.confirm('¿Está seguro que desea eliminar este curso? Esta acción no se puede deshacer.');
  
  if (confirmar) {
    try {
      // Llamada a la API para eliminar el curso
      await axios.delete(`http://localhost:8080/api/usuario/borrarCurso/${cursoSeleccionado}`, {
        withCredentials: true,
      });
      
      // Actualizar la lista de cursos después de eliminar
      this.cargarCursos();
      
      // Resetear la selección
      this.setState({ cursoSeleccionado: '' });
      
      // Notificar al usuario
      alert('Curso eliminado con éxito.');
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
      
      // Mostrar mensaje de error específico si está disponible
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.mensaje || error.response.data}`);
      } else {
        alert('Error al eliminar el curso. Por favor, intente nuevamente.');
      }
    }
  }
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

export default BajaCursoPreceptor;
