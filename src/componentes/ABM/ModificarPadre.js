import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class ModificarPadre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profesores: [],
            profesorSeleccionado: 'Seleccione un padre',
            idUsuario: null,
            nombre: '',
            apellido: '',
            dni: '',
            mail: '',
            telefono: '',
            activo: 0,
            errores: {}, // Almacena los errores de validación
            rol: 'padre',
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

            default:
                break;
        }

        return error;
    };

    // Manejar cambios en los inputs y aplicar validaciones
    handleInputChange = (event) => {
        const { id, type, checked } = event.target;

        // Determinar el valor adecuado según el tipo de input
        const valor = type === 'checkbox' ? (checked ? 1 : 0) : event.target.value;

        //console.log(`Campo ${id} cambiado a:`, valor, `Tipo: ${type}`);

        // Validar el campo
        const error = this.validarCampo(id, valor);

        // Actualizar el estado
        this.setState({
            [id]: valor,
            errores: { ...this.state.errores, [id]: error }
        }, () => {
            // Callback para verificar que el estado se actualizó correctamente
            //console.log(`Estado actualizado: ${id} =`, this.state[id]);
        });
    };


    // Cargar la lista de profesores
    cargarProfesores = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/usuario/getUsuarios/padre`, {
                withCredentials: true,
            });

            //console.log("respuesta api: "+JSON.stringify(response.data))
            const profesores = response.data.map((profesor) => ({
                idUsuario: profesor.idUsuario,
                nombre: `${profesor.nombre} ${profesor.apellido} ${profesor.dni}`,
            }));

            this.setState({ profesores });
        } catch (error) {
            console.error('Error al cargar los padres:', error);
        }
    };

    // Manejar selección de profesor en el Dropdown
    handleDropdownChange = async (value) => {
        try {
            const parsedValue = JSON.parse(value);
            this.setState(
                {
                    profesorSeleccionado: parsedValue.nombre,
                    idUsuario: parsedValue.idUsuario, // Corregido: asegurar que se use idProfesor
                },
                async () => {
                    console.log("Estado actualizado:", {
                        profesorSeleccionado: this.state.profesorSeleccionado,
                        idUsuario: this.state.idUsuario, // Ahora sí tendrá el valor actualizado
                    });

                    try {
                        const response = await axios.get(
                            `http://localhost:8080/api/usuario/getUsuario/${this.state.idUsuario}`,
                            { withCredentials: true }
                        );

                        //console.log("Datos obtenidos del profesor:", response.data);

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
                        console.error("Error al cargar los datos del padre:", error);
                    }
                }
            );
        } catch (error) {
            console.error("Error al procesar el padre seleccionado:", error);
        }
    };


    // Manejar envío del formulario
    handleSubmit = async (event) => {
        event.preventDefault();

        const { idUsuario, valoresOriginales, nombre, apellido, dni, mail, telefono, activo } = this.state;

        if (!idUsuario) {
            alert('Por favor selecciona un padre antes de guardar los cambios.');
            return;
        }

        // Construir un objeto con solo los campos modificados
        const datosModificados = {};
        if (nombre !== valoresOriginales.nombre) datosModificados.nombre = nombre;
        if (apellido !== valoresOriginales.apellido) datosModificados.apellido = apellido;
        if (dni !== valoresOriginales.dni) datosModificados.dni = dni;
        if (mail !== valoresOriginales.mail) datosModificados.mail = mail;
        if (telefono !== valoresOriginales.telefono) datosModificados.telefono = telefono;
        if (Number(activo) !== Number(valoresOriginales.activo)) {
            datosModificados.activo = parseInt(activo, 10); // Asegúrate de que sea un número
        }

        //console.log('Datos a enviar:', datosModificados);

        try {
            const response = await axios.patch(
                `http://localhost:8080/api/usuario/modificarUsuario/${idUsuario}`,
                datosModificados,
                { withCredentials: true }
            );

            if (response.status === 200) {
                alert('Padre modificado exitosamente!');
                this.cargarProfesores();
                this.setState({
                    profesorSeleccionado: 'Seleccione un profesor',
                    idUsuario: null,
                    nombre: '',
                    apellido: '',
                    dni: '',
                    mail: '',
                    telefono: '',
                    activo: 0,
                    valoresOriginales: {}
                });
                window.location.reload();
            } else {
                alert('Error al modificar el padre');
            }
        } catch (error) {
            console.error('Error al modificar el padre:', error);
            console.log('Estado actual activo:', this.state.activo);
        }
    };

    componentDidMount() {
        this.cargarProfesores();

    }

    render() {
        const { profesores, profesorSeleccionado, nombre, apellido, dni, mail, telefono, activo, errores } = this.state;

        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">Padre</label>
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

                            {profesorSeleccionado !== 'Seleccione un padre' && (
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
                                            checked={Number(this.state.activo) === 1}
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

export default ModificarPadre;
