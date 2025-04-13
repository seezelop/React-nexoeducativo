import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

// Crear una instancia de axios con la URL base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

class ModificarJefeColegio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jefesColegio: [],
      jefeSeleccionado: 'Seleccione un jefe',
      idUsuario: null,
      nombre: '',
      apellido: '',
      rol: 'jefe%20colegio',
      dni: '',
      mail: '',
      telefono: '',
      activo: true,
      errores: {},
      error: null,
      success: null,
      loading: false
    };
  }

  // Validación mejorada de campos
  validarCampo = (id, value) => {
    if (!value.trim()) return '';
    
    const validaciones = {
      nombre: {
        regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,30}$/,
        mensaje: 'El nombre debe tener entre 3 y 30 letras'
      },
      apellido: {
        regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{4,30}$/,
        mensaje: 'El apellido debe tener entre 4 y 30 letras'
      },
      dni: {
        regex: /^\d{6,8}$/,
        mensaje: 'El DNI debe tener entre 6 y 8 dígitos'
      },
      mail: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        mensaje: 'Formato de email inválido'
      },
      telefono: {
        regex: /^\d{7,9}$/,
        mensaje: 'El teléfono debe tener entre 7 y 9 dígitos'
      }
    };

    return validaciones[id] && !validaciones[id].regex.test(value) 
      ? validaciones[id].mensaje 
      : '';
  };

  handleInputChange = (event) => {
    const { id, value } = event.target;
    const error = this.validarCampo(id, value);

    this.setState({
      [id]: value,
      errores: {
        ...this.state.errores,
        [id]: error
      },
      error: null
    });
  };

  handleCheckboxChange = (event) => {
    this.setState({ 
      activo: event.target.checked
    });
  };

  cargarJefes = async () => {
    try {
      const response = await api.get(
        `/api/usuario/getUsuariosSuperAdmin/${this.state.rol}`,
        { withCredentials: true }
      );

      const jefesColegio = response.data.map(jefe => ({
        idUsuario: jefe.idUsuario,
        nombre: `${jefe.nombre} ${jefe.apellido} ${jefe.dni}`,
      }));

      this.setState({ jefesColegio });
    } catch (error) {
      this.mostrarError('Error al cargar la lista de jefes', error);
    }
  };

  handleDropdownChange = (value) => {
    const parsedValue = JSON.parse(value);
    
    // Solo establecemos el ID y nombre del jefe seleccionado
    // NO cargamos los demás datos
    this.setState({
      jefeSeleccionado: parsedValue.nombre,
      idUsuario: parsedValue.idUsuario,
      nombre: '',
      apellido: '',
      dni: '',
      mail: '',
      telefono: '',
      activo: true,
      errores: {},
      error: null,
      success: null
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { idUsuario, nombre, apellido, dni, mail, telefono, activo, errores } = this.state;

    // Validaciones básicas
    if (!idUsuario) {
      this.setState({ error: 'Debe seleccionar un jefe de colegio' });
      return;
    }

    // Validar que al menos un campo tenga datos
    if (!nombre && !apellido && !dni && !mail && !telefono) {
      this.setState({ error: 'Debe completar al menos un campo' });
      return;
    }

    // Verificar si hay errores de validación
    const hayErrores = Object.values(errores).some(error => error);
    if (hayErrores) {
      this.setState({ error: 'Corrija los errores antes de enviar' });
      return;
    }

    try {
      this.setState({ loading: true, error: null, success: null });
      
      const datos = {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        dni: dni.trim(),
        mail: mail.trim(),
        telefono: telefono.trim(),
        activo: activo ? 1 : 0
      };

      // Eliminar campos vacíos antes de enviar
      Object.keys(datos).forEach(key => {
        if (datos[key] === '') delete datos[key];
      });

      const response = await api.patch(
        `/api/usuario/modificarUsuario/${idUsuario}`,
        datos,
        { 
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.status === 200) {
        this.mostrarExito('Jefe modificado exitosamente!');
        this.cargarJefes();
        this.resetearFormulario();
      }
    } catch (error) {
      this.mostrarError('Error al modificar el jefe', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  mostrarError = (mensaje, error) => {
    let errorDetails = null;
    
    if (error.response) {
      if (error.response.status === 400) {
        if (error.response.data && error.response.data.errors) {
          errorDetails = error.response.data.errors.map(err => err.msg).join(', ');
        } else if (error.response.data && error.response.data.message) {
          errorDetails = error.response.data.message;
        } else {
          errorDetails = 'El mail y/o dni que desea ingresar ya existe en el sistema';
        }
      }
    }

    this.setState({
      error: mensaje,
      errorDetails: errorDetails || error.message
    });
  };

  mostrarExito = (mensaje) => {
    this.setState({
      success: mensaje
    });
  };

  resetearFormulario = () => {
    this.setState({
      nombre: '',
      apellido: '',
      dni: '',
      mail: '',
      telefono: '',
      activo: true,
      errores: {}
    });
  };

  componentDidMount() {
    this.cargarJefes();
  }

  render() {
    const { 
      jefesColegio, 
      jefeSeleccionado, 
      nombre, 
      apellido, 
      dni, 
      mail, 
      telefono, 
      activo, 
      errores,
      error,
      errorDetails,
      success,
      loading
    } = this.state;

    const campos = [
      { id: 'nombre', label: 'Nombre', type: 'text' },
      { id: 'apellido', label: 'Apellido', type: 'text' },
      { id: 'dni', label: 'DNI', type: 'number' },
      { id: 'mail', label: 'Email', type: 'email' },
      { id: 'telefono', label: 'Teléfono', type: 'tel' }
    ];

    return (
      <section className="d-flex flex-column">
        <section className="container d-flex justify-content-center align-items-center flex-grow-1">
          <section className="col-lg-8">
            {/* Mensajes de feedback */}
            {error && (
              <Alert variant="danger" onClose={() => this.setState({ error: null, errorDetails: null })} dismissible>
                <strong>{error}</strong>
                {errorDetails && <div className="mt-2">{errorDetails}</div>}
              </Alert>
            )}

            {success && (
              <Alert variant="success" onClose={() => this.setState({ success: null })} dismissible>
                {success}
              </Alert>
            )}

            <Form onSubmit={this.handleSubmit}>
              <div className="mb-4">
                <Form.Label>Jefe de Colegio</Form.Label>
                <DropdownButton
                  variant="outline-secondary"
                  title={jefeSeleccionado}
                  onSelect={this.handleDropdownChange}
                  className="w-100"
                >
                  {jefesColegio.map(jefe => (
                    <Dropdown.Item
                      key={jefe.idUsuario}
                      eventKey={JSON.stringify(jefe)}
                      className="text-dark"
                    >
                      {jefe.nombre}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>

              {jefeSeleccionado !== 'Seleccione un jefe' && (
                <>
                  {campos.map(({ id, label, type }) => (
                    <Form.Group key={id} className="mb-3">
                      <Form.Label>{label}</Form.Label>
                      <Form.Control
                        id={id}
                        type={type}
                        value={this.state[id]}
                        onChange={this.handleInputChange}
                        isInvalid={!!errores[id]}
                        placeholder={`Ingrese ${label.toLowerCase()}`}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores[id]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  ))}

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="switch"
                      id="activo"
                      label="Activo"
                      checked={activo}
                      onChange={this.handleCheckboxChange}
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Procesando...
                        </>
                      ) : 'Guardar Cambios'}
                    </Button>
                  </div>
                </>
              )}
            </Form>
          </section>
        </section>
      </section>
    );
  }
}

export default ModificarJefeColegio;