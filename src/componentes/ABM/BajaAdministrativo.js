import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

class BajaAdministrativo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            dni: '',
            idUsuario: null,
            administrativos: [],
            rol: 'administrativo', // Cambiado para identificar a los administrativos
            showModal: false,
            showConfirmModal: false,
            administrativoSeleccionado: 'Seleccione un administrativo'
        };
    }

    // Cargar lista de administrativos
    cargarAdministrativos = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/usuario/getUsuarios/${this.state.rol}`, {
                withCredentials: true
            });

            const administrativos = response.data.map(administrativo => ({
                idUsuario: administrativo.idUsuario,
                nombre: `${administrativo.nombre} ${administrativo.apellido} ${administrativo.dni}`
            }));

            this.setState({ administrativos });
           // console.log("Administrativos cargados: ", administrativos);

        } catch (error) {
            console.error('Error al cargar los administrativos:', error);
        }
    };

    componentDidMount() {
        this.cargarAdministrativos();
    }

    handleDropdownChange = (field, value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            administrativoSeleccionado: parsedValue.nombre,
            idUsuario: parsedValue.idUsuario
        });

       // console.log("ID del administrativo seleccionado:", parsedValue.idUsuario);
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8080/api/usuario/borrarUsuario/${this.state.idUsuario}`, {
                withCredentials: true
            });

            this.setState({
                administrativoSeleccionado: 'Seleccione un administrativo',
                idUsuario: null,
                showConfirmModal: false
            });

            await this.cargarAdministrativos();

            if (response.status === 200) {
                alert("Administrativo eliminado exitosamente!");
            } else {
                alert("Error al eliminar el administrativo");
            }
        } catch (error) {
            console.error("Error al eliminar el administrativo:", error);
        }
    };

    handleShowConfirmModal = () => {
        if (!this.state.idUsuario) {
            alert('Por favor, seleccione un administrativo primero');
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
                                <label htmlFor="dropdown-basic-button" className="form-label">Administrativo</label>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={this.state.administrativoSeleccionado}
                                    onSelect={(value) => this.handleDropdownChange('administrativo', value)}
                                    size="sm"
                                >
                                    {this.state.administrativos.map(administrativo => (
                                        <Dropdown.Item
                                            key={administrativo.idUsuario}
                                            eventKey={JSON.stringify({ idUsuario: administrativo.idUsuario, nombre: administrativo.nombre })}
                                            style={{ color: 'black' }} // Estilo para texto negro
                                        >
                                            {administrativo.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            <div className="d-grid gap-2 mb-4">
                                <Button
                                    onClick={this.handleShowConfirmModal}
                                    className="d-flex align-items-center justify-content-center gap-2"
                                >
                                    <i className="fa-solid fa-trash"></i> Eliminar Administrativo
                                </Button>
                            </div>
                        </form>

                        <Modal show={this.state.showConfirmModal} onHide={this.handleCloseConfirmModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar Eliminación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                ¿Está seguro que desea eliminar al administrativo "{this.state.administrativoSeleccionado}"?
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

export default BajaAdministrativo;
