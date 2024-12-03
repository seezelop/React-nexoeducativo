import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class AltaProfesor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_usuario: '',
      nombre: '',
      apellido: '',
      dni: '',
      mail: '',
      clave: '',
      telefono: '',
      activo: true,
      pago_cuota: false,
      Rol_id_rol: '',
    };
  }

  // Manejar cambios en los campos del formulario
  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  // Manejar el cambio en el estado activo (checkbox)
  handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    this.setState({ [id]: checked });
  };

  // Manejar el envío del formulario
  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      id_usuario,
      nombre,
      apellido,
      dni,
      mail,
      clave,
      telefono,
      activo,
      pago_cuota,
      Rol_id_rol,
    } = this.state;

    try {
      const response = await axios.post(
        'http://localhost:8080/api/usuario/alta',
        {
          id_usuario,
          nombre,
          apellido,
          dni,
          mail,
          clave,
          telefono,
          activo,
          pago_cuota,
          Rol_id_rol,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert('Profesor agregado exitosamente!');
        this.setState({
          id_usuario: '',
          nombre: '',
          apellido: '',
          dni: '',
          mail: '',
          clave: '',
          telefono: '',
          activo: true,
          pago_cuota: false,
          Rol_id_rol: '',
        });
      } else {
        alert('Error al agregar el profesor.');
      }
    } catch (error) {
      console.error('Error al agregar el profesor:', error);
    }
  };

  render() {
    const {
      id_usuario,
      nombre,
      apellido,
      dni,
      mail,
      clave,
      telefono,
      activo,
      pago_cuota,
      Rol_id_rol,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id_usuario" className="form-label">ID Usuario:</label>
          <Form.Control
            id="id_usuario"
            type="text"
            value={id_usuario}
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
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido:</label>
          <Form.Control
            id="apellido"
            type="text"
            value={apellido}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dni" className="form-label">DNI:</label>
          <Form.Control
            id="dni"
            type="text"
            value={dni}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mail" className="form-label">Email:</label>
          <Form.Control
            id="mail"
            type="email"
            value={mail}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="clave" className="form-label">Contraseña:</label>
          <Form.Control
            id="clave"
            type="password"
            value={clave}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono:</label>
          <Form.Control
            id="telefono"
            type="text"
            value={telefono}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="activo" className="form-label">Activo:</label>
          <Form.Check
            id="activo"
            type="checkbox"
            checked={activo}
            onChange={this.handleCheckboxChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pago_cuota" className="form-label">Pago de cuota:</label>
          <Form.Check
            id="pago_cuota"
            type="checkbox"
            checked={pago_cuota}
            onChange={this.handleCheckboxChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Rol_id_rol" className="form-label">ID Rol:</label>
          <Form.Control
            id="Rol_id_rol"
            type="text"
            value={Rol_id_rol}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <Button type="submit" className="btn btn-primary">Agregar Profesor</Button>
      </form>
    );
  }
}

export default AltaProfesor;
