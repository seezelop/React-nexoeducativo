import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class AltaMateria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '', // Solo incluimos 'nombre', ya que 'id_materia' es incremental
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

    const { nombre } = this.state; // Solo enviamos el campo 'nombre'

    try {
      console.log('Datos enviados al servidor:', { nombre }); // Verifica los datos enviados
      const response = await axios.post(
        'http://localhost:8080/api/usuario/saveMateria',
        { nombre }, // Cuerpo de la solicitud
        {
          headers: {
            'Content-Type': 'application/json', // Aseguramos que sea JSON
          },
          withCredentials: true, // Si necesitas enviar cookies
        }
      );

      if (response.status === 201) {
        alert('Materia agregada exitosamente!');
        this.setState({ nombre: '' }); // Limpiar el campo después de agregar
      } else {
        alert('Error al agregar la materia.');
      }
    } catch (error) {
      console.error('Error al agregar la materia:', error);
      if (error.response) {
        console.log('Detalles de la respuesta del servidor:', error.response.data); // Imprimir error del servidor
        alert(`Error: ${error.response.data.message || 'No se pudo agregar la materia'}`);
      } else {
        alert('Ocurrió un error inesperado.');
      }
    }
  };

  render() {
    const { nombre } = this.state;

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
        <Button type="submit" className="btn btn-primary">Agregar Materia</Button>
      </form>
    );
  }
}

export default AltaMateria;
