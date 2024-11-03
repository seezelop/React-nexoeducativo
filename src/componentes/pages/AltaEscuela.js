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
            activo: 1,
            planSeleccionado: '',
            idPlan: null,
            jefeColegioSeleccionado: '',
            idJefe: null,
            planes: [],
            jefesColegio: []
        };
    }

    //esto es para rellenar los tipos de plan
    cargarPlanes = async () => {
        try {
            const respuesta = await fetch(`http://localhost:8080/api/usuario/getNombrePlanes`);
            console.log(respuesta);

            if (respuesta.status === 200) {
                const datos = await respuesta.json();
                console.log("datos planes:", datos);

                // Procesa los datos para convertirlos en un formato de objeto
                
                this.setState({  });

            } else if (respuesta.status === 404) {
                console.log('no hay planes');
            } else {
                console.log('Hubo un error y no sabemos que pasó');
            }
        } catch (error) {
            console.log(error);
        }
    };

    //esto es para rellenar que muestre los jefes colegios sin colegios asignados
    cargarJefeColegio = async () => {
        try {
            const respuesta = await fetch(`http://localhost:8080/api/usuario/getJefeColegioSinEscuela`);

            console.log(respuesta);

            // Si la respuesta es correcta
            if (respuesta.status === 200) {
                const datos = await respuesta.json();
                console.log("datitos:" + datos);

                // Mapea los datos a los elementos del dropdown
                const jefesColegio = datos.map(jefe => ({
                    id: jefe.id_usuario,
                    nombre: `${jefe.nombre} ${jefe.apellido}`
                }));

                // Establece los items en el estado
                this.setState({ jefesColegio });


            } else if (respuesta.status === 404) {
                console.log('Todos los jefes colegios registrados tienen un colegio asignado');
            } else {
                console.log('Hubo un error y no sabemos que paso');
            }
        } catch (error) {
            console.log(error);
        }
    };
    //aca hago que se llame a los metodos en el dropdown
    componentDidMount() {
        this.cargarJefeColegio();
        this.cargarPlanes();
    }

    // Manejar el cambio en los inputs
    handleInputChange = (e) => {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    };

    // Manejar selección en Dropdown
    
    // Enviar los datos al backend
   
    render() {
        //valores por defecto
        const {
            nombre = "Nombre:",
            direccion = "Dirección:",
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


                            {/* Campo desplegable para los tipos de Plan */}
                            <div className="pt-2 pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">{plan}</label>
                                <DropdownButton
                                    id="dropdown-plan"
                                    title={this.state.planSeleccionado || "Seleccione un Plan"}
                                    onSelect={(value) => this.handleDropdownChange('planSeleccionado', value)}
                                >
                                    {/*<Dropdown.Menu>
                                        {this.state.planes.map(plan => (
                                            <Dropdown.Item
                                                key={plan.id}
                                                eventKey={JSON.stringify({ id: plan.idPlan, nombre: plan.descripcion })}
                                            >
                                                {plan.descripcion}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>*/}
                                    {this.state.planes.map(plan => (
                                        <Dropdown.Item
                                            key={plan.id}
                                            eventKey={JSON.stringify({ id: plan.id, nombre: plan.nombre })}
                                        >
                                            {plan.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>

                            </div>

                            {/* Campo desplegable para el jefe colegio */}

                            <div className="pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">{jefeColegio}</label>
                                <DropdownButton
                                    id="dropdown-jefeC"
                                    title={this.state.jefeColegioSeleccionado || "Seleccione un Jefe Colegio"}
                                    onSelect={(value) => this.handleDropdownChange('jefeColegioSeleccionado', value)}
                                >
                                    <Dropdown.Menu>
                                        {this.state.jefesColegio.map(jefe => (
                                            <Dropdown.Item
                                                key={jefe.id}
                                                eventKey={JSON.stringify({ id: jefe.id, nombre: jefe.nombre })}
                                            >
                                                {jefe.nombre}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
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
