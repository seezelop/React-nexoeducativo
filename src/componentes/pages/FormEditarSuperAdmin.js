import React, { Component } from 'react';

class FormEditarSuperAdmin extends Component {
    render() {
        return (
            <section className="d-flex flex-column">
                {/* Contenedor principal usando section */}
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-md-8 mb-5">
                        <div className="card shadow-sm"> {/* Aplicar el estilo de tarjeta */}
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        {/* Campo para el Nombre */}
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="nombre" className="form-label">Nombre:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nombre"
                                                placeholder="Ingresa tu nombre"
                                                required
                                            />
                                        </div>

                                        {/* Campo para el Apellido */}
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="apellido" className="form-label">Apellido:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="apellido"
                                                placeholder="Ingresa tu apellido"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Campo para el Email */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Ingresa tu email"
                                            required
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
