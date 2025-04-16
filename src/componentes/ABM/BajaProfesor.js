import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Modal } from 'react-bootstrap';
import axios from 'axios';


// Crear una instancia de axios con la URL base
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

class BajaProfesor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            dni: '',
            idUsuario: null,
            profesores: [],
            rol: 'profesor', 
            showModal: false,
            showConfirmModal: false,
            profesorSeleccionado: 'Seleccione un profesor'
        };
    }

    // Cargar lista de profesores
    cargarProfesores = async () => {
        try {
            const response = await api.get(`/api/usuario/getUsuarios/${this.state.rol}`, {
                withCredentials: true
            });

            const profesores = response.data.map(profesor => ({
                idUsuario: profesor.idUsuario,
                nombre: `${profesor.nombre} ${profesor.apellido} ${profesor.dni}`
            }));

            this.setState({ profesores });
            //console.log("Profesores cargados: ", profesores);

        } catch (error) {
            console.error('Error al cargar los profesores:', error);
        }
    };

    componentDidMount() {
        this.cargarProfesores();
    }

    handleDropdownChange = (field, value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            profesorSeleccionado: parsedValue.nombre,
            idUsuario: parsedValue.idUsuario
        });

        console.log("ID del profesor seleccionado:", parsedValue.idUsuario);
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.delete(`/api/usuario/borrarUsuario/${this.state.idUsuario}`, {
                withCredentials: true
            });

            this.setState({
                profesorSeleccionado: 'Seleccione un profesor',
                idUsuario: null,
                showConfirmModal: false
            });

            await this.cargarProfesores();

            if (response.status === 200) {
                alert("Profesor eliminado exitosamente!");
            } else {
                alert("Error al eliminar el profesor");
            }
        } catch (error) {
            console.error("Error al eliminar el profesor:", error);
        }
    };

    handleShowConfirmModal = () => {
        if (!this.state.idUsuario) {
            alert('Por favor, seleccione un profesor primero');
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
                                <label htmlFor="dropdown-basic-button" className="form-label">Profesor</label>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={this.state.profesorSeleccionado}
                                    onSelect={(value) => this.handleDropdownChange('profesor', value)}
                                    size="sm"
                                >
                                    {this.state.profesores.map(profesor => (
                                        <Dropdown.Item
                                            key={profesor.idUsuario}
                                            eventKey={JSON.stringify({ idUsuario: profesor.idUsuario, nombre: profesor.nombre })}
                                            style={{ color: 'black' }} // Estilo para texto negro
                                        >
                                            {profesor.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            <div className="d-grid gap-2 mb-4">
                                <Button
                                    onClick={this.handleShowConfirmModal}
                                    className="d-flex align-items-center justify-content-center gap-2"
                                >
                                    <i className="fa-solid fa-trash"></i> Eliminar Profesor
                                </Button>
                            </div>
                        </form>

                        <Modal show={this.state.showConfirmModal} onHide={this.handleCloseConfirmModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar Eliminación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                ¿Está seguro que desea eliminar al profesor "{this.state.profesorSeleccionado}"?
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

export default BajaProfesor;