import React, { Component } from 'react';
import { Dropdown, DropdownButton, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

class SeleccionarProfesor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profesores: [],
            profesorSeleccionado: 'Seleccione un profesor',
            idProfesor: null,
            nombre: '',
            apellido: '',
            idRol: '',
        };
    }

    // Cargar la lista de profesores
    cargarProfesores = async () => {
        try {
            const response = await api.get('/api/profesor/getProfesores', {
                withCredentials: true,
            });

            const profesores = response.data.map((profesor) => ({
                idProfesor: profesor.idProfesor,
                nombre: `${profesor.nombre} ${profesor.apellido}`,
                idRol: profesor.idRol,
            }));

            this.setState({ profesores });
        } catch (error) {
            console.error('Error al cargar los profesores:', error);
        }
    };

    // Manejar selección de profesor en el Dropdown
    handleDropdownChange = (value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            profesorSeleccionado: parsedValue.nombre,
            idProfesor: parsedValue.idProfesor,
            nombre: parsedValue.nombre.split(' ')[0], // Supone que el primer nombre es el nombre
            apellido: parsedValue.nombre.split(' ').slice(1).join(' '), // Resto del nombre es el apellido
            idRol: parsedValue.idRol,
        });
    };

    // Manejar cambios en los campos del formulario
    handleInputChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };

    // Manejar envío del formulario
    handleSubmit = (event) => {
        event.preventDefault();
        const { idProfesor, nombre, apellido, idRol } = this.state;

        // Aquí puedes hacer lo que quieras con estos valores (ej. enviarlos a una API)
        console.log('Datos del profesor seleccionado:', { idProfesor, nombre, apellido, idRol });

        alert('Profesor seleccionado con éxito!');
    };

    componentDidMount() {
        this.cargarProfesores();
    }

    render() {
        const { profesores, profesorSeleccionado, nombre, apellido, idRol } = this.state;

        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">Profesor</label>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={profesorSeleccionado}
                                    onSelect={this.handleDropdownChange}
                                    size="sm"
                                >
                                    {profesores.map((profesor) => (
                                        <Dropdown.Item
                                            key={profesor.idProfesor}
                                            eventKey={JSON.stringify(profesor)}
                                        >
                                            {profesor.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            {profesorSeleccionado !== 'Seleccione un profesor' && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre:</label>
                                        <Form.Control
                                            id="nombre"
                                            type="text"
                                            value={nombre}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="apellido" className="form-label">Apellido:</label>
                                        <Form.Control
                                            id="apellido"
                                            type="text"
                                            value={apellido}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="idRol" className="form-label">ID Rol:</label>
                                        <Form.Control
                                            id="idRol"
                                            type="text"
                                            value={idRol}
                                            readOnly
                                        />
                                    </div>
                                    <div className="d-grid gap-2 mb-4">
                                        <Button type="submit" className="btn btn-primary">Confirmar Profesor</Button>
                                    </div>
                                </>
                            )}
                        </form>
                    </section>
                </section>
            </section>
        );
    }
}

export default SeleccionarProfesor;
