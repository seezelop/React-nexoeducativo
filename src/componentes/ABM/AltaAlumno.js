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
      jornada: "",
      activo: 1,
      idCurso: "",
      idPadre: "",
      cursos: [], // Opciones de cursos
      padres: [], // Opciones de padres
      errores: {}, // Almacena los errores de validación
    };
  }

  componentDidMount() {
    // Cargar cursos
    axios
      .get("http://localhost:8080/api/usuario/verCursoAdministrativo", { withCredentials: true })
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          console.log("Cursos recibidos:", response.data);
          this.setState({ cursos: response.data });
        } else {
          console.error("Formato inesperado en cursos:", response.data);
        }
      })
      .catch((error) => console.error("Error al cargar los cursos:", error));

    // Cargar padres
    axios
      .get("http://localhost:8080/api/usuario/obtenerPadres", { withCredentials: true })
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          console.log("Padres recibidos:", response.data);
          this.setState({ padres: response.data });
        } else {
          console.error("Formato inesperado en padres:", response.data);
        }
      })
      .catch((error) => console.error("Error al cargar los padres:", error));
  }

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
        case "jornada":
        if (!/^[a-zA-Z]{6,8}$/.test(value)) {
          return "La jornada debe tener entre 6 y 8 letras.";
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

  handleChange = (event) => {
    const { id, value } = event.target;
    const error = this.validarCampo(id, value);

    this.setState((prevState) => ({
      [id]: value,
      errores: { ...prevState.errores, [id]: error },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { errores, cursos, padres, ...datosUsuario } = this.state;

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

    axios
      .post("http://localhost:8080/api/usuario/saveAlumno", datosUsuario, { withCredentials: true })
      .then(() => {
        alert("Alumno creado correctamente.");
        window.location.reload();
      })
      .catch((error) => console.error("Error al crear el alumno:", error));
  };

  render() {
    const { errores, cursos, padres } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {/* Campos de texto */}
        {[
          { id: "nombre", label: "Nombre", type: "text" },
          { id: "apellido", label: "Apellido", type: "text" },
          { id: "dni", label: "DNI", type: "number" },
          { id: "mail", label: "Email", type: "email" },
          { id: "jornada", label: "Jornada", type: "text" },
          { id: "clave", label: "Clave", type: "password" },
          { id: "telefono", label: "Teléfono", type: "number" },
        ].map(({ id, label, type }) => (
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
              placeholder={`Ingrese ${label.toLowerCase()}`}
              required
            />
            {errores[id] && <div className="invalid-feedback">{errores[id]}</div>}
          </div>
        ))}

        {/* Cursos */}
        <div className="mb-3">
          <label htmlFor="idCurso" className="form-label">
            Curso
          </label>
          <select
            id="idCurso"
            className={`form-select ${errores.idCurso ? "is-invalid" : ""}`}
            value={this.state.idCurso}
            onChange={this.handleChange}
          >
            <option value="">Seleccione un curso</option>
            {cursos.length > 0 ? (
              cursos.map((curso) => (
                <option key={curso.idCurso} value={curso.idCurso}>
                  {curso.numero + curso.division}
                </option>
              ))
            ) : (
              <option disabled>No hay cursos disponibles</option>
            )}
          </select>
          {errores.idCurso && <div className="invalid-feedback">{errores.idCurso}</div>}
        </div>

        {/* Padres */}
        <div className="mb-3">
          <label htmlFor="idPadre" className="form-label">
            Padre
          </label>
          <select
            id="idPadre"
            className={`form-select ${errores.idPadre ? "is-invalid" : ""}`}
            value={this.state.idPadre}
            onChange={this.handleChange}
          >
            <option value="">Seleccione un padre</option>
            {padres.length > 0 ? (
              padres.map((padre) => (
                <option key={padre.id_usuario} value={padre.id_usuario}>
                  {padre.nombre + " " + padre.apellido}
                </option>
              ))
            ) : (
              <option disabled>No hay padres disponibles</option>
            )}
          </select>
          {errores.idPadre && <div className="invalid-feedback">{errores.idPadre}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          Confirmar
        </button>
      </form>
    );
  }
}

export default AltaAlumno;
