import React, { Component } from 'react';
/*import 'index.css'  ARREGLAR ESTO*/
import { Dropdown, DropdownButton, Button, Modal } from 'react-bootstrap';

class BajaUsuario extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            nombre: '',
            apellido: '',
            dni:'',
            id_usuario: null,
            usuarios: [],
            showModal: false,
            showConfirmModal: false,
            usuarioSeleccionado: 'Seleccione un colegio'
        };
    }
    render() {
        return (
            <section className="d-flex flex-column">

                {/* Contenedor principal usando section */}
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12"> {/* Ajustamos a 8 columnas para mejor visibilidad */}
                        {/*<h2 className="text-center mb-4">Dejanos tu consulta</h2>*/}
                        <form>
                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">DNI</label>
                                <DropdownButton id="dropdown-basic-button" title="Seleccione un usuario" size="sm">
                                    <Dropdown.Item href="#">Traer de la bbdd</Dropdown.Item>
                                </DropdownButton>
                            </div>


                            <div className="d-grid gap-2 mb-4">
                                <Button
                                    //variant="danger"
                                    onClick={this.handleShowConfirmModal}
                                    className="d-flex align-items-center justify-content-center gap-2"
                                >
                                    <i className="fa-solid fa-trash"></i>
                                    
                                </Button>
                            </div>
                        </form>
                    </section>
                </section>
            </section>
        );
    }
}


export default BajaUsuario;