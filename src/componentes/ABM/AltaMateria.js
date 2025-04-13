import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
class AltaMateria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: ''
    };
  }

  // Manejar cambios en el input del nombre
  handleInputChange = (event) => {
    this.setState({ nombre: event.target.value });
  };

  // Manejar envío del formulario
  handleSubmit = async (event) => {
    event.preventDefault();
    const { nombre } = this.state;

    try {
      const response = await api.post(
        '/api/usuario/saveMateria',
        { nombre }, // Enviar solo el nombre
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (response.status === 201) {
        alert('Materia agregada exitosamente!');
        this.setState({ nombre: '' }); // Resetear el campo de entrada
      } else {
        alert('Error al agregar la materia.');
      }
    } catch (error) {
      console.error('Error al agregar la materia:', error);
      alert('Ocurrió un error al agregar la materia.', error.data);
    }
  };

  render() {
    const { nombre } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="col-md-6 mx-auto">
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

        <Button type="submit" className="btn btn-primary w-100">Agregar Materia</Button>
      </form>
    );
  }
}

export default AltaMateria;
