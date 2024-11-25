import React, { Component } from 'react';
/*import 'index.css'  ARREGLAR ESTO*/
import { Dropdown, DropdownButton, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
class BajaEscuela extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            nombre: '',
            direccion: '',
            id_escuela: null,
            escuelas: [],
            showModal: false,
            showConfirmModal: false,
            escuelaSeleccionada: 'Seleccione un colegio'
        };
    }
    //esto es para rellenar los tipos de plan
    cargarEscuelas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/usuario/getEscuelas',{
                withCredentials: true
            });
            //pasar lista de string a objetos
            const escuelas = response.data.map(jefe => ({
                id_escuela: jefe.id_escuela,
                nombre: `${jefe.nombre} ${jefe.direccion}`
            }));

            this.setState({ escuelas });
            console.log("escuelas cargadas: "+escuelas)

        } catch (error) {
            console.error('Error al cargar las escuelas:', error);
        }
    };

    // Llama a los métodos para cargar datos al montar el componente
    componentDidMount() {
        this.cargarEscuelas();
    }

    // Manejar selección en Dropdown
    handleDropdownChange = (field, value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            escuelaSeleccionada: parsedValue.nombre,
            id_escuela: parsedValue.id_escuela // Update id_usuario state
        });

        console.log("ID de la escuela seleccionada:", parsedValue.id_escuela); // Imprimir en consola
        //this.state.id_escuela = parsedValue.id_escuela
        //console.log("id del estado "+this.state.id_escuela)
    };

    //manejar envio del formulario
    handleSubmit = async (event) => {
        event.preventDefault();
        //const { idEscuela } = this.state;
        try {
            // Enviar los datos al backend
           // const { id_escuela } = this.state;
           const response = await axios.delete(`http://localhost:8080/api/usuario/borrarEscuela/${this.state.id_escuela}`,{
            withCredentials: true
        });

            console.log("lo que se va a enviar: "+response)

            //reestablecer la lista sin incluir la escuela borrada
            this.setState({
                escuelaSeleccionada: 'Seleccione un colegio',
                id_escuela: null,
                showConfirmModal: false
            });

            // actualizar la lista sin incluir la escuela borrada
            await this.cargarEscuelas();

        } catch (error) {
            console.error("Error al eliminar la escuela:", error);
        }
    };

    handleShowConfirmModal = () => {
        //en caso de que no se seleccione una opcion
        console.log('Current school ID:', this.state.id_escuela); // Debug log
        if (!this.state.id_escuela) {
            alert('Por favor, seleccione una escuela primero');
            console.log("id enviado al backend"+this.state.id_escuela);
            return;
        }
        this.setState({ showConfirmModal: true });
    };

    handleCloseConfirmModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        return (
            <section className="d-flex flex-column">

                {/* Contenedor principal usando section */}
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12"> {/* Ajustamos a 8 columnas para mejor visibilidad */}
                        {/*<h2 className="text-center mb-4">Dejanos tu consulta</h2>*/}
                        <form>
                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">Colegio</label>
                                <DropdownButton id="dropdown-basic-button"
                                    title={this.state.escuelaSeleccionada}
                                    onSelect={(value) => this.handleDropdownChange('escuela', value)}
                                    size="sm">
                                    {this.state.escuelas.map(escuela => (
                                        <Dropdown.Item
                                            key={escuela.id_escuela}
                                            eventKey={JSON.stringify({ id_escuela: escuela.id_escuela, nombre: escuela.nombre })}
                                        >
                                            {escuela.nombre}
                                        </Dropdown.Item>
                                    ))}
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