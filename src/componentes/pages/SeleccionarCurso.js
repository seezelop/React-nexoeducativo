import React, { Component } from 'react';
import { Dropdown, DropdownButton, Form, Button } from 'react-bootstrap';
import axios from 'axios';

class SeleccionarCurso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursos: [],
            cursoSeleccionado: 'Seleccione un curso',
            id_curso: null,
            numero: '',
            division: '',
            activo: false,
        };
    }

    // Cargar la lista de cursos
    cargarCursos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/verCursos', {
                withCredentials: true,
            });

            const cursos = response.data.map((curso) => ({
                id_curso: curso.id_curso,
                nombre: `Curso ${curso.numero} - División ${curso.division}`,
                numero: curso.numero,
                division: curso.division,
                activo: curso.activo,
            }));

            this.setState({ cursos });
        } catch (error) {
            console.error('Error al cargar los cursos:', error);
        }
    };

    // Manejar selección de curso en el Dropdown
    handleDropdownChange = (value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            cursoSeleccionado: parsedValue.nombre,
            id_curso: parsedValue.id_curso,
            numero: parsedValue.numero,
            division: parsedValue.division,
            activo: parsedValue.activo,
        });
    };

    // Manejar cambios en los campos del formulario
    handleInputChange = (event) => {
        const { id, value, type, checked } = event.target;
        this.setState({ [id]: type === 'checkbox' ? checked : value });
    };

    // Manejar envío del formulario
    handleSubmit = (event) => {
        event.preventDefault();
        const { id_curso, numero, division, activo } = this.state;

        console.log('Datos del curso seleccionado:', { id_curso, numero, division, activo });
        alert('Curso seleccionado con éxito!');
    };

    componentDidMount() {
        this.cargarCursos();
    }

    render() {
        const { cursos, cursoSeleccionado, numero, division, activo } = this.state;

        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">Curso</label>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={cursoSeleccionado}
                                    onSelect={this.handleDropdownChange}
                                    size="sm"
                                >
                                    {cursos.map((curso) => (
                                        <Dropdown.Item
                                            key={curso.id_curso}
                                            eventKey={JSON.stringify(curso)}
                                        >
                                            {curso.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            {cursoSeleccionado !== 'Seleccione un curso' && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="numero" className="form-label">Número:</label>
                                        <Form.Control
                                            id="numero"
                                            type="text"
                                            value={numero}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="division" className="form-label">División:</label>
                                        <Form.Control
                                            id="division"
                                            type="text"
                                            value={division}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="activo" className="form-label">Activo:</label>
                                        <Form.Check
                                            id="activo"
                                            type="checkbox"
                                            checked={activo}
                                            readOnly
                                        />
                                    </div>
                                    <div className="d-grid gap-2 mb-4">
                                        <Button type="submit" className="btn btn-primary">Confirmar Curso</Button>
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

export default SeleccionarCurso;
