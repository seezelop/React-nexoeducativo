import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

class BajaEscuela extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            direccion: '',
            id_escuela: null,
            escuelas: [],
            showModal: false,
            showConfirmModal: false,
            escuelaSeleccionada: 'Seleccione un colegio'
        };
    }

    // Cargar escuelas desde la API
    cargarEscuelas = async () => {
        try {
            const response = await api.get('/api/usuario/getEscuelas', {
                withCredentials: true
            });
            const escuelas = response.data.map(jefe => ({
                id_escuela: jefe.id_escuela,
                nombre: `${jefe.nombre} ${jefe.direccion}`
            }));

            if(response.status===200){
                this.setState({escuelas})
            }
           // this.setState({ escuelas });
        } catch (error) {
            console.error('Error al cargar las escuelas:', error);
        }
    };

    componentDidMount() {
        this.cargarEscuelas();
    }

    // Manejar selección en Dropdown
    handleDropdownChange = (field, value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            escuelaSeleccionada: parsedValue.nombre,
            id_escuela: parsedValue.id_escuela
        });
        //console.log("ID de la escuela seleccionada:", parsedValue.id_escuela);
    };

    // Manejar envío del formulario
    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.delete(`/api/usuario/borrarEscuela/${this.state.id_escuela}`, {
                withCredentials: true
            });

            //console.log("Respuesta del servidor: ", response);

            alert(`La escuela "${this.state.escuelaSeleccionada}" fue eliminada exitosamente.`);

            // Refrescar la página
            window.location.reload();
        } catch (error) {
            console.error("Error al eliminar la escuela:", error);
        }
    };

    handleShowConfirmModal = () => {
        if (!this.state.id_escuela) {
            alert('Por favor, seleccione una escuela primero.');
            return;
        }
        this.setState({ showConfirmModal: true });
    };

    handleCloseConfirmModal = () => {
        this.setState({ showConfirmModal: false });
    };

    render() {
        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12">
                        <form>
                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">Colegio</label>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={this.state.escuelaSeleccionada}
                                    onSelect={(value) => this.handleDropdownChange('escuela', value)}
                                    size="sm"
                                >
                                    {this.state.escuelas.map(escuela => (
                                        <Dropdown.Item
                                            key={escuela.id_escuela}
                                            eventKey={JSON.stringify({ id_escuela: escuela.id_escuela, nombre: escuela.nombre })}
                                            className="text-dark"  // COLOR NEGRO PARA LOS TEXTOS DEL DESPLEGABLE
                                        >
                                            {escuela.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>
                            <div className="d-grid gap-2 mb-4">
                                <Button
                                    onClick={this.handleShowConfirmModal}
                                    className="d-flex align-items-center justify-content-center gap-2"
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </Button>
                            </div>
                        </form>
                        {/* Confirmation Modal */}
                        <Modal show={this.state.showConfirmModal} onHide={this.handleCloseConfirmModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar Eliminación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                ¿Está seguro que desea eliminar la escuela "{this.state.escuelaSeleccionada}"?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleCloseConfirmModal}>
                                    Cancelar
                                </Button>
                                <Button variant="danger" onClick={this.handleSubmit}>
                                    Eliminar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </section>
                </section>
            </section>
        );
    }
}

export default BajaEscuela;
