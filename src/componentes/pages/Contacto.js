import React, { Component } from 'react';

class Contacto extends Component {
    render() {
        return (
            <section className="d-flex flex-column min-vh-100"> {/* Contenedor principal usando section */}
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-md-6">
                        <h2 className="text-center mb-4">Contacto</h2>
                        <form>
                            <section className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="Ingresa tu mail"
                                />
                            </section>
                            <section className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Comentarios</label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    placeholder="Escribe tus comentarios aquí..."
                                ></textarea>
                            </section>
                            <button type="submit" className="btn btn-primary w-100 mb-3">Enviar</button> {/* Botón de enviar */}
                        </form>
                    </section>
                </section>
            </section>
        );
    }
}

export default Contacto;
