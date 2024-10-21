import React, { Component } from 'react';

class Contacto extends Component {
    render() {
        return (
            <section className="d-flex flex-column min-vh-100"> {/* Contenedor principal usando section */}
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-md-8"> {/* Ajustamos a 8 columnas para mejor visibilidad */}
                        <h2 className="text-center mb-4">Déjanos tu consulta</h2>
                        <div className="card mb-4"> {/* Tarjeta envolvente con margen inferior */}
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

                                    {/* Campo para la Institución */}
                                    <div className="mb-3">
                                        <label htmlFor="institucion" className="form-label">Institución:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="institucion"
                                            placeholder="Ingresa el nombre de tu institución"
                                        />
                                    </div>

                                    {/* Campo para Comentarios */}
                                    <div className="mb-3">
                                        <label htmlFor="comentarios" className="form-label">Comentarios:</label>
                                        <textarea
                                            className="form-control"
                                            id="comentarios"
                                            rows="5"
                                            placeholder="Escribe tus comentarios aquí..."
                                            required
                                        ></textarea>
                                    </div>
                                   
                                    <div className="d-grid gap-2 mb-4"> 
                                        <button type="submit" className="btn btn-primary btn-lg">Enviar</button>
                                    </div>
                                </form>
                            </div>
                        </div> {/* Fin de la tarjeta */}
                    </section>
                </section>

       
            </section>
        );
    }
}

export default Contacto;
