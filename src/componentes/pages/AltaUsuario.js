import React, { Component } from 'react';
class AltaUsuario extends Component {
    render() {
        //valores por defecto
        const {
            nombre = "Nombre:",
            apellido = "Apellido:",
            dni = "Dni:",
            buttonText = "Confirmar"
        } = this.props;

        return (
            <section className="d-flex flex-column">
                {/* Contenedor principal usando section */}
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12"> {/* Ajustamos a 12 columnas para mejor visibilidad */}
                        <form>
                            <div className="row">
                                {/* Campo para el Nombre */}
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">{nombre}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        placeholder="Ingresa tu nombre"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Campo para la Dirección */}
                            <div className="row">
                                <div className="col mb-3">
                                    <label htmlFor="apellido" className="form-label">{apellido}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="apellido"
                                        placeholder="Ingresa tu dirección"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Campo para el dni */}
                            <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <label htmlFor="dni" className="form-label">{dni}</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="dni"
                                        placeholder="Ingresa tu dni"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="d-grid gap-2 mb-4">
                                <button type="submit" className="btn btn-primary btn-lg">{buttonText}</button>
                            </div>
                        </form>
                    </section>
                </section>
            </section>
        );
    }
}
export default AltaUsuario;