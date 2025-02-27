import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class ModificarMateria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursos: [],
      materias: [],
      cursoSeleccionado: '',
      materiaSeleccionada: '',
      materiaEnviar:''
    };
  }

  componentDidMount() {
    this.cargarMaterias();
  }
  // Cargar materias según el curso seleccionado
  cargarMaterias = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/usuario/verMaterias`, {
        withCredentials: true,
      });
      this.setState({ materias: response.data });
      console.log ('cargar materias: '+response.data)
    } catch (error) {
      console.error('Error al cargar las materias:', error);
      alert('Error al cargar las materias.');
    }
  };


  // Manejar cambio en el desplegable de materia
  handleMateriaChange = (event) => {
    this.setState(
      { materiaSeleccionada: event.target.value,
        materiaEnviar:'', //se reinicia
       },
    );
  };

  handleNombreChange = (event) => {
    this.setState({ materiaEnviar: event.target.value });
  };

  // Manejar envío del formulario para eliminar la materia
  handleSubmit = async (event) => {
    event.preventDefault();

    const { materiaSeleccionada, materiaEnviar } = this.state;
    const idMateria=materiaSeleccionada;

    if (!idMateria) {
      alert('Por favor, selecciona una materia.');
      return;
    }

    if (!materiaEnviar.trim()) {
      alert('El nuevo nombre no puede estar vacío.');
      return;
    }

    try {      
      await axios.patch(
        `http://localhost:8080/api/usuario/modificarMateria/${idMateria}`, 
        { nombre: materiaEnviar }, // Solo el cuerpo JSON
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true } // Opciones de la petición
      );
      

      alert('Materia editada exitosamente.');
      this.setState({
        materiaSeleccionada: '',
        materias: [],
      });
    } catch (error) {
      console.error('Error al editar la materia:', error);
      alert('Error al editar la materia.');
    }
  };

  render() {
    const { materias, materiaSeleccionada, materiaEnviar } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {/* Desplegable de Materias */}
        <div className="mb-3">
          <label htmlFor="materiaSeleccionada" className="form-label">Seleccionar Materia:</label>
          <Form.Select
            id="materiaSeleccionada"
            value={materiaSeleccionada}
            onChange={this.handleMateriaChange}
            required
          >
            <option value="">Seleccione una materia</option>
            {materias.map((materia) => (
              <option key={materia.idMateria} value={materia.idMateria}>
                {materia.nombre}
              </option>
            ))}
          </Form.Select>
        </div>

        {materiaSeleccionada && (
          <div className="mb-3">
            <label htmlFor="materiaEnviar" className="form-label">Nombre:</label>
            <Form.Control
              type="text"
              id="nuevoNombreMateria"
              value={materiaEnviar}
              onChange={this.handleNombreChange}
              placeholder="Ingrese el nuevo nombre"
              required
            />
          </div>
        )}

        <Button type="submit" className="btn btn-danger">Modificar Materia</Button>
      </form>
    );
  }
}

export default ModificarMateria;
