import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class ModificarJefeColegio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jefesColegio: [], // Lista de jefes del colegio
            jefeSeleccionado: 'Seleccione un jefe',
            idJefeColegio: null,
            nombre: '',
            apellido: '',
            dni: '',
            mail: '',
            telefono: '',
            activo: false,
            errores: {}, // Errores de validación
        };
    }

    // Validar campo individual
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

    // Manejar cambios en los inputs y validar
    handleInputChange = (event) => {
        const { id, value } = event.target;
        const error = this.validarCampo(id, value);

        this.setState((prevState) => ({
            [id]: value,
            errores: { ...prevState.errores, [id]: error },
        }));
    };

    // Cargar la lista de jefes del colegio
    cargarJefes = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/usuario/modificarUsuario/2`, // Endpoint correcto para id_rol=2
                { withCredentials: true }
            );

            console.log('Respuesta del servidor:', response.data);

            const jefesColegio = Array.isArray(response.data)
                ? response.data.map((jefe) => ({
                      idJefeColegio: jefe.idJefeColegio,
                      nombre: `${jefe.nombre} ${jefe.apellido} ${jefe.dni}`,
                  }))
                : [];

            this.setState({ jefesColegio });
        } catch (error) {
            console.error('Error al cargar los jefes:', error);
            alert('Ocurrió un error al cargar los datos de los jefes.');
        }
    };

    // Manejar selección de jefe en el Dropdown
    handleDropdownChange = async (value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            jefeSeleccionado: parsedValue.nombre,
            idJefeColegio: parsedValue.idJefeColegio,
        });

        try {
            const response = await axios.get(
                `http://localhost:8080/api/usuario/getUsuariosSuperAdmin/${parsedValue.idJefeColegio}`,
                { withCredentials: true }
            );

            console.log('Datos del jefe seleccionado:', response.data);

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
            console.error('Error al cargar los datos del jefe:', error);
        }
    };

    // Manejar envío del formulario
    handleSubmit = async (event) => {
        event.preventDefault();

        const { idJefeColegio, nombre, apellido, dni, mail, telefono, activo } = this.state;

        try {
            const response = await axios.patch(
                `http://localhost:8080/api/usuario/modificarUsuario/${idJefeColegio}`,
                { nombre, apellido, dni, mail, telefono, activo },
                { withCredentials: true }
            );

            if (response.status === 200) {
                alert('Jefe modificado exitosamente!');
                this.cargarJefes();
                this.setState({
                    jefeSeleccionado: 'Seleccione un jefe',
                    idJefeColegio: null,
                    nombre: '',
                    apellido: '',
                    dni: '',
                    mail: '',
                    telefono: '',
                    activo: false,
                });
            } else {
                alert('Error al modificar el jefe');
            }
        } catch (error) {
            console.error('Error al modificar el jefe:', error);
        }
    };

    componentDidMount() {
        this.cargarJefes();
    }

    render() {
        const { jefesColegio, jefeSeleccionado, nombre, apellido, dni, mail, telefono, activo, errores } = this.state;

        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">Jefe Colegio</label>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={jefeSeleccionado}
                                    onSelect={this.handleDropdownChange}
                                    size="sm"
                                >
                                    {jefesColegio.map((jefe) => (
                                        <Dropdown.Item
                                            key={jefe.idJefeColegio}
                                            eventKey={JSON.stringify({
                                                idJefeColegio: jefe.idJefeColegio,
                                                nombre: jefe.nombre,
                                            })}
                                        >
                                            {jefe.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            {jefeSeleccionado !== 'Seleccione un jefe' && (
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
                                            {errores[id] && <div style={{ color: "red" }}>{errores[id]}</div>}
                                        </div>
                                    ))}

                                    <div className="mb-3">
                                        <label htmlFor="activo" className="form-label">Activo:</label>
                                        <Form.Check
                                            id="activo"
                                            type="checkbox"
                                            checked={activo}
                                            onChange={(e) =>
                                                this.setState({ activo: e.target.checked })
                                            }
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

export default ModificarJefeColegio;
