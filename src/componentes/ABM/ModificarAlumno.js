import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class ModificarAlumno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alumnos: [],
            alumnoSeleccionado: 'Seleccione un alumno',
            idAlumno: null,
            nombre: '',
            apellido: '',
            dni: '',
            mail: '',
            telefono: '',
            activo: false,
            errores: {}, // Almacena los errores de validación
            rol: 'alumno',
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

            default:
                break;
        }

        return error;
    };

    // Manejar cambios en los inputs y aplicar validaciones
    handleInputChange = (event) => {
        const { id, value } = event.target;
        const error = this.validarCampo(id, value);

        this.setState((prevState) => ({
            [id]: value,
            errores: { ...prevState.errores, [id]: error },
        }));
    };

    // Cargar la lista de alumnos
    cargarAlumnos = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/usuario/getUsuarios/${this.state.rol}`, {
                withCredentials: true,
            });

            console.log("INFO API" + response.data);

            const alumnos = response.data.map((alumno) => ({
                idAlumno: alumno.idAlumno,
                nombre: `${alumno.nombre} ${alumno.apellido} ${alumno.dni}`,
            }));

            this.setState({ alumnos });
        } catch (error) {
            console.error('Error al cargar los alumnos:', error);
        }
    };

    // Manejar selección de alumno en el Dropdown
    handleDropdownChange = async (value) => {
        this.setState({
            alumnoSeleccionado: value.nombre,
            idAlumno: value.idAlumno,
        });

        try {
            const response = await axios.get(`http://localhost:8080/api/usuario/getUsuario/${value.idAlumno}`, {
                withCredentials: true,
            });

            console.log("id que ingresa al endpoint:"+value.idAlumno)

            const { nombre, apellido, dni, mail, telefono, activo } = response.data;
            this.setState({
                nombre: nombre || '',
                apellido: apellido || '',
                dni: dni || '',
                mail: mail || '',
                telefono: telefono || '',
                activo: activo || false,
            });
        } catch (error) {
            console.error('Error al cargar los datos del alumno:', error);
        }
    };

    // Manejar envío del formulario
    handleSubmit = async (event) => {
        event.preventDefault();

        const { idAlumno, nombre, apellido, dni, mail, telefono, activo } = this.state;

        try {
            const response = await axios.patch(
                `http://localhost:8080/api/usuario/modificarUsuario/${idAlumno}`,
                { nombre, apellido, dni, mail, telefono, activo },
                { withCredentials: true }
            );

            if (response.status === 200) {
                alert('Alumno modificado exitosamente!');
                this.cargarAlumnos();
                this.setState({
                    alumnoSeleccionado: 'Seleccione un alumno',
                    idAlumno: null,
                    nombre: '',
                    apellido: '',
                    dni: '',
                    mail: '',
                    telefono: '',
                    activo: false,
                });
                window.location.reload(); // Refresca la página
            } else {
                alert('Error al modificar el alumno');
            }
        } catch (error) {
            console.error('Error al modificar el alumno:', error);
        }
    };

    componentDidMount() {
        this.cargarAlumnos();
    }

    render() {
        const { alumnos, alumnoSeleccionado, nombre, apellido, dni, mail, telefono, activo, errores } = this.state;

        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">Alumno</label>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={alumnoSeleccionado}
                                    onSelect={this.handleDropdownChange}
                                    size="sm"
                                >
                                    {alumnos.map((alumno) => (
                                        <Dropdown.Item
                                            key={alumno.idAlumno}
                                            eventKey={alumno} // Pasa el objeto alumno directamente
                                        >
                                            {alumno.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            {alumnoSeleccionado !== 'Seleccione un alumno' && (
                                <>
                                    {[{ id: "nombre", label: "Nombre", type: "text" },
                                    { id: "apellido", label: "Apellido", type: "text" },
                                    { id: "dni", label: "DNI", type: "number" },
                                    { id: "mail", label: "Email", type: "email" },
                                    { id: "telefono", label: "Teléfono", type: "number" }].map(({ id, label, type }) => (
                                        <div className="mb-3" key={id}>
                                            <label htmlFor={id} className="form-label">{label}</label>
                                            <Form.Control
                                                id={id}
                                                type={type}
                                                value={this.state[id]}
                                                onChange={this.handleInputChange}
                                                className={errores[id] ? "is-invalid" : ""}
                                                placeholder={`Ingresa ${label.toLowerCase()}`}
                                                required
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
