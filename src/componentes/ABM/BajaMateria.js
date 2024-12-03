import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class BajaMateria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_materia: '',
    };
  }

  // Manejar cambios en el campo del formulario
  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ id_materia: value });
  };

  // Manejar envío del formulario
  handleSubmit = async (event) => {
    event.preventDefault();

    const { id_materia } = this.state;

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/materia/baja/${id_materia}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert('Materia eliminada exitosamente!');
        this.setState({ id_materia: '' });
      } else {
        alert('Error al eliminar la materia.');
      }
    } catch (error) {
      console.error('Error al eliminar la materia:', error);
    }
  };

  render() {
    const { id_materia } = this.state;

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
        <Button type="submit" className="btn btn-danger">Eliminar Materia</Button>
      </form>
    );
  }
}

export default BajaMateria;
