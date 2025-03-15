import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class ModificarEscuela extends Component {
  constructor(props) {
    super(props);
    this.state = {
      escuelaSeleccionada: 'Seleccione un colegio',
      id_escuela: null,
      nombre: '',
      direccion: '',
      activo: false,
      plan_id_plan: null,
      escuelas: [],
    };
  }

  componentDidMount() {
    this.cargarEscuelas();
  }

  cargarEscuelas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/usuario/getEscuelas', {
        withCredentials: true,
      });
      const escuelas = response.data.map((escuela) => ({
        id_escuela: escuela.id_escuela,
        nombre: `${escuela.nombre} ${escuela.direccion}`,
      }));
      this.setState({ escuelas });
    } catch (error) {
      console.error('Error al cargar las escuelas:', error);
    }
  };

  handleDropdownChange = (value) => {
    const parsedValue = JSON.parse(value);
    this.setState({
      escuelaSeleccionada: parsedValue.nombre,
      id_escuela: parsedValue.id_escuela,
      nombre: '',
      direccion: '',
      activo: false,
      plan_id_plan: null,
    });
  };

  handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    this.setState({ [id]: type === 'checkbox' ? checked : value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { id_escuela, nombre, direccion, activo, plan_id_plan } = this.state;

    try {
      const datos = { nombre, direccion, activo: activo ? 1 : 0, plan_id_plan };
      const response = await axios.patch(
        `http://localhost:8080/api/usuario/modificarEscuela/${id_escuela}`,
        datos,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert('Escuela modificada exitosamente!');
        this.cargarEscuelas();
      }
    } catch (error) {
      console.error('Error al modificar la escuela:', error);
      alert('Ocurrió un error al intentar modificar la escuela.');
    }
  };

  render() {
    const { escuelaSeleccionada, escuelas, nombre, direccion, activo, plan_id_plan, id_escuela } = this.state;

    return (
      <section className="d-flex flex-column min-vh-100">
        <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
          
          <section className="col-md-8 mb-5">
            <div className="card shadow-sm p-3"> 
              <h3 className="mb-4 text-center">SELECCIONAR ESCUELA</h3>

              <Form onSubmit={this.handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="dropdown-basic-button" className="form-label">Desplegable:</label>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={escuelaSeleccionada}
                    onSelect={(value) => this.handleDropdownChange(value)}
                  >
                    {escuelas.map((escuela) => (
                      <Dropdown.Item
                        key={escuela.id_escuela}
                        eventKey={JSON.stringify({ id_escuela: escuela.id_escuela, nombre: escuela.nombre })}
                        className="text-dark"  // COLOR NEGRO PARA LOS TEXTOS DEL DESPLEGABLE
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
                        value={nombre}
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
                        value={direccion}
                        onChange={this.handleInputChange}
                        placeholder="Nueva dirección"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="activo" className="form-label">Activo:</label>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="activo"
                        checked={activo}
                        onChange={this.handleInputChange}
                      />
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
                      <Button type="submit" className="btn btn-primary">Guardar cambios</Button>
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
