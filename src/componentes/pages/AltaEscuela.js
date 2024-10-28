import React, { Component, useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'; // Asegúrate de tener esto importado si lo usas
import axios from 'axios';
class AltaEscuela extends Component {
    //se setean las propiedades que van a ser enviadas
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            direccion: '',
            activo: '',
            planSeleccionado: '',
            jefeColegioSeleccionado: '',
            planes: [],
            jefesColegio: []
        };
    }

    //esto es para rellenar los tipos de plan
    componentDidMount() {
        axios.get('http://localhost:8080/api/usuarios/getNombreRoles')
            .then((response) => {
                console.log(response);
                this.setState({ planes: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // Manejar el cambio en los inputs
    handleInputChange = (e) => {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    };

    // Manejar selección en Dropdown
    handleDropdownChange = (field, value) => {
        this.setState({ [field]: value });
    };

    // Enviar los datos al backend
    handleSubmit = async (e) => {
        e.preventDefault();
        const { nombre, direccion, activo, planSeleccionado, jefeColegioSeleccionado } = this.state;

        try {
            const response = await axios.post('http://localhost:8080/usuario/saveEscuela', {
                nombre,
                direccion,
                activo,
                plan: planSeleccionado,
                jefeColegio: jefeColegioSeleccionado,
            });
            console.log('Respuesta del servidor:', response.data);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };
    render() {
        //valores por defecto
        const {
            nombre = "Nombre:",
            direccion = "Dirección:",
            activo = "¿El usuario esta activo en el sistema?",
            plan = "Tipo de plan:",
            jefeColegio = "Jefe colegio:",
            buttonText = "Confirmar"
        } = this.props;

        return (
            <section className="d-flex flex-column">
                {/* Contenedor principal usando section */}
                <section className="container d-flex justify-content-center align-items-center flex-grow-1">
                    <section className="col-lg-12"> {/* Ajustamos a 12 columnas para mejor visibilidad */}
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                {/* Campo para el Nombre */}
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">{nombre}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        placeholder="Ingresa tu nombre"
                                        value={this.state.nombre}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            {/* Campo para la direccion */}
                            <div className="row">
                                <div className="col mb-3">
                                    <label htmlFor="direccion" className="form-label">{direccion}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="direccion"
                                        placeholder="Ingresa tu dirección"
                                        value={this.state.direccion}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>
                            </div>


                            {/* Campo para verificar si esta activo */}
                            <label htmlFor="activo" className="form-label">{activo}</label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" for="flexCheckDefault">
                                    Si
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label class="form-check-label" for="flexCheckChecked">
                                    No
                                </label>
                            </div>

                            {/* Campo desplegable para los tipos de Plan */}
                            <div className="pt-2 pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">{plan}</label>
                                <DropdownButton
                                    id="dropdown-plan"
                                    title={this.state.planSeleccionado || "Seleccione un Plan"}
                                    onSelect={(value) => this.handleDropdownChange('planSeleccionado', value)}
                                >
                                    {this.state.planes.map(plan => (
                                        <Dropdown.Item key={plan.id} eventKey={plan.id}>
                                            {plan.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>

                            {/* Campo desplegable para el jefe colegio */}
                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">{jefeColegio}</label>
                                <DropdownButton id="dropdown-basic-button" title="Seleccione un Jefe colegio" size="sm">
                                    <Dropdown.Item href="#">Traer esta info desde la bbdd</Dropdown.Item>
                                </DropdownButton>
                            </div>

                            <div className="d-grid gap-2 mb-4">
                                <button type="submit" className="btn btn-primary btn-lg">{buttonText}</button>
                            </div>
                        </form>
                    </section>
                </section>
            </section>
        );
    }
}

// Valores por defecto para las props
AltaEscuela.defaultProps = {
    nombre: "Nombre:",
    direccion: "Dirección:",
    email: "Email:",
    plan: "Tipo de plan:",
    jefeColegio: "Jefe colegio:",
    buttonText: "Confirmar"
};

export default AltaEscuela;
