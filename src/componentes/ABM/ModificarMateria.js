import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class ModificarMateria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_materia: '',
      nombre: '',
    };
  }

  // Manejar cambios en los campos del formulario
  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  // Manejar la selección del ID de la materia y cargar sus detalles
  handleMateriaChange = async (event) => {
    const { value } = event.target;
    this.setState({ id_materia: value });

    try {
      const response = await axios.get(
        `http://localhost:8080/api/materia/${value}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        this.setState({ nombre: response.data.nombre });
      }
    } catch (error) {
      console.error('Error al cargar los detalles de la materia:', error);
    }
  };

  // Manejar el envío del formulario
  handleSubmit = async (event) => {
    event.preventDefault();

    const { id_materia, nombre } = this.state;

    try {
      const response = await axios.put(
        `http://localhost:8080/api/materia/modificar/${id_materia}`,
        { nombre },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert('Materia modificada exitosamente!');
        this.setState({ id_materia: '', nombre: '' });
      } else {
        alert('Error al modificar la materia.');
      }
    } catch (error) {
      console.error('Error al modificar la materia:', error);
    }
  };

  render() {
    const { id_materia, nombre } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id_materia" className="form-label">ID Materia:</label>
          <Form.Control
            id="id_materia"
            type="text"
            value={id_materia}
            onChange={this.handleMateriaChange}
            required
          />
        </div>
        {id_materia && (
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <Form.Control
              id="nombre"
              type="text"
              value={nombre}
              onChange={this.handleInputChange}
              required
            />
          </div>
        )}
        <Button type="submit" className="btn btn-primary">Guardar Cambios</Button>
      </form>
    );
  }
}

export default ModificarMateria;
