import React, { Component } from 'react';
import { Dropdown, DropdownButton, Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

class SeleccionarCurso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursos: [],
            alumnos: [],
            materias: [],
            cursoSeleccionado: 'Seleccione un curso',
            idCurso: null,
            numero: '',
            division: '',
            nombreP: '',
            apellidoP: '',
        };
    }

    // Cargar la lista de cursos
    cargarCursos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/usuario/verCursos', {
                withCredentials: true,
            });

            const cursos = response.data.map((curso) => ({
                idCurso: curso.idCurso,
                nombre: `${curso.numero} ${curso.division}`,
                numero: curso.numero,
                division: curso.division,
                activo: curso.activo,
            }));

            this.setState({ cursos });
        } catch (error) {
            console.error('Error al cargar los cursos:', error);
        }
    };

    // Obtener información adicional del curso
    obtenerInfo = async (idCurso) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/usuario/selectCurso/${idCurso}`, {
                withCredentials: true,
            });

            // Acceder al primer elemento del array (asumiendo que solo hay un curso)
            const curso = response.data[0];

            // Obtener alumnos y materias
            const alumnos = curso.alumnos;
            const materias = curso.materias;

            // Actualizar el estado con la información del curso
            this.setState({
                alumnos,
                materias,
                numero: curso.numero || '',
                division: curso.division || '',
                nombreP: curso.nombreP || '',
                apellidoP: curso.apellidoP || '',
            });

            console.info('INFO CURSO:', curso);
        } catch (error) {
            console.error('Error al cargar la información:', error.response?.data || error.message);
        }
    };

    componentDidMount() {
        this.cargarCursos();
    }

    // Manejar selección de curso en el Dropdown
    handleDropdownChange = (value) => {
        const parsedValue = JSON.parse(value);
        console.log('ID del curso seleccionado:', parsedValue.idCurso); // Verifica el valor de idCurso

        this.setState({
            cursoSeleccionado: parsedValue.nombre,
            idCurso: parsedValue.idCurso,
            numero: parsedValue.numero,
            division: parsedValue.division,
        });

        // Llamar a obtenerInfo para cargar la información adicional del curso
        this.obtenerInfo(parsedValue.idCurso);
    };

    render() {
        const {
            cursos,
            cursoSeleccionado,
            numero,
            division,
            nombreP,
            apellidoP,
            alumnos,
            materias,
        } = this.state;

        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12">
                        <form>
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
                                            key={curso.idCurso}
                                            eventKey={JSON.stringify(curso)}
                                        >
                                            {curso.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            {cursoSeleccionado !== 'Seleccione un curso' && (
                                <>
                                    {/* Información básica del curso */}
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
                                        <label htmlFor="nombreP" className="form-label">Nombre Preceptor:</label>
                                        <Form.Control
                                            id="nombreP"
                                            type="text"
                                            value={nombreP}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="apellidoP" className="form-label">Apellido Preceptor:</label>
                                        <Form.Control
                                            id="apellidoP"
                                            type="text"
                                            value={apellidoP}
                                            readOnly
                                        />
                                    </div>

                                    {/* Lista de alumnos */}
                                    <div className="mb-3">
                                        <label className="form-label">Alumnos:</label>
                                        <ListGroup>
                                            {alumnos.map((alumno, index) => (
                                                <ListGroup.Item key={index}>
                                                    {alumno.nombre} {alumno.apellido}
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </div>

                                    {/* Lista de materias */}
                                    <div className="mb-3">
                                        <label className="form-label">Materias:</label>
                                        <ListGroup>
                                            {materias.map((materia, index) => (
                                                <ListGroup.Item key={index}>
                                                    <strong>{materia.nombre}</strong> - Profesor: {materia.nombreProfesor} {materia.apellidoProfesor}
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
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