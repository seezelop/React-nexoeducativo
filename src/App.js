import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      apellido: '',
      dni: '',
      eMail: '',
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
    event.preventDefault(); // Evita la recarga de la página
  
    try {
      // Convertir el DNI a número
      const formData = {
        ...this.state,
        dni: parseInt(this.state.dni, 10),
      };
  
      // Hacer la petición fetch al backend en el endpoint "/usuario"
      const respuesta = await fetch('http://localhost:8080/usuario', {
        method: 'POST', // Tipo de petición: POST
        headers: {
          'Content-Type': 'application/json', // Indicar que se envía JSON
        },
        body: JSON.stringify(formData), // Enviar los datos del formulario
      });
  
      if (respuesta.ok) { // Si la respuesta es exitosa
        const datos = await respuesta.json(); // Obtener los datos de la respuesta
        console.log('Datos guardados:', datos);
        alert('Usuario creado exitosamente');
      } else {
        console.error('Error al guardar los datos');
        alert('Error al crear el usuario');
      }
    } catch (error) {
      console.error('Error en la conexión con el backend:', error);
      alert('Error en la conexión con el servidor');
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
              type="number" // Cambiamos a tipo "number" para que sea más intuitivo
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
              name="eMail" 
              value={this.state.eMail}
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
