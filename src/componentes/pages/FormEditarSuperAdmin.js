import React, { Component } from 'react';
import axios from 'axios';

class FormEditarSuperAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            dni: '',
            mail: '',
            clave: '',
            telefono: '',
            errores: {}, // Almacena los errores de validación
        };
    }

    manejarCambio = (event) => {
        const { id, value } = event.target;

        // Validar el campo antes de actualizar el estado
        const error = this.validarCampo(id, value);

        this.setState((prevState) => ({
            [id]: value, // Actualiza el estado dinámicamente
            errores: {
                ...prevState.errores,
                [id]: error, // Guarda el mensaje de error si existe
            },
        }));
    };

    validarCampo = (id, value) => {
        if (value.trim() === '') {
            return ''; // No mostrar error si el campo está vacío
        }

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

    manejarEnvio = async (event) => {
        event.preventDefault();
    
        const { nombre, apellido, dni, mail, clave, telefono } = this.state;
        
        // Create object without empty fields
        const usuarioModificado = {};
        
        if (nombre) usuarioModificado.nombre = nombre;
        if (apellido) usuarioModificado.apellido = apellido;
        if (dni) usuarioModificado.dni = dni;
        if (mail) usuarioModificado.mail = mail;
        if (telefono) usuarioModificado.telefono = telefono;
        
        // Only include password if it was entered
        if (clave && clave.trim() !== '') {
            usuarioModificado.clave = clave;
        }
    
        try {
            const responseId = await axios.get("http://localhost:8080/api/usuario/usuarioLogueado", {
                withCredentials: true,
            });
    
            if (!responseId.status === 200) {
                throw new Error("No se pudo obtener el ID del usuario");
            }
    
            const idUsuario = responseId.data;
            console.log("ID del usuario logueado:", idUsuario);
    
            console.log('Datos enviados:', usuarioModificado);
    
            const respuesta = await axios.patch(
                `http://localhost:8080/api/usuario/modificarUsuario/${idUsuario}`,
                usuarioModificado,
                { withCredentials: true }
            );
    
            if (respuesta.status === 200) {
                alert("Usuario modificado con éxito.");
            } else {
                alert("Error al modificar el usuario.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error en la conexión con el servidor.");
        }
    };
    render() {
        return (
            <section className="d-flex flex-column">
                {/* Contenedor principal usando section */}
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-mb-5">
                        <div className="card shadow-lg">
                            {/* Aplicar estilo ancho personalizado */}
                            <div className="card-body">
                                <form>
                                    {/* Campo para el Nombre */}
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre"
                                            placeholder="Ingresa tu nombre"
                                            value={this.state.nombre}
                                            onChange={this.manejarCambio}
                                        />
                                        {this.state.errores.nombre && (
                                            <small className="text-danger">{this.state.errores.nombre}</small>
                                        )}
                                    </div>

                                    {/* Campo para el Apellido */}
                                    <div className="mb-3">
                                        <label htmlFor="apellido" className="form-label">Apellido:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="apellido"
                                            placeholder="Ingresa tu apellido"
                                            value={this.state.apellido}
                                            onChange={this.manejarCambio}
                                        />
                                        {this.state.errores.apellido && (
                                            <small className="text-danger">{this.state.errores.apellido}</small>
                                        )}
                                    </div>

                                    {/* Campo para el DNI */}
                                    <div className="mb-3">
                                        <label htmlFor="dni" className="form-label">DNI:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="dni"
                                            placeholder="Ingresa tu DNI"
                                            value={this.state.dni}
                                            onChange={this.manejarCambio}
                                        />
                                        {this.state.errores.dni && (
                                            <small className="text-danger">{this.state.errores.dni}</small>
                                        )}
                                    </div>

                                    {/* Campo para la Clave */}
                                    <div className="mb-3">
                                        <label htmlFor="clave" className="form-label">Clave:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="clave"
                                            placeholder="Ingresa tu clave"
                                            value={this.state.clave}
                                            onChange={this.manejarCambio}
                                        />
                                    </div>

                                    {/* Campo para el Teléfono */}
                                    <div className="mb-3">
                                        <label htmlFor="telefono" className="form-label">Teléfono:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="telefono"
                                            placeholder="Ingresa tu teléfono"
                                            value={this.state.telefono}
                                            onChange={this.manejarCambio}
                                        />
                                        {this.state.errores.telefono && (
                                            <small className="text-danger">{this.state.errores.telefono}</small>
                                        )}
                                    </div>

                                    {/* Campo para el Email */}
                                    <div className="mb-3">
                                        <label htmlFor="mail" className="form-label">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="mail"
                                            placeholder="Ingresa tu email"
                                            value={this.state.mail}
                                            onChange={this.manejarCambio}
                                        />
                                        {this.state.errores.mail && (
                                            <small className="text-danger">{this.state.errores.mail}</small>
                                        )}
                                    </div>

                                    {/* Botón de envío */}
                                    <div className="d-grid gap-2 mb-4">
                                        <button type="submit" className="btn btn-primary btn-lg" onClick={this.manejarEnvio}>
                                            Editar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </section>
            </section>
        );
    }
}

export default FormEditarSuperAdmin;
