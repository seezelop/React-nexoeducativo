import React, { Component } from 'react'; 
import { DropdownButton, Dropdown } from 'react-bootstrap'; 
import axios from 'axios';

class AltaEscuela extends Component {
    //se setean las propiedades que van a ser enviadas
    constructor(props) {
         super(props);
          this.state =
           { nombre: '',
             direccion: '', 
             activo: 1, 
             planSeleccionado: '', 
             idPlan: null, 
             jefeColegioSeleccionado: '', 
             idJefe: null, 
             planes: [], 
             jefesColegio: [] }; 
            }
    //esto es para rellenar los tipos de plan
    cargarPlanes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/usuario/getNombrePlanes');
            this.setState({ planes: response.data });
        } catch (error) {
            console.error('Error al cargar los planes:', error);
        }
    };

    //esto es para rellenar que muestre los jefes colegios sin colegios asignados
    cargarJefeColegio = async () => {
        try {
            const response = await axios.get('http://localhost:8080/usuario/getJefeColegioSinEscuela');
            if (response.status === 200) {
                const jefesColegio = response.data.map(jefe => ({
                    id: jefe.id_usuario,
                    nombre: `${jefe.nombre} ${jefe.apellido}`
                }));
                this.setState({ jefesColegio });
            } else if (response.status === 404) {
                console.log('Todos los jefes colegios registrados tienen un colegio asignado');
            } else {
                console.log('Hubo un error y no sabemos que paso');
            }
        } catch (error) {
            console.error('Error al cargar los jefes de colegio:', error);
        }
    };

    // Llama a los métodos para cargar datos al montar el componente
    componentDidMount() {
        this.cargarPlanes();
        this.cargarJefeColegio();
    }

    // Manejar el cambio en los inputs
    handleInputChange = (e) => {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    };

    // Manejar selección en Dropdown
    handleDropdownChange = (field, value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            [`${field}Seleccionado`]: parsedValue.nombre,
            [`id${field.charAt(0).toUpperCase() + field.slice(1)}`]: parsedValue.id
        });
    };

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
                    <section className="col-lg-12">
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
                            {/* Campo para la dirección */}
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

                            {/* Campo desplegable para los tipos de Plan */}
                            <div className="pt-2 pb-5">
                                <label htmlFor="dropdown-basic-button" className="form-label">{plan}</label>
                                <DropdownButton
                                    id="dropdown-plan"
                                    title={this.state.planSeleccionado || "Seleccione un Plan"}
                                    onSelect={(value) => this.handleDropdownChange('plan', value)}
                                >
                                    {this.state.planes.map(plan => (
                                        <Dropdown.Item
                                            key={plan.idPlan}
                                            eventKey={JSON.stringify({ id: plan.idPlan, nombre: plan.descripcion })}
                                        >
                                            {plan.descripcion}
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
                                    onSelect={(value) => this.handleDropdownChange('jefeColegio', value)}
                                >
                                    {this.state.jefesColegio.map(jefe => (
                                        <Dropdown.Item
                                            key={jefe.id}
                                            eventKey={JSON.stringify({ id: jefe.id, nombre: jefe.nombre })}
                                        >
                                            {jefe.nombre}
                                        </Dropdown.Item>
                                    ))}
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
export default AltaEscuela;