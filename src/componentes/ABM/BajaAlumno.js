import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

class BajaAlumno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            dni: '',
            idUsuario: null,
            alumnos: [], // Lista de alumnos
            rol: 'alumno', // Cambiado el rol a "alumno"
            showModal: false,
            showConfirmModal: false,
            alumnoSeleccionado: 'Seleccione un alumno'
        };
    }

    // Cargar lista de alumnos
    cargarAlumnos = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/usuario/verAlumnos`, {
                withCredentials: true
            });

            //console.log("info alumnos api: "+JSON.stringify(response.data))

            const alumnos = response.data.map(alumno => ({
                idUsuario: alumno.id_usuario,
                nombre: `${alumno.nombre} ${alumno.apellido}`
            }));

            this.setState({ alumnos });
            console.log("Alumnos cargados: ", alumnos);

        } catch (error) {
            console.error('Error al cargar los alumnos:', error);
        }
    };

    componentDidMount() {
        this.cargarAlumnos();
    }

    handleDropdownChange = (field, value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            alumnoSeleccionado: parsedValue.nombre,
            idUsuario: parsedValue.idUsuario
        });

        console.log("ID del alumno seleccionado:", parsedValue.idUsuario);
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8080/api/usuario/borrarUsuario/${this.state.idUsuario}`, {
                withCredentials: true
            });

            this.setState({
                alumnoSeleccionado: 'Seleccione un alumno',
                idUsuario: null,
                showConfirmModal: false
            });

            await this.cargarAlumnos();

            if (response.status === 200) {
                alert("Alumno eliminado exitosamente!");
            } else {
                alert("Error al eliminar el alumno");
            }
        } catch (error) {
            console.error("Error al eliminar el alumno:", error);
        }
    };

    handleShowConfirmModal = () => {
        if (!this.state.idUsuario) {
            alert('Por favor, seleccione un alumno primero');
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
                                <label htmlFor="dropdown-basic-button" className="form-label">Alumno</label>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={this.state.alumnoSeleccionado}
                                    onSelect={(value) => this.handleDropdownChange('alumno', value)}
                                    size="sm"
                                >
                                    {this.state.alumnos.map(alumno => (
                                        <Dropdown.Item
                                            key={alumno.idUsuario}
                                            eventKey={JSON.stringify({ idUsuario: alumno.idUsuario, nombre: alumno.nombre })}
                                        >
                                            {alumno.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            <div className="d-grid gap-2 mb-4">
                                <Button
                                    onClick={this.handleShowConfirmModal}
                                    className="d-flex align-items-center justify-content-center gap-2"
                                >
                                    <i className="fa-solid fa-trash"></i> Eliminar Alumno
                                </Button>
                            </div>
                        </form>

                        <Modal show={this.state.showConfirmModal} onHide={this.handleCloseConfirmModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar Eliminación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                ¿Está seguro que desea eliminar al alumno "{this.state.alumnoSeleccionado}"?
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

export default BajaAlumno;
