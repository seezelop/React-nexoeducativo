import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

class BajaPadre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            dni: '',
            idUsuario: null,
            padres: [], // Lista de padres
            rol: 'padre', // Cambiado el rol a "padre"
            showModal: false,
            showConfirmModal: false,
            padreSeleccionado: 'Seleccione un padre'
        };
    }

    // Cargar lista de padres
    cargarPadres = async () => {
        try {
            const response = await api.get(`/api/usuario/getUsuarios/${this.state.rol}`, {
                withCredentials: true
            });

            const padres = response.data.map(padre => ({
                idUsuario: padre.idUsuario,
                nombre: `${padre.nombre} ${padre.apellido} ${padre.dni}`
            }));

            this.setState({ padres });
            //console.log("Padres cargados: ", padres);

        } catch (error) {
            console.error('Error al cargar los padres:', error);
        }
    };

    componentDidMount() {
        this.cargarPadres();
    }

    handleDropdownChange = (field, value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            padreSeleccionado: parsedValue.nombre,
            idUsuario: parsedValue.idUsuario
        });

        //console.log("ID del padre seleccionado:", parsedValue.idUsuario);
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.delete(`/api/usuario/borrarUsuario/${this.state.idUsuario}`, {
                withCredentials: true
            });

            this.setState({
                padreSeleccionado: 'Seleccione un padre',
                idUsuario: null,
                showConfirmModal: false
            });

            await this.cargarPadres();

            if (response.status === 200) {
                alert("Padre eliminado exitosamente!");
            } else {
                alert("Error al eliminar el padre");
            }
        } catch (error) {
            console.error("Error al eliminar el padre:", error);
        }
    };

    handleShowConfirmModal = () => {
        if (!this.state.idUsuario) {
            alert('Por favor, seleccione un padre primero');
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
                                <label htmlFor="dropdown-basic-button" className="form-label">Padre</label>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={this.state.padreSeleccionado}
                                    onSelect={(value) => this.handleDropdownChange('padre', value)}
                                    size="sm"
                                >
                                    {this.state.padres.map(padre => (
                                        <Dropdown.Item
                                            key={padre.idUsuario}
                                            eventKey={JSON.stringify({ idUsuario: padre.idUsuario, nombre: padre.nombre })}
                                            style={{ color: 'black' }} // Estilo para texto negro
                                        >
                                            {padre.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            <div className="d-grid gap-2 mb-4">
                                <Button
                                    onClick={this.handleShowConfirmModal}
                                    className="d-flex align-items-center justify-content-center gap-2"
                                >
                                    <i className="fa-solid fa-trash"></i> Eliminar Padre
                                </Button>
                            </div>
                        </form>

                        <Modal show={this.state.showConfirmModal} onHide={this.handleCloseConfirmModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar Eliminación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                ¿Está seguro que desea eliminar al padre "{this.state.padreSeleccionado}"?
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

export default BajaPadre;
