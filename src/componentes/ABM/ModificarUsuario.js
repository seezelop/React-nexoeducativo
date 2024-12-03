import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class ModificarUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            usuarioSeleccionado: 'Seleccione un usuario',
            idUsuario: null,
            nombre: '',
            apellido: '',
            dni: '',
            mail: '',
            telefono: '',
            activo: false,
        };
    }

    // Cargar la lista de usuarios
    cargarUsuarios = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/usuario/getUsuarios/jefe%20colegio`, {
                withCredentials: true,
            });

            const usuarios = response.data.map((usuario) => ({
                idUsuario: usuario.idUsuario,
                nombre: `${usuario.nombre} ${usuario.apellido} ${usuario.dni}`,
            }));

            this.setState({ usuarios });
        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
        }
    };

    // Manejar selección de usuario en el Dropdown
    handleDropdownChange = async (value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            usuarioSeleccionado: parsedValue.nombre,
            idUsuario: parsedValue.idUsuario,
        });

        try {
            const response = await axios.get(`http://localhost:8080/api/usuario/getUsuario/${parsedValue.idUsuario}`, {
                withCredentials: true,
            });

            const { nombre, apellido, dni, mail, telefono, activo } = response.data;
            this.setState({ nombre, apellido, dni, mail, telefono, activo });
        } catch (error) {
            console.error('Error al cargar los datos del usuario:', error);
        }
    };

    // Manejar cambios en los campos del formulario
    handleInputChange = (event) => {
        const { id, value, type, checked } = event.target;
        this.setState({ [id]: type === 'checkbox' ? checked : value });
    };

    // Manejar envío del formulario
    handleSubmit = async (event) => {
        event.preventDefault();

        const { idUsuario, nombre, apellido, dni, mail, telefono, activo } = this.state;

        try {
            const response = await axios.patch(
                `http://localhost:8080/api/usuario/modificarUsuario/${idUsuario}`,
                { nombre, apellido, dni, mail, telefono, activo },
                { withCredentials: true }
            );

            if (response.status === 200) {
                alert('Usuario modificado exitosamente!');
                this.cargarUsuarios();
                this.setState({
                    usuarioSeleccionado: 'Seleccione un usuario',
                    idUsuario: null,
                    nombre: '',
                    apellido: '',
                    dni: '',
                    mail: '',
                    telefono: '',
                    activo: false,
                });
            } else {
                alert('Error al modificar el usuario');
            }
        } catch (error) {
            console.error('Error al modificar el usuario:', error);
        }
    };

    componentDidMount() {
        this.cargarUsuarios();
    }

    render() {
        const { usuarios, usuarioSeleccionado, nombre, apellido, dni, mail, telefono, activo } = this.state;

        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">Usuario</label>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={usuarioSeleccionado}
                                    onSelect={this.handleDropdownChange}
                                    size="sm"
                                >
                                    {usuarios.map((usuario) => (
                                        <Dropdown.Item
                                            key={usuario.idUsuario}
                                            eventKey={JSON.stringify({
                                                idUsuario: usuario.idUsuario,
                                                nombre: usuario.nombre,
                                            })}
                                        >
                                            {usuario.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            {usuarioSeleccionado !== 'Seleccione un usuario' && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre:</label>
                                        <Form.Control
                                            id="nombre"
                                            type="text"
                                            value={nombre}
                                            onChange={this.handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="apellido" className="form-label">Apellido:</label>
                                        <Form.Control
                                            id="apellido"
                                            type="text"
                                            value={apellido}
                                            onChange={this.handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="dni" className="form-label">DNI:</label>
                                        <Form.Control
                                            id="dni"
                                            type="text"
                                            value={dni}
                                            onChange={this.handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <Form.Control
                                            id="mail"
                                            type="email"
                                            value={mail}
                                            onChange={this.handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="telefono" className="form-label">Teléfono:</label>
                                        <Form.Control
                                            id="telefono"
                                            type="text"
                                            value={telefono}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
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

export default ModificarUsuario;
