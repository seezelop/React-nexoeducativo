import React, { Component } from 'react';

class Contacto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false, // Estado para controlar la visibilidad del primer modal
            showConfirmationModal: false, // Estado para controlar la visibilidad del segundo modal
            formData: {}, // Para almacenar los datos del formulario
        };
    }

    // Método para mostrar el primer modal
    handleShowModal = (e) => {
        e.preventDefault(); // Evita el envío del formulario
        this.setState({ showModal: true }); // Muestra el modal
    };

    // Método para cerrar el primer modal
    handleCloseModal = () => {
        this.setState({ showModal: false }); // Cierra el modal
    };

    // Método para manejar la confirmación del envío
    handleConfirm = () => {
        // Aquí puedes manejar el envío del formulario
        console.log("Formulario enviado con los datos:", this.state.formData);
        
        this.setState({ 
            showModal: false, // Cierra el primer modal
            showConfirmationModal: true // Muestra el segundo modal
        }); 
    };

    // Método para cerrar el segundo modal
    handleCloseConfirmationModal = () => {
        this.setState({ showConfirmationModal: false }); // Cierra el segundo modal
    };

    // Maneja el cambio en los campos del formulario
    handleInputChange = (e) => {
        const { id, value } = e.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [id]: value,
            },
        }));
    };

    render() {
        return (
            <section className="d-flex flex-column min-vh-100"> {/* Contenedor principal usando section */}
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-md-8"> {/* Ajustamos a 8 columnas para mejor visibilidad */}
                        <h2 className="text-center mb-4 pt-4">Dejanos tu consulta</h2>
                        <div className="card mb-4"> {/* Tarjeta envolvente con margen inferior */}
                            <div className="card-body">
                                <form onSubmit={this.handleShowModal}>
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
                                                onChange={this.handleInputChange} // Maneja el cambio
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
                                                onChange={this.handleInputChange} // Maneja el cambio
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
                                            onChange={this.handleInputChange} // Maneja el cambio
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
                                            onChange={this.handleInputChange} // Maneja el cambio
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
                                            onChange={this.handleInputChange} // Maneja el cambio
                                        ></textarea>
                                    </div>
                                   
                                    <div className="d-grid gap-2 mb-4"> 
                                        <button type="submit" className="btn btn-primary btn-lg">Enviar</button>
                                    </div>
                                </form>
                            </div>
                        </div> 
                    </section>
                </section>

                {/* Primer Modal para Confirmar Envío */}
                {this.state.showModal && (
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirmar Envío</h5>
                                    <button type="button" className="close" onClick={this.handleCloseModal} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>¿Estás seguro de que deseas enviar la consulta?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={this.handleCloseModal}>Cancelar</button>
                                    <button type="button" className="btn btn-primary" onClick={this.handleConfirm}>Confirmar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Segundo Modal de Confirmación de Envío */}
                {this.state.showConfirmationModal && (
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Consulta Enviada</h5>
                                    <button type="button" className="close" onClick={this.handleCloseConfirmationModal} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Tu consulta ha sido enviada exitosamente. ¡Gracias por contactarnos!</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={this.handleCloseConfirmationModal}>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        );
    }
}

export default Contacto;
