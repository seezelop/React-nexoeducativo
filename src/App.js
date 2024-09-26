import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // Definir el estado inicial
    this.state = {
      nombre: '',
      apellido: '',
      dni: '',
      email: '',
      activo: false,
    };
  }

  // Manejar los cambios en los campos del formulario
  manejarCambio = (event) => {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Manejar el envío del formulario
  manejarEnvio = (event) => {
    event.preventDefault();
    console.log('Formulario enviado:', this.state);
    // Aquí podrías enviar los datos a un backend o procesarlos
  };

  render() {
    return (
      <div className="App">
        <h1>Formulario de Registro de usuarios</h1>
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
