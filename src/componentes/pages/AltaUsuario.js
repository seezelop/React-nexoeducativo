import React, { Component, useState } from 'react';

class AltaUsuario extends Component {
    //se setean las propiedades que van a ser enviadas
constructor(props) {
    super(props);
    this.state = {
        nombre: '',
        apellido: '',
        dni:'',
        mail:'',
        clave:'',
        telefono:'',
        activo: 1,
        rol:2,//por defecto, se da de alta un jefe colegio sino especificar como parametro
        showModal:false
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
            // Mostrar el alert de confirmación
            alert("Jefe Colegio creado correctamente");
        }
        return response.text();
    })
    .then(data => console.log('User created:', data))
    .catch(error => console.error('Error creating user:', error));
};


  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  //boton para cerrar el modal
  closeModal = () => {
    this.setState({ showModal: false });
};

     
    render() {
        //valores por defecto
        const {
            nombre = "Nombre:",
            apellido = "Apellido:",
            dni = "Dni:",
            mail = "Email:",
            clave = "Clave:",
            telefono = "Telefono:",
            buttonText = "Confirmar"
        } = this.props;

        return (
            <section className="d-flex flex-column">
                {/* Contenedor principal usando section */}
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12"> {/* Ajustamos a 12 columnas para mejor visibilidad */}
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                {/* Campo para el Nombre */}
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">{nombre}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        value={this.state.nombre}
                                        onChange={this.handleChange}
                                        placeholder="Ingresa tu nombre"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Campo para el apellido */}
                            <div className="row">
                                <div className="col mb-3">
                                    <label htmlFor="apellido" className="form-label">{apellido}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="apellido"
                                        value={this.state.apellido}
                                        onChange={this.handleChange}
                                        placeholder="Ingresa tu apellido"
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
                                        value={this.state.dni}
                                        onChange={this.handleChange}
                                        placeholder="Ingresa tu dni"
                                        required
                                    />
                                </div>
                            </div>
                              {/* Campo para el mail */}
                            <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <label htmlFor="mail" className="form-label">{mail}</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="mail"
                                        value={this.state.mail}
                                        onChange={this.handleChange}
                                        placeholder="Ingresa tu mail"
                                        required
                                    />
                                </div>
                            </div>

                             {/* Campo para la contraseña */}
                             <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <label htmlFor="clave" className="form-label">{clave}</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="clave"
                                        value={this.state.clave}
                                        onChange={this.handleChange}
                                        placeholder="Ingresa tu clave"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Campo para el telefono */}
                            <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <label htmlFor="telefono" className="form-label">{telefono}</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="telefono"
                                        value={this.state.telefono}
                                        onChange={this.handleChange}
                                        placeholder="Ingresa tu telefono"
                                        required
                                    />
                                </div>
                            </div>

                             {/* Modal */}
                            {this.state.showModal && (
                                <div className="modal show d-block" tabindex="-1" role="dialog">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Nexo Educativo</h5>
                                                <button type="button" className="close"  data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Usuario creado exitosamente</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"  data-dismiss="modal">Cerrar</button>
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
export default AltaUsuario;