import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class AltaMateria extends Component {
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

  // Manejar envío del formulario
  handleSubmit = async (event) => {
    event.preventDefault();

    const { id_materia, nombre } = this.state;

    try {
      const response = await axios.post(
        'http://localhost:8080/api/materia/alta',
        { id_materia, nombre },
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert('Materia agregada exitosamente!');
        this.setState({ id_materia: '', nombre: '' });
      } else {
        alert('Error al agregar la materia.');
      }
    } catch (error) {
      console.error('Error al agregar la materia:', error);
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
            onChange={this.handleInputChange}
            required
          />
        </div>
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
        <Button type="submit" className="btn btn-primary">Agregar Materia</Button>
      </form>
    );
  }
}

export default AltaMateria;
