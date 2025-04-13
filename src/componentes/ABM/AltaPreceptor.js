import React, { Component } from "react";
const API_URL = process.env.REACT_APP_API_URL;
class AltaPreceptor extends Component {
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
      rol: 4, 
      cursoSeleccionado: "", // Curso seleccionado
      cursosDisponibles: [],  // Lista de cursos
      showModal: false,
      errores: {},
    };
  }

  componentDidMount() {
    this.obtenerCursos();
  }

  // Obtener cursos disponibles desde el backend
  obtenerCursos = () => {
    fetch(`${API_URL}/api/usuario/cursosSinPreceptor`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => this.setState({ cursosDisponibles: data }))
      .catch((error) =>
        console.error("Error al obtener los cursos:", error)
      );
  };

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
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,32}$/.test(value)) {
          error = "La clave debe tener entre 8 y 32 caracteres, con mayúsculas, minúsculas, números y un carácter especial.";
        }
        break;

      case "telefono":
        if (!/^\d{7,9}$/.test(value)) {
          error = "El teléfono debe tener entre 7 y 9 dígitos.";
        }
        break;

      case "cursoSeleccionado":
        if (!value) {
          error = "Debe seleccionar un curso.";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Maneja cambios en los inputs
  handleChange = (event) => {
    const { id, value } = event.target;
    const error = this.validarCampo(id, value);

    this.setState((prevState) => ({
      [id]: value,
      errores: { ...prevState.errores, [id]: error },
    }));
  };

  // Manejar envío del formulario
 handleSubmit = (e) => {
  e.preventDefault();

  const { errores, ...datosUsuario } = this.state;

  // Validar campos
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

  // Datos a enviar
  const datos = {
    nombre: this.state.nombre,
    apellido: this.state.apellido,
    dni: this.state.dni,
    mail: this.state.mail,
    clave: this.state.clave,
    telefono: this.state.telefono,
    activo: this.state.activo,
    rol: this.state.rol,
  };

  const asignarPreceptor = {
    preceptor: this.state.dni,
    curso: this.state.cursoSeleccionado
  }

  fetch(`${API_URL}/api/usuario/altaUsuario`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
  .then((response) => {
    if (response.ok) {
      alert("Preceptor dado de alta correctamente.");
      this.handleAsignarPreceptor(asignarPreceptor);
    } else {
      // Extract error message from response
      return response.text().then(errorText => {
        throw new Error(errorText || `Error del servidor: ${response.status}`);
      });
    }
  })
  .catch((error) => {
    console.error("Error al dar de alta preceptor:", error);
    alert(`Error al dar de alta preceptor: ${error.message}`);
  });
};

 handleAsignarPreceptor = (asignarPreceptor) => { 
  //console.log("datitos: " + JSON.stringify(asignarPreceptor));
  
  return fetch(`${API_URL}/api/usuario/asignarPreceptor`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(asignarPreceptor),
  })
  .then((response) => {
    if (response.ok) {
      return response.text().then(data => {
        console.log("Asignación exitosa:", data);
        window.location.reload();
        return data;
      });
    } else {
      // Extract error message from response
      return response.text().then(errorText => {
        throw new Error(errorText || `Error del servidor: ${response.status}`);
      });
    }
  })
  .catch((error) => {
    console.error("Error al asignar el preceptor:", error);
    alert(`Error al asignar el preceptor: ${error.message}`);
  });
}
  

  render() {
    const { errores, cursosDisponibles, cursoSeleccionado } = this.state;

    return (
      <section className="d-flex flex-column">
        <section className="container d-flex justify-content-center align-items-center flex-grow-1">
          <section className="col-lg-12">
            <form onSubmit={this.handleSubmit}>
              {/* Campos de usuario */}
              {[
                { id: "nombre", label: "Nombre", type: "text" },
                { id: "apellido", label: "Apellido", type: "text" },
                { id: "dni", label: "DNI", type: "number" },
                { id: "mail", label: "Email", type: "email" },
                { id: "clave", label: "Clave", type: "password" },
                { id: "telefono", label: "Teléfono", type: "number" },
              ].map(({ id, label, type }) => (
                <div className="mb-3" key={id}>
                  <label htmlFor={id} className="form-label">{label}</label>
                  <input
                    type={type}
                    className={`form-control ${errores[id] ? "is-invalid" : ""}`}
                    id={id}
                    value={this.state[id]}
                    onChange={this.handleChange}
                    placeholder={`Ingrese su ${label.toLowerCase()}`}
                    required
                  />
                  {errores[id] && (
                    <div className="invalid-feedback">{errores[id]}</div>
                  )}
                </div>
              ))}

              {/* Desplegable de cursos */}
              <div className="mb-3">
                <label htmlFor="cursoSeleccionado" className="form-label">Seleccionar Curso</label>
                <select
                  id="cursoSeleccionado"
                  className={`form-select ${errores.cursoSeleccionado ? "is-invalid" : ""}`}
                  value={cursoSeleccionado}
                  onChange={this.handleChange}
                  required
                >
                  <option value="">Seleccione un curso</option>
                  {cursosDisponibles.map((curso) => (
                    <option key={curso.idCurso} value={curso.idCurso}>
                      {`${curso.numero}° ${curso.division}`}
                    </option>
                  ))}
                </select>
                {errores.cursoSeleccionado && (
                  <div className="invalid-feedback">{errores.cursoSeleccionado}</div>
                )}
              </div>

              <div className="d-grid gap-2 mb-4">
                <button type="submit" className="btn btn-primary btn-lg">
                  Confirmar Asignación
                </button>
              </div>
            </form>
          </section>
        </section>
      </section>
    );
  }
}

export default AltaPreceptor;
