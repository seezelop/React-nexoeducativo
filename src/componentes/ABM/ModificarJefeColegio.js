import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class ModificarJefeColegio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jefesColegio: [], // Lista de jefes del colegio
      jefeSeleccionado: 'Seleccione un jefe',
      idUsuario: null,
      nombre: '',
      apellido: '',
      rol: 'jefe%20colegio', // %20 para espacio en la request
      dni: '',
      mail: '',
      telefono: '',
      activo: true, // Cambiado a true por defecto
      activoModificado: false, // Flag para controlar si el usuario modificó el campo activo
      errores: {}, // Errores de validación
      camposModificados: {}, // Seguimiento de campos modificados
    };
  }

  // Validar campo individual
  validarCampo = (id, value) => {
    let error = '';
    
    // Solo validar si el campo ha sido modificado y no está vacío
    if (value.trim() === '') {
      return '';
    }

    switch (id) {
      case 'nombre':
        if (!/^[a-zA-Z]{3,30}$/.test(value)) {
          error = 'El nombre debe tener entre 3 y 30 letras.';
        }
        break;
      case 'apellido':
        if (!/^[a-zA-Z]{4,30}$/.test(value)) {
          error = 'El apellido debe tener entre 4 y 30 letras.';
        }
        break;
      case 'dni':
        if (!/^\d{6,8}$/.test(value)) {
          error = 'El DNI debe tener entre 6 y 8 dígitos.';
        }
        break;
      case 'mail':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Formato de email inválido.';
        }
        break;
      case 'telefono':
        if (!/^\d{7,9}$/.test(value)) {
          error = 'El teléfono debe tener entre 7 y 9 dígitos.';
        }
        break;
      default:
        break;
    }
    return error;
  };

  // Manejar cambios en los inputs y validar
  handleInputChange = (event) => {
    const { id, value } = event.target;
    
    // Marcar el campo como modificado
    this.setState(prevState => ({
      camposModificados: {
        ...prevState.camposModificados,
        [id]: true
      }
    }));
    
    // Actualizar el valor del campo
    this.setState({ [id]: value });
    
    // Validar solo si el campo no está vacío
    if (value.trim() !== '') {
      const error = this.validarCampo(id, value);
      
      this.setState(prevState => ({
        errores: {
          ...prevState.errores,
          [id]: error
        }
      }));
    } else {
      // Si el campo está vacío, eliminar cualquier error existente
      this.setState(prevState => ({
        errores: {
          ...prevState.errores,
          [id]: ''
        }
      }));
    }
  };

  // Manejar cambio específico para el checkbox
  handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    
    this.setState({ 
      activo: isChecked,
      activoModificado: true,
      camposModificados: {
        ...this.state.camposModificados,
        activo: true
      }
    });
    
    console.log('Checkbox cambiado a:', isChecked);
  };

  // Cargar la lista de jefes del colegio
  cargarJefes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/usuario/getUsuariosSuperAdmin/${this.state.rol}`,
        { withCredentials: true }
      );

      console.log('Respuesta del servidor:', response.data);

      const jefesColegio = response.data.map((jefe) => ({
        idUsuario: jefe.idUsuario,
        nombre: `${jefe.nombre} ${jefe.apellido} ${jefe.dni}`,
      }));

      console.log('Jefes mapeados:', jefesColegio);

      this.setState({ jefesColegio });
    } catch (error) {
      console.error('Error al cargar los jefes:', error);
      alert('Ocurrió un error al cargar los datos de los jefes.');
    }
  };

  // Manejar selección de jefe en el Dropdown
  handleDropdownChange = async (value) => {
    const parsedValue = JSON.parse(value);
    console.log('Jefe seleccionado:', parsedValue);

    this.setState({
      jefeSeleccionado: parsedValue.nombre,
      idUsuario: parsedValue.idUsuario,
      // Resetear camposModificados cuando se selecciona un nuevo jefe
      camposModificados: {},
      activoModificado: false, // Resetear el flag cuando se selecciona un nuevo jefe
      errores: {},
      activo: true // Establecer a true por defecto cuando se selecciona un nuevo jefe
    });

    try {
      const response = await axios.get(
        `http://localhost:8080/api/usuario/modificarUsuario/${parsedValue.idUsuario}`,
        { withCredentials: true }
      );

      console.log('Datos del jefe seleccionado:', response.data);

      const { nombre, apellido, dni, mail, telefono } = response.data;
      this.setState({
        nombre: nombre || '',
        apellido: apellido || '',
        dni: dni || '',
        mail: mail || '',
        telefono: telefono || '',
        activo: true, // Siempre establecer a true, ignorando el valor de la API
      });
    } catch (error) {
      console.error('Error al cargar los datos del jefe:', error);
    }
  };

  // Manejar envío del formulario
  handleSubmit = async (event) => {
    event.preventDefault();

    const { idUsuario, nombre, apellido, dni, mail, telefono, activo, errores, camposModificados, activoModificado } = this.state;

    // Validar que idUsuario no sea null o vacío
    if (!idUsuario) {
      alert('Por favor, seleccione un jefe.');
      return;
    }

    // Verificar si hay errores en los campos modificados
    const hayErrores = Object.keys(camposModificados).some(campo => 
      camposModificados[campo] && errores[campo]
    );

    if (hayErrores) {
      alert('Por favor, corrija los errores antes de guardar los cambios.');
      return;
    }

    // Crear objeto con los campos modificados
    const datosActualizados = {};
    if (camposModificados.nombre) datosActualizados.nombre = nombre;
    if (camposModificados.apellido) datosActualizados.apellido = apellido;
    if (camposModificados.dni) datosActualizados.dni = dni;
    if (camposModificados.mail) datosActualizados.mail = mail;
    if (camposModificados.telefono) datosActualizados.telefono = telefono;
    
    // Lógica para el campo activo:
    // Si el usuario modificó el campo, enviar el valor convertido (1 para true, 0 para false)
    // Si no lo modificó, se envía 1 por defecto
    datosActualizados.activo = activoModificado ? (activo ? 1 : 0) : 1;

    // Si no hay campos modificados aparte de activo, verificar
    if (Object.keys(datosActualizados).length === 1 && 'activo' in datosActualizados && !activoModificado) {
      alert('No se han realizado cambios.');
      return;
    }

    console.log('Datos a enviar:', datosActualizados); // Para depuración

    try {
      const response = await axios.patch(
        `http://localhost:8080/api/usuario/modificarUsuario/${idUsuario}`,
        datosActualizados,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert('Jefe modificado exitosamente!');
        this.cargarJefes();
        this.setState({
          jefeSeleccionado: 'Seleccione un jefe',
          idUsuario: null,
          nombre: '',
          apellido: '',
          dni: '',
          mail: '',
          telefono: '',
          activo: true, // Restablecer a true al terminar
          activoModificado: false, // Resetear el flag
          camposModificados: {},
          errores: {}
        });
      } else {
        alert('Error al modificar el jefe');
      }
    } catch (error) {
      console.error('Error al modificar el jefe:', error);
    }
  };

  componentDidMount() {
    this.cargarJefes();
  }

  render() {
    const { jefesColegio, jefeSeleccionado, nombre, apellido, dni, mail, telefono, activo, errores } = this.state;

    return (
      <section className="d-flex flex-column">
        <section className="container d-flex justify-content-center align-items-center flex-grow-1">
          <section className="col-lg-12">
            <form onSubmit={this.handleSubmit}>
              <div className="pb-5">
                <label htmlFor="dropdown-basic-button" className="form-label">
                  Jefe Colegio
                </label>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={jefeSeleccionado}
                  onSelect={this.handleDropdownChange}
                  size="sm"
                >
                  {jefesColegio.map((jefe) => (
                    <Dropdown.Item
                      key={jefe.idUsuario}
                      eventKey={JSON.stringify({
                        idUsuario: jefe.idUsuario,
                        nombre: jefe.nombre,
                      })}
                    >
                      {jefe.nombre}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>

              {jefeSeleccionado !== 'Seleccione un jefe' && (
                <>
                  {[{ id: 'nombre', label: 'Nombre', type: 'text' },
                    { id: 'apellido', label: 'Apellido', type: 'text' },
                    { id: 'dni', label: 'DNI', type: 'number' },
                    { id: 'mail', label: 'Email', type: 'email' },
                    { id: 'telefono', label: 'Teléfono', type: 'number' }].map(({ id, label, type }) => (
                    <div className="mb-3" key={id}>
                      <label htmlFor={id} className="form-label">
                        {label}
                      </label>
                      <Form.Control
                        id={id}
                        type={type}
                        value={this.state[id]}
                        onChange={this.handleInputChange}
                        className={errores[id] ? 'is-invalid' : ''}
                        placeholder={`Ingresa ${label.toLowerCase()}`}
                      />
                      {errores[id] && <div style={{ color: 'red' }}>{errores[id]}</div>}
                    </div>
                  ))}

                  <div className="mb-3">
                    <label htmlFor="activo" className="form-label">Activo:</label>
                    <Form.Check
                      id="activo"
                      type="checkbox"
                      checked={activo}
                      onChange={this.handleCheckboxChange}
                    />
                  </div>

                  <div className="d-grid gap-2 mb-4">
                    <Button type="submit" className="btn btn-primary">
                      Guardar Cambios
                    </Button>
                  </div>
                </>
              )}
            </form>
          </section>
        </section>
      </section>
    );
  }
}

export default ModificarJefeColegio;

