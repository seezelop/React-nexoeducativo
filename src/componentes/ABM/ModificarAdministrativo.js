import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class ModificarAdministrativo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            administrativos: [],
            administrativoSeleccionado: 'Seleccione un administrativo',
            idAdministrativo: null,
            nombre: '',
            apellido: '',
            dni: '',
            mail: '',
            telefono: '',
            activo: false,
            errores: {}, // Almacena los errores de validación
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

    // Cargar la lista de administrativos
    cargarAdministrativos = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/usuario/getUsuarios/administrativo`, {
                withCredentials: true,
            });

            const administrativos = response.data.map((administrativo) => ({
                idAdministrativo: administrativo.idUsuario,
                nombre: `${administrativo.nombre} ${administrativo.apellido} ${administrativo.dni}`,
            }));

            this.setState({ administrativos });
        } catch (error) {
            console.error('Error al cargar los administrativos:', error);
        }
    };

    // Manejar selección de administrativo en el Dropdown
    handleDropdownChange = async (value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            administrativoSeleccionado: parsedValue.nombre,
            idAdministrativo: parsedValue.idAdministrativo,
        });

        try {
            const response = await axios.get(`http://localhost:8080/api/usuario/getUsuario/${parsedValue.idAdministrativo}`, {
                withCredentials: true,
            });

            const { nombre, apellido, dni, mail, telefono, activo } = response.data;
            this.setState({ nombre, apellido, dni, mail, telefono, activo });
        } catch (error) {
            console.error('Error al cargar los datos del administrativo:', error);
        }
    };

    // Manejar envío del formulario
    handleSubmit = async (event) => {
        event.preventDefault();

        const { idAdministrativo, nombre, apellido, dni, mail, telefono, activo } = this.state;

        try {
            const response = await axios.patch(
                `http://localhost:8080/api/usuario/modificarUsuario/${idAdministrativo}`,
                { nombre, apellido, dni, mail, telefono, activo },
                { withCredentials: true }
            );

            if (response.status === 200) {
                alert('Administrativo modificado exitosamente!');
                this.cargarAdministrativos();
                this.setState({
                    administrativoSeleccionado: 'Seleccione un administrativo',
                    idAdministrativo: null,
                    nombre: '',
                    apellido: '',
                    dni: '',
                    mail: '',
                    telefono: '',
                    activo: false,
                });
            } else {
                alert('Error al modificar el administrativo');
            }
        } catch (error) {
            console.error('Error al modificar el administrativo:', error);
        }
    };

    componentDidMount() {
        this.cargarAdministrativos();
    }

    render() {
        const { administrativos, administrativoSeleccionado, nombre, apellido, dni, mail, telefono, activo, errores } = this.state;

        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">Administrativo</label>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={administrativoSeleccionado}
                                    onSelect={this.handleDropdownChange}
                                    size="sm"
                                >
                                    {administrativos.map((administrativo) => (
                                        <Dropdown.Item
                                            key={administrativo.idAdministrativo}
                                            eventKey={JSON.stringify({
                                                idAdministrativo: administrativo.idAdministrativo,
                                                nombre: administrativo.nombre,
                                            })}
                                        >
                                            {administrativo.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            {administrativoSeleccionado !== 'Seleccione un administrativo' && (
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
                                                isInvalid={!!errores[id]}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errores[id]}
                                            </Form.Control.Feedback>
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

export default ModificarAdministrativo;
