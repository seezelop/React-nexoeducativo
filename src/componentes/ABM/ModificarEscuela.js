import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

// Crear una instancia de axios con la URL base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

class ModificarEscuela extends Component {
  constructor(props) {
    super(props);
    this.state = {
      escuelaSeleccionada: 'Seleccione un colegio',
      id_escuela: null,
      nombre: null,
      direccion: null,
      activo: null,
      plan_id_plan: null,
      escuelas: [],
      usuarioModificoActivo: false,
      error: null,
      success: null,
      loading: false
    };
  }

  componentDidMount() {
    this.cargarEscuelas();
  }

  cargarEscuelas = async () => {
    try {
      const response = await api.get('/api/usuario/getEscuelas', {
        withCredentials: true,
      });
      const escuelas = response.data.map((escuela) => ({
        id_escuela: escuela.id_escuela,
        nombre: `${escuela.nombre} ${escuela.direccion}`,
      }));
      this.setState({ escuelas });
    } catch (error) {
      console.error('Error al cargar las escuelas:', error);
      this.setState({ 
        error: 'Error al cargar la lista de escuelas' 
      });
    }
  };

  handleDropdownChange = (value) => {
    const parsedValue = JSON.parse(value);
    this.setState({
      escuelaSeleccionada: parsedValue.nombre,
      id_escuela: parsedValue.id_escuela,
      nombre: '',
      direccion: '',
      activo: null,
      plan_id_plan: null,
      usuarioModificoActivo: false,
      error: null,
      success: null
    });
  };

  handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    
    if (id === 'activo') {
      this.setState({ 
        [id]: checked,
        usuarioModificoActivo: true
      });
    } else {
      this.setState({ 
        [id]: type === 'checkbox' ? checked : value,
        error: null
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { id_escuela, nombre, direccion, activo, plan_id_plan, usuarioModificoActivo } = this.state;
  
    if (!id_escuela) {
      this.setState({ error: 'Debe seleccionar una escuela para modificar' });
      return;
    }
  
    if (!usuarioModificoActivo && !nombre && !direccion && !plan_id_plan) {
      this.setState({ error: 'Debe modificar al menos un campo' });
      return;
    }
  
    const datos = {};
  
    if (usuarioModificoActivo) {
      datos.activo = activo ? 1 : 0;
    }
  
    if (nombre && nombre.trim() !== '') {
      datos.nombre = nombre.trim();
    }
  
    if (direccion && direccion.trim() !== '') {
      datos.direccion = direccion.trim();
    }
  
    if (plan_id_plan) {
      datos.idPlan = plan_id_plan;
    }
  
    try {
      this.setState({ loading: true, error: null, success: null });

      const response = await api.patch(
        `/api/usuario/modificarEscuela/${id_escuela}`,
        datos,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.status === 200) {
        this.setState({ 
          success: 'Escuela modificada exitosamente!',
          loading: false,
          nombre: '',
          direccion: '',
          plan_id_plan: null,
          usuarioModificoActivo: false
        });
        this.cargarEscuelas();
      }
    } catch (error) {
      console.error('Error al modificar la escuela:', error);
      
      let errorMessage = 'Ocurrió un error al modificar la escuela';
      
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 400) {
          errorMessage = 'Datos inválidos enviados al servidor';
        } else if (error.response.status === 401) {
          errorMessage = 'No autorizado. Por favor inicie sesión.';
        } else if (error.response.status === 404) {
          errorMessage = 'Ya hay una escuela registrada en esa direccion';
        }
      } else if (error.request) {
        errorMessage = 'No se recibió respuesta del servidor. Verifique su conexión.';
      }
  
      this.setState({ 
        error: errorMessage,
        loading: false
      });
    }
  };
  
  render() {
    const { 
      escuelaSeleccionada, 
      escuelas, 
      nombre, 
      direccion, 
      activo, 
      plan_id_plan, 
      id_escuela,
      error,
      success,
      loading
    } = this.state;

    return (
      <section className="d-flex flex-column">
        <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
          <section className="col-md-8 mb-5">
            <div className="card shadow-sm p-3"> 
              <h3 className="mb-4 text-center">Modificar escuela</h3>

              {error && (
                <Alert variant="danger" onClose={() => this.setState({ error: null })} dismissible>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" onClose={() => this.setState({ success: null })} dismissible>
                  {success}
                </Alert>
              )}

              <Form onSubmit={this.handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="dropdown-basic-button" className="form-label">Escuela:</label>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={escuelaSeleccionada}
                    onSelect={(value) => this.handleDropdownChange(value)}
                  >
                    {escuelas.map((escuela) => (
                      <Dropdown.Item
                        key={escuela.id_escuela}
                        eventKey={JSON.stringify({ id_escuela: escuela.id_escuela, nombre: escuela.nombre })}
                        className="text-dark"
                      >
                        {escuela.nombre}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </div>

                {id_escuela && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">Nombre:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombre || ''}
                        onChange={this.handleInputChange}
                        placeholder="Nuevo nombre"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="direccion" className="form-label">Dirección:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="direccion"
                        value={direccion || ''}
                        onChange={this.handleInputChange}
                        placeholder="Nueva dirección"
                      />
                    </div>

                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="activo"
                        checked={activo || false}
                        onChange={this.handleInputChange}
                      />
                      <label htmlFor="activo" className="form-check-label">Activo</label>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="plan_id_plan" className="form-label">Plan:</label>
                      <select
                        className="form-select"
                        id="plan_id_plan"
                        value={plan_id_plan || ''}
                        onChange={this.handleInputChange}
                      >
                        <option value="" disabled>Seleccione un plan</option>
                        <option value={1}>1 - Básico</option>
                        <option value={2}>2 - Premium</option>
                      </select>
                    </div>

                    <div className="d-grid gap-2">
                      <Button 
                        type="submit" 
                        variant="primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Guardando...
                          </>
                        ) : 'Guardar cambios'}
                      </Button>
                    </div>
                  </>
                )}
              </Form>
            </div>
          </section>
        </div>
      </section>
    );
  }
}

export default ModificarEscuela;