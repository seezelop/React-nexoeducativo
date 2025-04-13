import React, { Component } from "react";

class AltaAdministrativo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      dni: "",
      mail: "",
      clave: "",
      telefono: "",
      activo: 1,
      rol: 3, // Por defecto, administrativo
      showModal: false,
      errores: {}, // Almacena los errores de validación
    };
  }

  // Validaciones por campo
  validarCampo = (id, value) => {
    let error = "";

    switch (id) {
      case 'nombre':
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,30}$/.test(value)) {
            error = 'El nombre debe tener entre 3 y 30 caracteres (solo letras y espacios).';
        }
        break;

    case 'apellido':
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{4,30}$/.test(value)) {
            error = 'El apellido debe tener entre 4 y 30 caracteres (solo letras y espacios).';
        }
        break;

      case "dni":
        if (!/^\d{6,8}$/.test(value)) {
          error = "El DNI debe tener entre 6 y 8 dígitos.";
        }
        break;

      case "mail":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Formato de email inválido.";
        }
        break;

      case "clave":
        if (
          !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,32}$/.test(
            value
          )
        ) {
          error =
            "La clave debe tener entre 8 y 32 caracteres, al menos una letra mayúscula, una minúscula, un número y un carácter especial.";
        }
        break;

      case "telefono":
        if (!/^\d{7,9}$/.test(value)) {
          error = "El teléfono debe tener entre 7 y 9 dígitos.";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Maneja cambios en los inputs y aplica validaciones
  handleChange = (event) => {
    const { id, value } = event.target;
    const error = this.validarCampo(id, value);

    this.setState((prevState) => ({
      [id]: value,
      errores: { ...prevState.errores, [id]: error },
    }));
  };

  // Maneja el envío del formulario con validación
  handleSubmit = (e) => {
    e.preventDefault();

    const { errores, showModal, ...datosUsuario } = this.state;

    // Verifica si hay errores
    const erroresPendientes = Object.keys(datosUsuario).reduce((acc, key) => {
      if (key !== 'activo' && key !== 'rol') {
        const error = this.validarCampo(key, datosUsuario[key]);
        if (error) {
          acc[key] = error;
        }
      }
      return acc;
    }, {});

    if (Object.keys(erroresPendientes).length > 0) {
      this.setState({ errores: erroresPendientes });
      alert("Por favor, corrija los errores antes de enviar.");
      return;
    }

    // Usar la variable de entorno para la URL del backend
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    
    // Enviar datos al backend
    fetch(`${API_URL}/api/usuario/altaUsuario`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosUsuario),
    })
      .then((response) => {
        if (response.ok) {
          this.setState({ showModal: true });
          alert("Administrativo creado correctamente.");
          window.location.reload(); // Recarga la página
          return response.text();
        } else {
          return response.text().then(text => {
            throw new Error(text || 'Error al crear administrativo');
          });
        }
      })
      .then((data) => console.log("Administrativo creado:", data))
      .catch((error) => {
        console.error("Error al crear administrativo:", error);
        alert(`Error: ${error.message}`);
      });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { errores } = this.state;

    return (
      <section className="d-flex flex-column">
        <section className="container d-flex justify-content-center align-items-center flex-grow-1">
          <section className="col-lg-12">
            <form onSubmit={this.handleSubmit}>
              {[{ id: "nombre", label: "Nombre", type: "text" },
                { id: "apellido", label: "Apellido", type: "text" },
                { id: "dni", label: "DNI", type: "number" },
                { id: "mail", label: "Email", type: "email" },
                { id: "clave", label: "Clave", type: "password" },
                { id: "telefono", label: "Teléfono", type: "number" }].map(
                ({ id, label, type }) => (
                  <div className="mb-3" key={id}>
                    <label htmlFor={id} className="form-label">
                      {label}
                    </label>
                    <input
                      type={type}
                      className={`form-control ${errores[id] ? "is-invalid" : ""}`}
                      id={id}
                      value={this.state[id]}
                      onChange={this.handleChange}
                      placeholder={`Ingresa tu ${label.toLowerCase()}`}
                      required
                    />
                    {errores[id] && (
                      <div
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                          marginTop: "0.3rem",
                        }}
                      >
                        {errores[id]}
                      </div>
                    )}
                  </div>
                )
              )}

              {this.state.showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Nexo Educativo</h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={this.closeModal}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>Administrativo creado exitosamente</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                          onClick={this.closeModal}
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="d-grid gap-2 mb-4">
                <button type="submit" className="btn btn-primary btn-lg">
                  Crear Administrativo
                </button>
              </div>
            </form>
          </section>
        </section>
      </section>
    );
  }
}

export default AltaAdministrativo;