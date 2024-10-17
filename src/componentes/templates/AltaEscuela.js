import React, { Component } from 'react';
/*import 'index.css'  ARREGLAR ESTO*/

class FormEditarSuperAdmin extends Component {
    render() {
        return (
            <section className="d-flex flex-column">

                {/* Contenedor principal usando section */}
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-md-8"> {/* Ajustamos a 8 columnas para mejor visibilidad */}
                        {/*<h2 className="text-center mb-4">Dejanos tu consulta</h2>*/}
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
                                    <label htmlFor="direccion" className="form-label">Direccion:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="direccion"
                                        placeholder="Ingresa tu direccion"
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
                            {/*Campo desplegable para los tipos de Plan*/}
                            <div class="btn-group">
                                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Seleccione un Plan
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                            {/*Campo desplegable el jefe colegio*/}
                            <div class="btn-group">
                                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Seleccione un Jefe Colegio
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                            <div className="d-grid gap-2 mb-4">
                                <button type="submit" className="btn btn-primary btn-lg">Confirmar</button>
                            </div>
                        </form>
                    </section>
                </section>
            </section>
        );
    }


export default AltaEscuela;