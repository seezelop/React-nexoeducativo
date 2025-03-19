import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class ModificarAlumno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profesores: [],
            profesorSeleccionado: 'Seleccione un alumno',
            id_usuario: null,
            nombre: '',
            apellido: '',
            dni: '',
            mail: '',
            jornada: '',
            telefono: '',
            activo: 0,
            errores: {}, // Almacena los errores de validación
            rol: 'alumno',
            valoresOriginales: {}, // Nuevo estado para almacenar los valores originales
            cursos: [], // Almacena la lista de cursos
            cursoSeleccionado: '', // Almacena el curso seleccionado
            padres: [], // Almacena la lista de padres
            padreSeleccionado: '' // Almacena el padre seleccionado
        };
    }

    // Validaciones por campo
    validarCampo = (id, value) => {
        let error = '';

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

            case 'jornada':
                if (!/^[a-zA-Z]{6,9}$/.test(value)) {
                    error = 'La jornada debe tener entre 6 y 9 letras.';
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

    // Manejar cambios en los inputs y aplicar validaciones
    handleInputChange = (event) => {
        const { id, value, type, checked } = event.target;
        const casteo = type === 'checkbox' ? (checked ? 1 : 0) : value;

        const error = this.validarCampo(id, casteo);

        this.setState((prevState) => ({
            [id]: casteo,
            errores: { ...prevState.errores, [id]: error },
        }));
    };

    // Cargar la lista de profesores
    cargarProfesores = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/usuario/verAlumnos`, {
                withCredentials: true,
            });

            const profesores = response.data.map((profesor) => ({
                id_usuario: profesor.id_usuario,
                nombre: `${profesor.nombre} ${profesor.apellido}`,
            }));

            if (response.status === 200) {
                console.log('info ', response.data)
            }

            this.setState({ profesores });
        } catch (error) {
            console.error('Error al cargar los alumnos:', error);
        }
    };

    // Cargar la lista de cursos
    cargarCursos = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/usuario/verCursoAdministrativo", {
                withCredentials: true,
            });

            if (response.data && Array.isArray(response.data)) {
                console.log("Cursos recibidos:", response.data);
                this.setState({ cursos: response.data });
            } else {
                console.error("Formato inesperado en cursos:", response.data);
            }
        } catch (error) {
            console.error("Error al cargar los cursos:", error);
        }
    };

    // Cargar la lista de padres
    cargarPadres = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/usuario/obtenerPadres", {
                withCredentials: true,
            });

            if (response.data && Array.isArray(response.data)) {
                console.log("Padres recibidos:", response.data);
                this.setState({ padres: response.data });
            } else {
                console.error("Formato inesperado en padres:", response.data);
            }
        } catch (error) {
            console.error("Error al cargar los padres:", error);
        }
    };

    // Manejar selección de profesor en el Dropdown
    handleDropdownChange = async (value) => {
        try {
            const parsedValue = JSON.parse(value);
            this.setState(
                {
                    profesorSeleccionado: parsedValue.nombre,
                    id_usuario: parsedValue.id_usuario,
                },
                async () => {
                    console.log("Estado actualizado:", {
                        profesorSeleccionado: this.state.profesorSeleccionado,
                        id_usuario: this.state.id_usuario,
                    });

                    try {
                        const response = await axios.get(
                            `http://localhost:8080/api/usuario/getUsuario/${this.state.id_usuario}`,
                            { withCredentials: true }
                        );

                        console.log("Datos obtenidos del alumno:", response.data);

                        const { nombre, apellido, dni, mail, telefono, activo, jornada } = response.data;

                        this.setState({
                            nombre: nombre || '',
                            apellido: apellido || '',
                            dni: dni || '',
                            mail: mail || '',
                            telefono: telefono || '',
                            activo: activo ? 1 : 0,
                            jornada: jornada || '',
                            valoresOriginales: { nombre, apellido, dni, mail, telefono, activo, jornada },
                        });
                    } catch (error) {
                        console.error("Error al cargar los datos del alumno:", error);
                    }
                }
            );
        } catch (error) {
            console.error("Error al procesar el alumno seleccionado:", error);
        }
    };

    // Manejar selección de curso en el Dropdown
    handleCursoChange = (value) => {
        this.setState({ cursoSeleccionado: value });
    };

    // Manejar selección de padre en el Dropdown
    handlePadreChange = (value) => {
        this.setState({ padreSeleccionado: value });
    };

    // Manejar envío del formulario
    handleSubmit = async (event) => {
    event.preventDefault();

    const { id_usuario, nombre, apellido, dni, mail, telefono, activo, jornada, cursoSeleccionado, padreSeleccionado, valoresOriginales } = this.state;

    if (!id_usuario) {
        alert('Por favor selecciona un alumno antes de guardar los cambios.');
        return;
    }

    // Crear un objeto con solo los valores modificados y no vacíos
    const datosModificados = {};

    // Comparar cada campo con el valor original y agregarlo si cambió y no está vacío
    if (nombre !== valoresOriginales.nombre && nombre !== '') datosModificados.nombre = nombre;
    if (apellido !== valoresOriginales.apellido && apellido !== '') datosModificados.apellido = apellido;
    if (dni !== valoresOriginales.dni && dni !== '') datosModificados.dni = dni;
    if (mail !== valoresOriginales.mail && mail !== '') datosModificados.mail = mail;
    if (telefono !== valoresOriginales.telefono && telefono !== '') datosModificados.telefono = telefono;
    if (jornada !== valoresOriginales.jornada && jornada !== '') datosModificados.jornada = jornada;

    // Agregar curso y padre si fueron seleccionados y no están vacíos
    if (cursoSeleccionado) datosModificados.curso = cursoSeleccionado;
    if (padreSeleccionado) datosModificados.padre = padreSeleccionado;

    // Siempre incluir el campo "activo", aunque no haya cambiado
    datosModificados.activo = activo;

    // Si no hay cambios además del campo activo, no enviamos la petición
    if (Object.keys(datosModificados).length === 0 && datosModificados.hasOwnProperty('activo') || Object.keys(datosModificados).length === 0 && datosModificados.hasOwnProperty('activo')) {
        alert('No hay cambios para guardar.');
        return;
    }

    console.log('Datos a enviar:', datosModificados);

    try {
        const response = await axios.patch(
            `http://localhost:8080/api/usuario/modificarAlumno/${id_usuario}`,
            datosModificados,
            { withCredentials: true }
        );

        if (response.status === 200) {
            alert('Alumno modificado exitosamente!');
            this.cargarProfesores();
            this.setState({
                profesorSeleccionado: 'Seleccione un alumno',
                id_usuario: null,
                nombre: '',
                apellido: '',
                dni: '',
                mail: '',
                telefono: '',
                activo: 0,
                jornada: '',
                cursoSeleccionado: '',
                padreSeleccionado: '',
                valoresOriginales: {}
            });
            window.location.reload();
        } else {
            alert('Error al modificar el alumno');
        }
    } catch (error) {
        console.error('Error al modificar el alumno:', error);
    }
};


    componentDidMount() {
        this.cargarProfesores();
        this.cargarCursos();
        this.cargarPadres();
    }

    render() {
        const { profesores, profesorSeleccionado, nombre, apellido, dni, mail, telefono, activo, jornada, errores, cursos, cursoSeleccionado, padres, padreSeleccionado } = this.state;

        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">Alumno</label>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={profesorSeleccionado}
                                    onSelect={this.handleDropdownChange}
                                    size="sm"
                                >
                                    {profesores.map((profesor) => (
                                        <Dropdown.Item
                                            key={profesor.id_usuario}
                                            eventKey={JSON.stringify({
                                                id_usuario: profesor.id_usuario,
                                                nombre: profesor.nombre,
                                            })}
                                            style={{ color: 'black' }} // Estilo para texto negro
                                        >
                                            {profesor.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            {profesorSeleccionado !== 'Seleccione un alumno' && (
                                <>
                                    {[
                                        { id: "nombre", label: "Nombre", type: "text" },
                                        { id: "apellido", label: "Apellido", type: "text" },
                                        { id: "dni", label: "DNI", type: "number" },
                                        { id: "mail", label: "Email", type: "email" },
                                        { id: "telefono", label: "Teléfono", type: "number" },
                                        { id: "jornada", label: "Jornada", type: "text" }
                                    ].map(({ id, label, type }) => (
                                        <div className="mb-3" key={id}>
                                            <label htmlFor={id} className="form-label">{label}</label>
                                            <Form.Control
                                                id={id}
                                                type={type}
                                                value={this.state[id]}
                                                onChange={this.handleInputChange}
                                                className={errores[id] ? "is-invalid" : ""}
                                                placeholder={`Ingresa ${label.toLowerCase()}`}
                                            />
                                            {errores[id] && <div style={{
                                                color: "black", fontWeight: "bold",
                                                fontSize: "0.9rem", marginTop: "0.3rem"
                                            }}>{errores[id]}</div>}
                                        </div>
                                    ))}

                                    <div className="mb-3">
                                        <label htmlFor="activo" className="form-label">Activo:</label>
                                        <Form.Check
                                            id="activo"
                                            type="checkbox"
                                            checked={activo}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="curso" className="form-label">Curso:</label>
                                        <DropdownButton
                                            id="curso"
                                            title={cursoSeleccionado || "Seleccione un curso"}
                                            onSelect={this.handleCursoChange}
                                            size="sm"
                                        >
                                            {cursos.map((curso) => (
                                                <Dropdown.Item
                                                    key={curso.idCurso}
                                                    eventKey={curso.idCurso}
                                                >
                                                    {curso.numero} {curso.division}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="padre" className="form-label">Padre:</label>
                                        <DropdownButton
                                            id="padre"
                                            title={padreSeleccionado || "Seleccione un padre"}
                                            onSelect={this.handlePadreChange}
                                            size="sm"
                                        >
                                            {padres.map((padre) => (
                                                <Dropdown.Item
                                                    key={padre.id}
                                                    eventKey={padre.nombre}
                                                >
                                                    {padre.nombre} {padre.apellido}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </div>

                                    <div className="d-grid gap-2 mb-4">
                                        <Button type="submit" className="btn btn-primary">Guardar Cambios</Button>
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

export default ModificarAlumno;