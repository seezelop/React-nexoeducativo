import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      apellido: '',
      dni: '',
      email: '',
      activo: false,
    };
  }

  manejarCambio = (event) => {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Modificar el método manejarEnvio para enviar los datos al backend
  manejarEnvio = async (event) => {
    event.preventDefault();

    // Aquí debes enviar los datos al backend
    try {
      const respuesta = await fetch('http://localhost:8080/api/guardarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      });

      if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log('Datos guardados:', datos);
      } else {
        console.error('Error al guardar los datos');
      }
    } catch (error) {
      console.error('Error en la conexión con el backend:', error);
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Formulario de Registro</h1>
        <form onSubmit={this.manejarEnvio}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={this.state.nombre}
              onChange={this.manejarCambio}
              required
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              name="apellido"
              value={this.state.apellido}
              onChange={this.manejarCambio}
              required
            />
          </div>
          <div>
            <label>DNI:</label>
            <input
              type="text"
              name="dni"
              value={this.state.dni}
              onChange={this.manejarCambio}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.manejarCambio}
              required
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="activo"
                checked={this.state.activo}
                onChange={this.manejarCambio}
              />
              Activo
            </label>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }
}

export default App;
