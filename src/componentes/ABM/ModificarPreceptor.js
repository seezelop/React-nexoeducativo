import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Form } from 'react-bootstrap';
import axios from 'axios';

// Crear una instancia de axios con la URL base
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

class ModificarPreceptor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profesores: [],
            profesorSeleccionado: 'Seleccione un preceptor',
            preceptor: null, // Renombrado de idUsuario a preceptor
            nombre: '',
            apellido: '',
            dni: '',
            mail: '',
            telefono: '',
            curso: "", // Renombrado de cursoSeleccionado a curso
            cursosDisponibles: [],
            activo: 0,
            errores: {},
            rol: 'preceptor',
            valoresOriginales: {},
            mensajeError: '', // Para mostrar errores al modificar
        };
    }

    // Validaciones por campo
    validarCampo = (id, value) => {
        let error = '';

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

            case 'curso':
                if (!value) {
                    error = 'Debes seleccionar un curso.';
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

    // Cargar la lista de preceptores
    cargarProfesores = async () => {
        try {
            const response = await api.get(`/api/usuario/getUsuarios/preceptor`, {
                withCredentials: true,
            });

            const profesores = response.data.map((profesor) => ({
                preceptor: profesor.idUsuario, // Cambiado de idUsuario a preceptor
                nombre: `${profesor.nombre} ${profesor.apellido} ${profesor.dni}`,
            }));

            this.setState({ profesores });
        } catch (error) {
            console.error('Error al cargar los preceptores:', error);
            this.setState({ mensajeError: 'Error al cargar los preceptores. Intente nuevamente.' });
        }
    };

    // Manejar selección de preceptor en el Dropdown
    handleDropdownChange = async (value) => {
        try {
            const parsedValue = JSON.parse(value);
            this.setState(
                {
                    profesorSeleccionado: parsedValue.nombre,
                    preceptor: parsedValue.preceptor, // Cambiado de idUsuario a preceptor
                    mensajeError: '', // Limpia mensajes de error previos
                },
                async () => {
                    try {
                        const response = await api.get(
                            `/api/usuario/getUsuario/${this.state.preceptor}`,
                            { withCredentials: true }
                        );

                        const { nombre, apellido, dni, mail, telefono, activo } = response.data;

                        this.setState({
                            nombre: nombre || '',
                            apellido: apellido || '',
                            dni: dni || '',
                            mail: mail || '',
                            telefono: telefono || '',
                            activo: activo ? 1 : 0,
                            valoresOriginales: { nombre, apellido, dni, mail, telefono, activo },
                        });
                    } catch (error) {
                        console.error("Error al cargar los datos del preceptor:", error);
                        this.setState({ mensajeError: 'Error al cargar los datos del preceptor. Intente nuevamente.' });
                    }
                }
            );
        } catch (error) {
            console.error("Error al procesar el preceptor seleccionado:", error);
            this.setState({ mensajeError: 'Error al procesar el preceptor seleccionado.' });
        }
    };

    // Manejar envío del formulario
    handleSubmit = async (event) => {
        event.preventDefault();
    
        const { preceptor, valoresOriginales, nombre, apellido, dni, mail, telefono, activo, curso } = this.state;
    
        if (!preceptor) {
            this.setState({ mensajeError: 'Por favor selecciona un preceptor antes de guardar los cambios.' });
            return;
        }
    
        // Crear objeto para enviar al backend
        const datosModificados = {};
    
        // Solo incluir los campos que han sido modificados
        if (nombre !== valoresOriginales.nombre) datosModificados.nombre = nombre;
        if (apellido !== valoresOriginales.apellido) datosModificados.apellido = apellido;
        if (dni !== valoresOriginales.dni) datosModificados.dni = dni;
        if (mail !== valoresOriginales.mail) datosModificados.mail = mail;
        if (telefono !== valoresOriginales.telefono) datosModificados.telefono = telefono;
        
        // Incluir el curso seleccionado si existe
        if (curso) {
            datosModificados.curso = curso;
            //console.log('CURSO SELECCIONADO: ' + datosModificados.curso);
            const asignarPreceptor = {
                preceptor: preceptor,
                curso: curso, // Cambiado de cursoId a curso
            };

            console.log('el asignar preceptor desde handle submit: '+JSON.stringify(asignarPreceptor))

            this.handleAsignarPreceptor(asignarPreceptor);
        }
    
        datosModificados.activo = activo;
    
        // Si no hay cambios, mostrar un mensaje y evitar el envío
        if (Object.keys(datosModificados).length === 0 || 
            (Object.keys(datosModificados).length === 1 && datosModificados.hasOwnProperty('activo'))) {
            this.setState({ mensajeError: 'No hay cambios para guardar.' });
            return;
        }
    
        console.log('Datos a enviar:', datosModificados);
    
        try {
            const response = await api.patch(
                `/api/usuario/modificarUsuario/${preceptor}`,
                datosModificados,
                { withCredentials: true }
            );
    
            if (response.status === 200) {
                alert('Preceptor modificado exitosamente!');
                this.cargarProfesores();
                this.setState({
                    profesorSeleccionado: 'Seleccione un preceptor',
                    preceptor: null,
                    nombre: '',
                    apellido: '',
                    dni: '',
                    mail: '',
                    telefono: '',
                    activo: 0,
                    curso: '',
                    valoresOriginales: {},
                    mensajeError: '',
                });
            } else {
                this.setState({ mensajeError: 'Error al modificar el preceptor: ' + response.data });
            }
        } catch (error) {
            console.error('Error al modificar el preceptor:', error);
            this.setState({ 
                mensajeError: 'Error al modificar el preceptor: ' + 
                (error.response?.data || 'Ocurrió un problema en la comunicación con el servidor') 
            });
        }
    };
    

    handleAsignarPreceptor = (asignarPreceptor) => {
        //console.log("datitos: " + JSON.stringify(asignarPreceptor));
        // endpoint para asignar el curso a un preceptor, luego extraer el id del curso
        fetch("http://localhost:8080/api/usuario/actualizarPreceptor", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(asignarPreceptor),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Preceptor asignado a curso correctamente.");
                    return response.text();
                } else {
                    throw new Error("Error al asignar el preceptor al curso");
                }
            })
            .then((data) => console.log("Asignación exitosa:", data))
            .catch((error) => {
                console.error("Error al asignar el preceptor:", error);
                this.setState({ mensajeError: error.message });
            });
    }


    componentDidMount() {
        this.cargarProfesores();
        this.obtenerCursos(); 
    }

    render() {
        const { profesores, profesorSeleccionado, activo, 
                errores, cursosDisponibles, curso, mensajeError } = this.state;

        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12">
                        {/* Mostrar mensaje de error si existe */}
                        {mensajeError && (
                            <div className="alert alert-danger" role="alert">
                                {mensajeError}
                            </div>
                        )}
                        
                        <form onSubmit={this.handleSubmit}>
                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">Preceptor</label>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={profesorSeleccionado}
                                    onSelect={this.handleDropdownChange}
                                    size="sm"
                                >
                                    {profesores.map((profesor) => (
                                        <Dropdown.Item
                                            key={profesor.preceptor}
                                            eventKey={JSON.stringify({
                                                preceptor: profesor.preceptor,
                                                nombre: profesor.nombre,
                                            })}
                                            style={{ color: 'black' }}
                                        >
                                            {profesor.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            {profesorSeleccionado !== 'Seleccione un preceptor' && (
                                <>
                                    {[
                                        { id: "nombre", label: "Nombre", type: "text" },
                                        { id: "apellido", label: "Apellido", type: "text" },
                                        { id: "dni", label: "DNI", type: "number" },
                                        { id: "mail", label: "Email", type: "email" },
                                        { id: "telefono", label: "Teléfono", type: "number" }
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
                                            {errores[id] && <div className="text-danger">{errores[id]}</div>}
                                        </div>
                                    ))}

                                    {/* Desplegable de cursos */}
                                    <div className="mb-3">
                                        <label htmlFor="curso" className="form-label">Seleccionar Curso</label>
                                        <select
                                            id="curso"
                                            className={`form-select ${errores.curso ? "is-invalid" : ""}`}
                                            value={curso}
                                            onChange={this.handleInputChange}
                                        >
                                            <option value="">Seleccione un curso</option>
                                            {cursosDisponibles.map((curso) => (
                                                <option key={curso.idCurso} value={curso.idCurso}>
                                                    {`${curso.numero}° ${curso.division}`}
                                                </option>
                                            ))}
                                        </select>
                                        {errores.curso && (
                                            <div className="invalid-feedback">{errores.curso}</div>
                                        )}
                                    </div>

                                    <Form.Check id="activo" type="checkbox" label="Activo" checked={activo} onChange={this.handleInputChange} />

                                    <Button type="submit" className="btn btn-primary mt-3">Guardar Cambios</Button>
                                </>
                            )}
                        </form>
                    </section>
                </section>
            </section>
        );
    }
}

export default ModificarPreceptor;