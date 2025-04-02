import React, { Component } from 'react';
import { Dropdown, DropdownButton, Form, ListGroup } from 'react-bootstrap';
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

    obtenerInfo = async (idCurso) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/usuario/selectCurso/${idCurso}`, {
                withCredentials: true,
            });

            const curso = response.data[0];
            const alumnos = curso.alumnos || [];
            const materias = curso.materias || [];

            this.setState({
                alumnos,
                materias,
                numero: curso.numero || '',
                division: curso.division || '',
                nombreP: curso.nombreP || '',
                apellidoP: curso.apellidoP || '',
            });
        } catch (error) {
            console.error('Error al cargar la información:', error.response?.data || error.message);
        }
    };

    componentDidMount() {
        this.cargarCursos();
    }

    handleDropdownChange = (value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            cursoSeleccionado: parsedValue.nombre,
            idCurso: parsedValue.idCurso,
            numero: parsedValue.numero,
            division: parsedValue.division,
        });
        this.obtenerInfo(parsedValue.idCurso);
    };

    render() {
        const { cursos, cursoSeleccionado, numero, division, nombreP, apellidoP, alumnos, materias } = this.state;

        return (
            <section className="d-flex flex-column">
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12">
                        <form>
                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label text-white">Curso</label>
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
                                            style={{ color: 'black' }}
                                        >
                                            {curso.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            {cursoSeleccionado !== 'Seleccione un curso' && (
                                <>
                                    <div className="mb-3">
                                        <label className="form-label">Número:</label>
                                        <Form.Control type="text" value={numero} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">División:</label>
                                        <Form.Control type="text" value={division} readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Preceptor:</label>
                                        <Form.Control type="text" value={`${nombreP} ${apellidoP}`.trim() || 'Sin asignar'} readOnly />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Alumnos:</label>
                                        {alumnos.length > 0 ? (
                                            <ListGroup>
                                                {alumnos.map((alumno, index) => (
                                                    <ListGroup.Item key={index}>
                                                        {alumno.nombre} {alumno.apellido}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        ) : (
                                            <p>No hay alumnos asignados.</p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Materias:</label>
                                        {materias.length > 0 ? (
                                            <ListGroup>
                                                {materias.map((materia, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <strong>{materia.nombre}</strong> - Profesor: {materia.nombreProfesor} {materia.apellidoProfesor}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        ) : (
                                            <p>No hay materias asignadas.</p>
                                        )}
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