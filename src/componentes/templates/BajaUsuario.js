import React, { Component } from 'react';
/*import 'index.css'  ARREGLAR ESTO*/
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importamos Link

class BajaUsuario extends Component {
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
                                    <i class="fa-solid fa-trash fa-3x"></i>{/* Icono de usuario */}
                            </div>
                        </form>
                    </section>
                </section>
            </section>
        );
    }
}


export default BajaUsuario;