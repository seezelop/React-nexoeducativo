import React, { Component } from 'react';

class FormEditarSuperAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            dni: '',
            mail: '',
            telefono: '',
            errores: {}, // Almacena los errores de validación
        };
    }
    render() {
        return (
            <section className="d-flex flex-column">
                {/* Contenedor principal usando section */}
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-md-8 mb-5">
                        <div className="card shadow-sm"> {/* Aplicar el estilo de tarjeta */}
                            <div className="card-body">
                                <form>
                                    <div className="column">
                                        {/* Campo para el Nombre */}
                                        <div className="mb-3">
                                            <label htmlFor="nombre" className="form-label">Nombre:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nombre"
                                                placeholder="Ingresa tu nombre"
                                                //required
                                            />
                                        </div>
                                    </div>
                                    {/* Campo para el Apellido */}
                                    <div className="mb-3">
                                            <label htmlFor="apellido" className="form-label">Apellido:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="apellido"
                                                placeholder="Ingresa tu apellido"
                                                //required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="dni" className="form-label">Dni:</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="dni"
                                                placeholder="Ingresa tu dni"
                                               // required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="clave" className="form-label">Clave:</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="clave"
                                                placeholder="Ingresa tu clave"
                                               // required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="telefono" className="form-label">Telefono:</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="telefono"
                                                placeholder="Ingresa tu telefono"
                                               // required
                                            />
                                        </div>

                                    {/* Campo para el Email */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Ingresa tu email"
                                            //required
                                        />
                                    </div>

                                    <div className="d-grid gap-2 mb-4">
                                        <button type="submit" className="btn btn-primary btn-lg">Editar</button>
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
