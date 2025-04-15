import React, { Component } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
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
            errores: {},
            activo: 1,
            idUsuario: null,
            loading: false,
            error: null,
            success: null
        };
    }

    componentDidMount() {
        this.obtenerIdUsuario();
    }
    

    obtenerIdUsuario = async () => {
        try {
            const response = await api.get(
                "/api/usuario/usuarioLogueado2",
                { withCredentials: true }
            );
            this.setState({ idUsuario: response.data });
            console.log('info: '+response.data)
            
        } catch (error) {
            console.error("Error al obtener ID del usuario:", error);
            this.setState({ 
                error: "Error al obtener datos del usuario" 
            });
        }
    };

    manejarCambio = (event) => {
        const { id, value } = event.target;
        const error = this.validarCampo(id, value);

        this.setState(prevState => ({
            [id]: value,
            errores: {
                ...prevState.errores,
                [id]: error,
            },
            error: null
        }));
    };

    validarCampo = (id, value) => {
        if (value.trim() === '') return '';

        const validaciones = {
            nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,30}$/,
            apellido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{4,30}$/,
            dni: /^\d{6,8}$/,
            mail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            telefono: /^\d{7,9}$/
        };

        const mensajes = {
            nombre: 'El nombre debe tener entre 3 y 30 letras',
            apellido: 'El apellido debe tener entre 4 y 30 letras',
            dni: 'El DNI debe tener entre 6 y 8 dígitos',
            mail: 'Formato de email inválido',
            telefono: 'El teléfono debe tener entre 7 y 9 dígitos'
        };

        return validaciones[id] && !validaciones[id].test(value) 
            ? mensajes[id] 
            : '';
    };

    manejarEnvio = async (event) => {
        event.preventDefault();
        const { nombre, apellido, dni, mail, clave, telefono, activo, idUsuario } = this.state;

        if (!idUsuario) {
            this.setState({ error: "No se pudo identificar al usuario" });
            return;
        }

        // Validar que al menos un campo tenga datos
        if (!nombre && !apellido && !dni && !mail && !telefono && !clave) {
            this.setState({ error: "Debe completar al menos un campo" });
            return;
        }

        // Verificar errores de validación
        if (Object.values(this.state.errores).some(error => error)) {
            this.setState({ error: "Corrija los errores antes de enviar" });
            return;
        }

        try {
            this.setState({ loading: true, error: null, success: null });

            const usuarioModificado = {};
            if (nombre) usuarioModificado.nombre = nombre.trim();
            if (apellido) usuarioModificado.apellido = apellido.trim();
            if (dni) usuarioModificado.dni = dni.trim();
            if (mail) usuarioModificado.mail = mail.trim();
            if (telefono) usuarioModificado.telefono = telefono.trim();
            if (clave) usuarioModificado.clave = clave;
            usuarioModificado.activo = activo;

            const respuesta = await axios.patch(
                `http://localhost:8080/api/usuario/modificarUsuario/${idUsuario}`,
                usuarioModificado,
                { withCredentials: true }
            );

            if (respuesta.status === 200) {
                this.setState({ 
                    success: "Usuario modificado con éxito",
                    clave: '' // Limpiar contraseña después de enviar
                });
            }
        } catch (error) {
            console.error("Error al modificar usuario:", error);
            
            let errorMessage = "Error al modificar el usuario";
            if (error.response) {
                if (error.response.status === 400) {
                    errorMessage = error.response.data.message || "El Dni y/o email que desea agregar ya se encuentra en el sistema";
                } else if (error.response.status === 401) {
                    errorMessage = "No autorizado. Por favor inicie sesión.";
                }
            }
            
            this.setState({ error: errorMessage });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const { 
            nombre, 
            apellido, 
            dni, 
            mail, 
            clave, 
            telefono, 
            errores,
            loading,
            error,
            success
        } = this.state;

        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-mb-5">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                {/* Mensajes de feedback */}
                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}
                                
                                {success && (
                                    <div className="alert alert-success">
                                        {success}
                                    </div>
                                )}

                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                                            id="nombre"
                                            placeholder="Ingresa tu nombre"
                                            value={nombre}
                                            onChange={this.manejarCambio}
                                        />
                                        {errores.nombre && (
                                            <div className="invalid-feedback">{errores.nombre}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="apellido" className="form-label">Apellido:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
                                            id="apellido"
                                            placeholder="Ingresa tu apellido"
                                            value={apellido}
                                            onChange={this.manejarCambio}
                                        />
                                        {errores.apellido && (
                                            <div className="invalid-feedback">{errores.apellido}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="dni" className="form-label">DNI:</label>
                                        <input
                                            type="number"
                                            className={`form-control ${errores.dni ? 'is-invalid' : ''}`}
                                            id="dni"
                                            placeholder="Ingresa tu DNI"
                                            value={dni}
                                            onChange={this.manejarCambio}
                                        />
                                        {errores.dni && (
                                            <div className="invalid-feedback">{errores.dni}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="clave" className="form-label">Clave:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="clave"
                                            placeholder="Ingresa tu clave"
                                            value={clave}
                                            onChange={this.manejarCambio}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="telefono" className="form-label">Teléfono:</label>
                                        <input
                                            type="number"
                                            className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                                            id="telefono"
                                            placeholder="Ingresa tu teléfono"
                                            value={telefono}
                                            onChange={this.manejarCambio}
                                        />
                                        {errores.telefono && (
                                            <div className="invalid-feedback">{errores.telefono}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="mail" className="form-label">Email:</label>
                                        <input
                                            type="email"
                                            className={`form-control ${errores.mail ? 'is-invalid' : ''}`}
                                            id="mail"
                                            placeholder="Ingresa tu email"
                                            value={mail}
                                            onChange={this.manejarCambio}
                                        />
                                        {errores.mail && (
                                            <div className="invalid-feedback">{errores.mail}</div>
                                        )}
                                    </div>

                                    <div className="d-grid gap-2 mb-4">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary btn-lg" 
                                            onClick={this.manejarEnvio}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Procesando...
                                                </>
                                            ) : 'Editar'}
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