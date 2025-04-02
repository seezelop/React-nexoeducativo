import React, { Component } from "react";

class Contacto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            formData: {
                nombre: "",
                apellido: "",
                email: "",
                institucion: "",
                comentarios: "",
            },
            isLoading: false,
            errorMessage: "",
            successMessage: "",
        };
    }

    handleShowModal = (e) => {
        e.preventDefault(); // Evita que el formulario recargue la página
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    handleConfirm = () => {
        const { formData } = this.state;
        
        // Crear el objeto DTO exactamente como lo espera el backend
        const formContactoDTO = {
            // No necesitamos enviar fecha, se inicializa en el backend
            contenido: `Nombre: ${formData.nombre}
Apellido: ${formData.apellido}
Email: ${formData.email}
Institución: ${formData.institucion}
Comentarios: ${formData.comentarios}`
        };
        
        console.log("Enviando datos al backend:", formContactoDTO);

        this.setState({ 
            isLoading: true,
            errorMessage: "",
            successMessage: "" 
        });

        fetch("http://localhost:8080/formContacto", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formContactoDTO),
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Error del servidor: ${text}`);
                });
            }
            // Primero intentamos parsear como JSON
            return response.text().then(text => {
                try {
                    // Intentar parsear como JSON
                    return { isJson: true, data: JSON.parse(text) };
                } catch (e) {
                    // Si no es JSON, devolver el texto plano
                    return { isJson: false, data: text };
                }
            });
        })
        .then(result => {
            console.log("Respuesta del servidor:", result.data);
            
            // Limpiar el formulario y mostrar mensaje de éxito
            this.setState({
                showModal: false,
                isLoading: false,
                successMessage: result.isJson ? "Consulta enviada con éxito" : result.data,
                formData: { // Limpia el formulario después del envío
                    nombre: "",
                    apellido: "",
                    email: "",
                    institucion: "",
                    comentarios: "",
                },
            });
        })
        .catch(error => {
            console.error("Error:", error);
            this.setState({ 
                errorMessage: "Hubo un error al enviar la consulta: " + error.message,
                isLoading: false 
            });
        });
    };

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
        const { formData, showModal, isLoading, errorMessage, successMessage } = this.state;

        return (
            <section className="d-flex flex-column min-vh-100">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-md-8">
                    <h2 className="text-center mb-4 pt-4 text-white">Dejanos tu consulta</h2>

                        
                        {successMessage && (
                            <div className="alert alert-success mb-4" role="alert">
                                {successMessage}
                            </div>
                        )}
                        
                        {errorMessage && (
                            <div className="alert alert-danger mb-4" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        
                        <div className="card mb-4">
                            <div className="card-body">
                                <form onSubmit={this.handleShowModal}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="nombre" className="form-label">Nombre:</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="nombre" 
                                                required 
                                                value={formData.nombre} 
                                                onChange={this.handleInputChange} 
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="apellido" className="form-label">Apellido:</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="apellido" 
                                                required 
                                                value={formData.apellido} 
                                                onChange={this.handleInputChange} 
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="email" 
                                            required 
                                            value={formData.email} 
                                            onChange={this.handleInputChange} 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="institucion" className="form-label">Institución:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="institucion" 
                                            value={formData.institucion} 
                                            onChange={this.handleInputChange} 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="comentarios" className="form-label">Comentarios:</label>
                                        <textarea 
                                            className="form-control" 
                                            id="comentarios" 
                                            maxLength="150" 
                                            required 
                                            rows="3" 
                                            value={formData.comentarios} 
                                            onChange={this.handleInputChange}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Enviar</button>
                                </form>
                            </div>
                        </div>

                        {/* Modal de Confirmación usando Bootstrap */}
                        {showModal && (
                            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Confirmar envío</h5>
                                            <button type="button" className="btn-close" onClick={this.handleCloseModal}></button>
                                        </div>
                                        <div className="modal-body">
                                            <p>¿Estás seguro de enviar la consulta?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button 
                                                onClick={this.handleConfirm} 
                                                disabled={isLoading} 
                                                className="btn btn-success"
                                            >
                                                {isLoading ? "Enviando..." : "Confirmar"}
                                            </button>
                                            <button 
                                                onClick={this.handleCloseModal} 
                                                className="btn btn-danger"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Overlay oscuro cuando el modal está activo */}
                        {showModal && (
                            <div className="modal-backdrop fade show"></div>
                        )}
                    </section>
                </section>
            </section>
        );
    }
}

export default Contacto;