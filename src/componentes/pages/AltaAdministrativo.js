import React, { Component } from 'react';

class AltaAdministrativo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            dni: '',
            mail: '',
            clave: '',
            telefono: '',
            activo: 1,
            rol: 3, // Por defecto, se da de alta como administrativo
            showModal: false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/usuario/saveUsuario', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(response => {
            console.log('lo que se envia: ', response);
            if (response.ok) {
                this.setState({ showModal: true });
                alert("Administrativo creado correctamente");
            }
            return response.text();
        })
        .then(data => console.log('Administrativo creado:', data))
        .catch(error => console.error('Error al crear administrativo:', error));
    };

    handleChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };

    closeModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        const {
            nombre = "Nombre:",
            apellido = "Apellido:",
            dni = "DNI:",
            mail = "Email:",
            clave = "Clave:",
            telefono = "Teléfono:",
            buttonText = "Crear Administrativo"
        } = this.props;

        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">{nombre}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        value={this.state.nombre}
                                        onChange={this.handleChange}
                                        placeholder="Ingresa el nombre"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col mb-3">
                                    <label htmlFor="apellido" className="form-label">{apellido}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="apellido"
                                        value={this.state.apellido}
                                        onChange={this.handleChange}
                                        placeholder="Ingresa el apellido"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <label htmlFor="dni" className="form-label">{dni}</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="dni"
                                        value={this.state.dni}
                                        onChange={this.handleChange}
                                        placeholder="Ingresa el DNI"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <label htmlFor="mail" className="form-label">{mail}</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="mail"
                                        value={this.state.mail}
                                        onChange={this.handleChange}
                                        placeholder="Ingresa el email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <label htmlFor="clave" className="form-label">{clave}</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="clave"
                                        value={this.state.clave}
                                        onChange={this.handleChange}
                                        placeholder="Ingresa la clave"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <label htmlFor="telefono" className="form-label">{telefono}</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="telefono"
                                        value={this.state.telefono}
                                        onChange={this.handleChange}
                                        placeholder="Ingresa el teléfono"
                                        required
                                    />
                                </div>
                            </div>

                            {this.state.showModal && (
                                <div className="modal show d-block" tabIndex="-1" role="dialog">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Nexo Educativo</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Administrativo creado exitosamente</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

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

export default AltaAdministrativo;
