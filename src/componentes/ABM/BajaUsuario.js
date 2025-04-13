import React, { Component } from 'react';
/*import 'index.css'  ARREGLAR ESTO*/
import { Dropdown, DropdownButton, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

// Crear una instancia de axios con la URL base
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

class BajaUsuario extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            nombre: '',
            apellido: '',
            dni:'',
            idUsuario: null,
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
            const response = await api.get(`/api/usuario/getUsuariosSuperAdmin/${this.state.rol}`, {
                withCredentials: true
              });
            //pasar lista de string a objetos
            const usuarios = response.data.map(jefe => ({
                idUsuario: jefe.idUsuario,
                nombre: `${jefe.nombre} ${jefe.apellido} ${jefe.dni} `
            }));

            this.setState({ usuarios });
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
            idUsuario: parsedValue.idUsuario
        });
    };

    //manejar envio del formulario
    handleSubmit = async (event) => {
        event.preventDefault();
        //const { idEscuela } = this.state;
        try {
            // Enviar los datos al backend
           // const { id_escuela } = this.state;
           const response = await api.delete(`/api/usuario/borrarUsuario/${this.state.idUsuario}`,{
            withCredentials: true
        });

            //reestablecer la lista sin incluir la escuela borrada
            this.setState({
                usuarioSeleccionado: 'Seleccione un usuario',
                id_usuario: null,
                showConfirmModal: false
            });

            // actualizar la lista sin incluir la escuela borrada
            await this.cargarUsuarios();
            if(response.status===200) {
                alert("Usuario eliminado exitosamente!")
                window.location.reload(); // Recarga la página
            }else{
                alert("error al eliminar usuario")
            }

          

        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    };

    handleShowConfirmModal = () => {
        //en caso de que no se seleccione una opcion
        console.log('id del usuario a guardar:', this.state.idUsuario); 
        if (!this.state.idUsuario) {
            alert('Por favor, seleccione un usuario primero');
            return;
        }
        this.setState({ showConfirmModal: true });
    };

        handleCloseConfirmModal = () => {
            this.setState({
                showConfirmModal: false, 
                usuarioSeleccionado: 'Seleccione un usuario',
                idUsuario: null
            });
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
                                <DropdownButton id="dropdown-basic-button"
                                title={this.state.usuarioSeleccionado}
                                    onSelect={(value) => this.handleDropdownChange('usuario', value)}
                                    size="sm">
                                    {this.state.usuarios.map(escuela => (
                                        <Dropdown.Item
                                            key={escuela.idUsuario}
                                            eventKey={JSON.stringify({ idUsuario: escuela.idUsuario, nombre: escuela.nombre })}
                                            style={{ color: 'black' }}
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