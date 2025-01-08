import React, { Component } from 'react';
import axios from 'axios';

class ModificarProfesor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarioSeleccionado: 'Seleccione un usuario',
      idUsuario: null,
      nombre: '',
      apellido: '',
      dni: '',
      mail: '',
      telefono: '',
      activo: false,
    };
  }

  // Función que maneja el cambio en el dropdown de selección de usuarios
  handleDropdownChange = async (value) => {
    try {
      const parsedValue = JSON.parse(value);

      // Verifica que el valor contiene un idUsuario válido
      if (parsedValue && parsedValue.idUsuario) {
        console.log(parsedValue);  // Verifica si parsedValue tiene el idUsuario

        this.setState({
          usuarioSeleccionado: parsedValue.nombre,
          idUsuario: parsedValue.idUsuario,
        });

        // Realiza la solicitud GET solo si idUsuario es válido
        const response = await axios.get(`http://localhost:8080/api/usuario/getUsuario/${parsedValue.idUsuario}`, {
          withCredentials: true,
        });

        // Asigna los valores obtenidos en el estado
        const { nombre, apellido, dni, mail, telefono, activo } = response.data;
        this.setState({ nombre, apellido, dni, mail, telefono, activo });
      } else {
        console.error('El ID de usuario no es válido');
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  };

  // Función que maneja el envío del formulario de modificación
  handleSubmit = async (event) => {
    event.preventDefault();

    const { idUsuario, nombre, apellido, dni, mail, telefono, activo } = this.state;

    // Verifica que idUsuario esté definido antes de hacer la solicitud PATCH
    if (!idUsuario) {
      console.error('ID de usuario es requerido');
      return;
    }

    try {
      // Realiza la solicitud PATCH solo si idUsuario es válido
      const response = await axios.patch(
        `http://localhost:8080/api/usuario/modificarUsuario/${idUsuario}`,
        { nombre, apellido, dni, mail, telefono, activo },
        { withCredentials: true }
      );

      // Verifica si la respuesta fue exitosa
      if (response.status === 200) {
        alert('Usuario modificado exitosamente!');
        this.cargarUsuarios(); // Vuelve a cargar la lista de usuarios

        // Limpia el estado después de la modificación
        this.setState({
          usuarioSeleccionado: 'Seleccione un usuario',
          idUsuario: null,
          nombre: '',
          apellido: '',
          dni: '',
          mail: '',
          telefono: '',
          activo: false,
        });

        window.location.reload(); // Refresca la página para reflejar los cambios
      } else {
        alert('Error al modificar el usuario');
      }
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
    }
  };

  // Función que carga la lista de usuarios (puedes modificarla según tu API)
  cargarUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/usuario/getUsuarios', {
        withCredentials: true,
      });
      this.setState({ usuarios: response.data });
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  };

  render() {
    const { nombre, apellido, dni, mail, telefono, activo, usuarioSeleccionado } = this.state;

    return (
      <div>
        <h1>Modificar Profesor</h1>
        
        {/* Dropdown para seleccionar un usuario */}
        <select onChange={(e) => this.handleDropdownChange(e.target.value)}>
          {/* Aquí deberías cargar la lista de usuarios con los que quieras modificar */}
          <option value='{"idUsuario":1, "nombre": "Carlos"}'>Carlos</option>
          <option value='{"idUsuario":2, "nombre": "Ana"}'>Ana</option>
        </select>
        
        {/* Formulario de modificación */}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => this.setState({ nombre: e.target.value })}
            />
          </div>
          <div>
            <label>Apellido</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => this.setState({ apellido: e.target.value })}
            />
          </div>
          <div>
            <label>DNI</label>
            <input
              type="text"
              value={dni}
              onChange={(e) => this.setState({ dni: e.target.value })}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={mail}
              onChange={(e) => this.setState({ mail: e.target.value })}
            />
          </div>
          <div>
            <label>Teléfono</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => this.setState({ telefono: e.target.value })}
            />
          </div>
          <div>
            <label>Activo</label>
            <input
              type="checkbox"
              checked={activo}
              onChange={(e) => this.setState({ activo: e.target.checked })}
            />
          </div>
          <button type="submit">Modificar</button>
        </form>
      </div>
    );
  }
}

export default ModificarProfesor;
