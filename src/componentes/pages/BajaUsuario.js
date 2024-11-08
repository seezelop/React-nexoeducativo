import React, { Component } from 'react';
/*import 'index.css'  ARREGLAR ESTO*/
import { Dropdown, DropdownButton, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

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
            rol:'jefe%20colegio',//el %50 indica espacio sino da eror en la request
            showModal: false,
            showConfirmModal: false,
            usuarioSeleccionado: 'Seleccione un usuario'
        };
    }

     //esto es para rellenar el dropdown con los jefe colegios
     cargarUsuarios = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/usuario/getUsuarios/${this.state.rol}`);
            //pasar lista de string a objetos
            const usuarios = response.data.map(jefe => ({
                id_usuario: jefe.id_usuario,
                nombre: `${jefe.nombre} ${jefe.apellido} ${jefe.dni} `
            }));

            this.setState({ usuarios });
            console.log("usuarios cargadas: "+usuarios)

        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
        }
    };

    // Llama a los métodos para cargar datos al montar el componente
    componentDidMount() {
        this.cargarUsuarios();
    }

    // Manejar selección en Dropdown
    handleDropdownChange = (field, value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            usuarioSeleccionado: parsedValue.nombre,
            id_usuario: parsedValue.id_usuario
        });

        console.log("ID del usuario seleccionado:", parsedValue.id_usuario); // Imprimir en consola
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
           const response = await axios.delete(`http://localhost:8080/api/usuario/borrarUsuario/${this.state.id_usuario}`);

            console.log("lo que se va a enviar: "+response)

            //reestablecer la lista sin incluir la escuela borrada
            this.setState({
                usuarioSeleccionado: 'Seleccione un usuario',
                id_usuario: null,
                showConfirmModal: false
            });

            // actualizar la lista sin incluir la escuela borrada
            await this.cargarUsuarios();

        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    };

    handleShowConfirmModal = () => {
        //en caso de que no se seleccione una opcion
        console.log('id del usuario a guardar:', this.state.id_usuario); // Debug log
        if (!this.state.id_usuario) {
            alert('Por favor, seleccione un usuario primero');
            console.log("id enviado al backend"+this.state.id_usuario);
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
                                <label htmlFor="dropdown-basic-button" className="form-label">DNI</label>
                                <DropdownButton id="dropdown-basic-button"
                                title={this.state.usuarioSeleccionado}
                                    onSelect={(value) => this.handleDropdownChange('usuario', value)}
                                    size="sm">
                                    {this.state.usuarios.map(escuela => (
                                        <Dropdown.Item
                                            key={escuela.id_usuario}
                                            eventKey={JSON.stringify({ id_usuario: escuela.id_usuario, nombre: escuela.nombre })}
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
                                ¿Está seguro que desea eliminar el usuario "{this.state.usuarioSeleccionado}"?
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


export default BajaUsuario;