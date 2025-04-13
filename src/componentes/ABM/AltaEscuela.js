import React, { Component } from 'react'; 
import { DropdownButton, Dropdown } from 'react-bootstrap'; 
import axios from 'axios';

// Crear una instancia de axios con la URL base
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

class AltaEscuela extends Component {
    // Se setean las propiedades que van a ser enviadas
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            direccion: '', 
            activo: 1, 
            planSeleccionado: '', 
            idPlan: null, 
            jefeColegioSeleccionado: '', 
            id_usuario: null, 
            planes: [], 
            showModal: false,
            jefesColegio: [] 
        };
    }

    
    
    
    // Esto es para rellenar los tipos de plan
    cargarPlanes = async () => {
        try {
            const response = await api.get('/api/usuario/getNombrePlanes', {
                withCredentials: true
            });
            // Pasar lista de string a objetos
            const planes = response.data.map(item => {
                const [idPlan, descripcion] = item.split(','); // Divide la cadena en partes
                return { idPlan: parseInt(idPlan, 10), descripcion }; // 10 por base decimal
            });

            this.setState({ planes });

        } catch (error) {
            console.error('Error al cargar los planes:', error);
        }
    };

    // Esto es para rellenar que muestre los jefes de colegio sin colegios asignados
    cargarJefeColegio = async () => {
        try {
            const response = await api.get('/api/usuario/getJefeColegioSinEscuela', {
                withCredentials: true
            });
            if (response.status === 200) {
                const jefesColegio = response.data.map(jefe => ({
                    id_usuario: jefe.id_usuario,
                    nombre: `${jefe.nombre} ${jefe.apellido}`
                }));
                this.setState({ jefesColegio });
            } else if (response.status === 404) {
                console.log('Todos los jefes colegios registrados tienen un colegio asignado');
            } else {
                console.log('Hubo un error y no sabemos qué pasó');
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
            [`id${field.charAt(0).toUpperCase() + field.slice(1)}`]: parsedValue.id,
            id_usuario: parsedValue.id // Update id_usuario state
        });
    };

    // Envío del formulario
    handleSubmit = async (event) => {
        event.preventDefault(); 
        const { nombre, direccion, activo, idPlan, id_usuario } = this.state;

        try {
            // Enviar los datos al backend
            const response = await api.post('/api/usuario/saveEscuela', {
                nombre,
                direccion,
                activo,
                idPlan,
                jefeColegio: id_usuario
            }, { withCredentials: true });

            if (response.status === 200) {
                alert("Escuela creada exitosamente."); // Mostrar el mensaje de confirmación

                 // Refrescar la página
                window.location.reload();
                console.log("Escuela creada exitosamente:", response.data);
                // Limpiar los campos del formulario
                this.setState({
                    nombre: '',
                    direccion: '',
                    planSeleccionado: '',
                    jefeColegioSeleccionado: '',
                    idPlan: null,
                    id_usuario: null
                });
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
    
                if (status === 404 || status === 409) { 
                    alert(data.message || "La escuela ya existe en la plataforma.");
                } else {
                    alert("Ocurrió un error inesperado. Inténtalo nuevamente.");
                }
            } else {
                alert("No se pudo conectar con el servidor.");
            }
        }
    };

    render() {
        // Valores por defecto
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
                                            className="text-dark"  // COLOR NEGRO PARA LOS TEXTOS DEL DESPLEGABLE
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
                                            key={jefe.id_usuario}
                                            eventKey={JSON.stringify({ id: jefe.id_usuario, nombre: jefe.nombre })}
                                            className="text-dark"  // COLOR NEGRO PARA LOS TEXTOS DEL DESPLEGABLE
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
