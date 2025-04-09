import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

class BajaPreceptor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            dni: '',
            idUsuario: null,
            preceptores: [], // Lista de preceptores
            rol: 'preceptor', // Cambiado el rol a "preceptor"
            showModal: false,
            showConfirmModal: false,
            preceptorSeleccionado: 'Seleccione un preceptor'
        };
    }

    // Cargar lista de preceptores
    cargarPreceptores = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/usuario/getUsuarios/${this.state.rol}`, {
                withCredentials: true
            });

            const preceptores = response.data.map(preceptor => ({
                idUsuario: preceptor.idUsuario,
                nombre: `${preceptor.nombre} ${preceptor.apellido} ${preceptor.dni}`
            }));

            this.setState({ preceptores });
           // console.log("Preceptores cargados: ", preceptores);

        } catch (error) {
            console.error('Error al cargar los preceptores:', error);
        }
    };

    componentDidMount() {
        this.cargarPreceptores();
    }

    handleDropdownChange = (field, value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            preceptorSeleccionado: parsedValue.nombre,
            idUsuario: parsedValue.idUsuario
        });

        //console.log("ID del preceptor seleccionado:", parsedValue.idUsuario);
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8080/api/usuario/borrarUsuario/${this.state.idUsuario}`, {
                withCredentials: true
            });

            this.setState({
                preceptorSeleccionado: 'Seleccione un preceptor',
                idUsuario: null,
                showConfirmModal: false
            });

            await this.cargarPreceptores();

            if (response.status === 200) {
                alert("Preceptor eliminado exitosamente!");
            } else {
                alert("Error al eliminar el preceptor");
            }
        } catch (error) {
            console.error("Error al eliminar el preceptor:", error);
        }
    };

    handleShowConfirmModal = () => {
        if (!this.state.idUsuario) {
            alert('Por favor, seleccione un preceptor primero');
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
                                <label htmlFor="dropdown-basic-button" className="form-label">Preceptor</label>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={this.state.preceptorSeleccionado}
                                    onSelect={(value) => this.handleDropdownChange('preceptor', value)}
                                    size="sm"
                                >
                                    {this.state.preceptores.map(preceptor => (
                                        <Dropdown.Item
                                            key={preceptor.idUsuario}
                                            eventKey={JSON.stringify({ idUsuario: preceptor.idUsuario, nombre: preceptor.nombre })}
                                            style={{ color: 'black' }} // Estilo para texto negro
                                        >
                                            {preceptor.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            <div className="d-grid gap-2 mb-4">
                                <Button
                                    onClick={this.handleShowConfirmModal}
                                    className="d-flex align-items-center justify-content-center gap-2"
                                >
                                    <i className="fa-solid fa-trash"></i> Eliminar Preceptor
                                </Button>
                            </div>
                        </form>

                        <Modal show={this.state.showConfirmModal} onHide={this.handleCloseConfirmModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar Eliminación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                ¿Está seguro que desea eliminar al preceptor "{this.state.preceptorSeleccionado}"?
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

export default BajaPreceptor;
