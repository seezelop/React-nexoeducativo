import React, { Component } from "react";
import axios from "axios";

class AltaAlumno extends Component {
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
      rol: 7,
      cursoSeleccionado: "",
      padreSeleccionado: "",
      cursos: [], // Opciones de cursos
      padres: [], // Opciones de padres
      showModal: false,
      errores: {}, // Almacena los errores de validación
    };
  }

  componentDidMount() {
    // Cargar cursos 
    axios
      .get("http://localhost:8080/api/usuario/verCursoAdministrativo", { withCredentials: true })
      .then((response) => {
        console.log("Cursos recibidos:", response.data); //esto esta bien, pero no se muestra
        this.setState({ cursos: response.data });
      })
      .catch((error) => console.error("Error al cargar los cursos:", error));

    // Cargar padres
    axios
      .get("http://localhost:8080/api/usuario/obtenerPadres", { withCredentials: true })
      .then((response) => {
        console.log("padres recibidos:", response.data); // esto esta bien, pero no se muestra
        this.setState({ padres: response.data });
      })
      .catch((error) => console.error("Error al cargar los padres:", error));
  }

  // Validaciones por campo
  validarCampo = (id, value) => {
    let error = "";

    switch (id) {
      case "cursoSeleccionado":
        if (!value) {
          error = "Debe seleccionar un curso.";
        }
        break;

      case "padreSeleccionado":
        if (!value) {
          error = "Debe seleccionar un padre.";
        }
        break;

      // Resto de las validaciones
      default:
        error = this.validarCampoGenerico(id, value);
    }

    return error;
  };

  validarCampoGenerico = (id, value) => {
    switch (id) {
      case "nombre":
        if (!/^[a-zA-Z]{3,30}$/.test(value)) {
          return "El nombre debe tener entre 3 y 30 letras.";
        }
        break;
      case "apellido":
        if (!/^[a-zA-Z]{4,30}$/.test(value)) {
          return "El apellido debe tener entre 4 y 30 letras.";
        }
        break;
      case "dni":
        if (!/^\d{6,8}$/.test(value)) {
          return "El DNI debe tener entre 6 y 8 dígitos.";
        }
        break;
      case "mail":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Formato de email inválido.";
        }
        break;
      case "clave":
        if (
          !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,32}$/.test(
            value
          )
        ) {
          return "La clave debe tener entre 8 y 32 caracteres, al menos una letra mayúscula, una minúscula, un número y un carácter especial.";
        }
        break;
      case "telefono":
        if (!/^\d{7,9}$/.test(value)) {
          return "El teléfono debe tener entre 7 y 9 dígitos.";
        }
        break;
      default:
        break;
    }
    return "";
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

    const { errores, ...datosUsuario } = this.state;

    // Verifica si hay errores
    const erroresPendientes = Object.keys(datosUsuario).reduce((acc, key) => {
      const error = this.validarCampo(key, datosUsuario[key]);
      if (error) {
        acc[key] = error;
      }
      return acc;
    }, {});

    if (Object.keys(erroresPendientes).length > 0) {
      this.setState({ errores: erroresPendientes });
      alert("Por favor, corrija los errores antes de enviar.");
      return;
    }

    // Enviar datos al backend
    axios
      .post("http://localhost:8080/api/usuario/saveAlumno", datosUsuario, { withCredentials: true })
      .then((response) => {
        alert("Alumno creado correctamente.");
        window.location.reload();
      })
      .catch((error) => console.error("Error al crear el alumno:", error));
  };

  render() {
    const { errores, cursos, padres } = this.state;

    return (
      <section className="d-flex flex-column">
        <section className="container d-flex justify-content-center align-items-center flex-grow-1">
          <section className="col-lg-12">
            <form onSubmit={this.handleSubmit}>
              {/* Campos de texto */}
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
                      <div className="invalid-feedback">{errores[id]}</div>
                    )}
                  </div>
                )
              )}

              {/* Campo desplegable para cursos */}
              <div className="mb-3">
                <label htmlFor="cursoSeleccionado" className="form-label">
                  Curso
                </label>
                <select
                  id="cursoSeleccionado"
                  className={`form-select ${errores.cursoSeleccionado ? "is-invalid" : ""}`}
                  value={this.state.cursoSeleccionado}
                  onChange={this.handleChange}
                >
                  <option value="">Seleccione un curso</option>
                  {cursos.map((curso) => (
                    <option key={curso.idCurso} value={curso.idCurso}>
                      {curso.numero + curso.division}
                    </option>
                  ))}
                </select>
                {errores.cursoSeleccionado && (
                  <div className="invalid-feedback">{errores.cursoSeleccionado}</div>
                )}
              </div>

              {/* Campo desplegable para padres */}
              <div className="mb-3">
                <label htmlFor="padreSeleccionado" className="form-label">
                  Padre
                </label>
                <select
                  id="padreSeleccionado"
                  className={`form-select ${errores.padreSeleccionado ? "is-invalid" : ""}`}
                  value={this.state.padreSeleccionado}
                  onChange={this.handleChange}
                >
                  <option value="">Seleccione un padre</option>
                  {padres.map((padre) => (
                    <option key={padre.id_usuario} value={padre.id_usuario}>
                      {padre.nombre+" "+padre.apellido}
                    </option>
                  ))}
                </select>
                {errores.padreSeleccionado && (
                  <div className="invalid-feedback">{errores.padreSeleccionado}</div>
                )}
              </div>

              <div className="d-grid gap-2 mb-4">
                <button type="submit" className="btn btn-primary btn-lg">
                  Confirmar
                </button>
              </div>
            </form>
          </section>
        </section>
      </section>
    );
  }
}

export default AltaAlumno;
