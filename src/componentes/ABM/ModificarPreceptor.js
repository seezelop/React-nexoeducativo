import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class ModificarPreceptor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profesores: [],
            profesorSeleccionado: 'Seleccione un preceptor',
            idUsuario: null,
            nombre: '',
            apellido: '',
            dni: '',
            mail: '',
            telefono: '',
            cursoSeleccionado: "", // Curso seleccionado
            cursosDisponibles: [],  // Lista de cursos
            activo: 0,
            errores: {}, // Almacena los errores de validación
            rol: 'preceptor',
            valoresOriginales: {}, // Nuevo estado para almacenar los valores originales
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

                case 'cursoSeleccionado':
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
            const response = await axios.get(`http://localhost:8080/api/usuario/getUsuarios/preceptor`, {
                withCredentials: true,
            });

            const profesores = response.data.map((profesor) => ({
                idUsuario: profesor.idUsuario,
                nombre: `${profesor.nombre} ${profesor.apellido} ${profesor.dni}`,
            }));

            this.setState({ profesores });
        } catch (error) {
            console.error('Error al cargar los preceptores:', error);
        }
    };

    // Manejar selección de preceptor en el Dropdown
    handleDropdownChange = async (value) => {
        try {
            const parsedValue = JSON.parse(value);
            this.setState(
                {
                    profesorSeleccionado: parsedValue.nombre,
                    idUsuario: parsedValue.idUsuario,
                },
                async () => {
                    try {
                        const response = await axios.get(
                            `http://localhost:8080/api/usuario/getUsuario/${this.state.idUsuario}`,
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
                    }
                }
            );
        } catch (error) {
            console.error("Error al procesar el preceptor seleccionado:", error);
        }
    };

    // Manejar envío del formulario
    handleSubmit = async (event) => {
        event.preventDefault();
    
        const { idUsuario, valoresOriginales, nombre, apellido, dni, mail, telefono, activo, cursoSeleccionado } = this.state;
    
        if (!idUsuario) {
            alert('Por favor selecciona un preceptor antes de guardar los cambios.');
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
        if (cursoSeleccionado) {
            datosModificados.cursoSeleccionado = cursoSeleccionado;
            console.log('CURSITO SELECCIONADO: '+datosModificados.cursoSeleccionado)
            const asignarPreceptor = {
                idUsuario: idUsuario,
                cursoId: cursoSeleccionado, // Suponiendo que `cursoSeleccionado` es el ID del curso
            };

            this.handleAsignarPreceptor(asignarPreceptor); // Llamar el método con los datos necesarios
        }
        
    
        // Incluir el curso seleccionado
        if (cursoSeleccionado) datosModificados.cursoSeleccionado = cursoSeleccionado;
    
        datosModificados.activo = activo;
    
        // Si no hay cambios, mostrar un mensaje y evitar el envío
        if (Object.keys(datosModificados).length === 0 && datosModificados.hasOwnProperty('activo') || Object.keys(datosModificados).length === 0 && datosModificados.hasOwnProperty('activo')) {
            alert('No hay cambios para guardar.');
            return;
        }
    
        console.log('Datos a enviar:', datosModificados);
    
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/usuario/modificarUsuario/${idUsuario}`,
                datosModificados,
                { withCredentials: true }
            );
    
            if (response.status === 200) {
                alert('Preceptor modificado exitosamente!');
                this.cargarProfesores();
                this.setState({
                    profesorSeleccionado: 'Seleccione un preceptor',
                    idUsuario: null,
                    nombre: '',
                    apellido: '',
                    dni: '',
                    mail: '',
                    telefono: '',
                    activo: 0,
                    cursoSeleccionado: '', // Limpiar curso seleccionado después de la modificación
                    valoresOriginales: {},
                });
            } else {
                alert('Error al modificar el preceptor');
            }
        } catch (error) {
            console.error('Error al modificar el preceptor:', error);
        }
    };
    

    handleAsignarPreceptor = (asignarPreceptor) => {
        console.log("datitos: " + JSON.stringify(asignarPreceptor))
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
                    alert("Preceptor dado de alta correctamente.");
                    window.location.reload();
                }
                return response.text();
            })
            .then((data) => console.log("Asignación exitosa:", data))
            .catch((error) => console.error("Error al asignar el preceptor:", error));
    }

    obtenerCursos = () => {
        fetch("http://localhost:8080/api/usuario/verCursoAdministrativo", {
          method: "GET",
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => this.setState({ cursosDisponibles: data }))
          .catch((error) =>
            console.error("Error al obtener los cursos:", error)
          );
      };

    componentDidMount() {
        this.cargarProfesores();
        this.obtenerCursos(); 
    }

    render() {
        const { profesores, profesorSeleccionado, nombre, apellido, dni, mail, telefono, activo, errores, cursosDisponibles, cursoSeleccionado } = this.state;

        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12">
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
                                            key={profesor.idUsuario}
                                            eventKey={JSON.stringify({
                                                idUsuario: profesor.idUsuario,
                                                nombre: profesor.nombre,
                                            })}
                                            style={{ color: 'black' }} // Estilo para texto negro
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
                                        <label htmlFor="cursoSeleccionado" className="form-label">Seleccionar Curso</label>
                                        <select
                                            id="cursoSeleccionado"
                                            className={`form-select ${errores.cursoSeleccionado ? "is-invalid" : ""}`}
                                            value={cursoSeleccionado}
                                            onChange={this.handleInputChange}
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
