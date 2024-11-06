import React, { Component } from 'react';
/*import 'index.css'  ARREGLAR ESTO*/
import { Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
class BajaEscuela extends Component {
    constructor(props) {
        super(props);
         this.state =
          { nombre: '',
            direccion: '',  
            id_escuela: null,
            escuelas:[], 
            showModal:false,
            escuelaSeleccionada: '' 
         }; 
           }
    //esto es para rellenar los tipos de plan
    cargarEscuelas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/usuario/getEscuelas');
            //pasar lista de string a objetos
            const escuelas = response.data.map(jefe => ({
                id_escuela: jefe.id_escuela,
                nombre: `${jefe.nombre} ${jefe.direccion}`
            }));
    
            this.setState({ escuelas });

        } catch (error) {
            console.error('Error al cargar las escuelas:', error);
        }
    };

      // Llama a los métodos para cargar datos al montar el componente
      componentDidMount() {
        this.cargarEscuelas();
    }

     // Manejar selección en Dropdown
     handleDropdownChange = (field, value) => {
        const parsedValue = JSON.parse(value);
        this.setState({
            escuelaSeleccionada: parsedValue.nombre,
            id_escuela: parsedValue.id // Update id_usuario state
        });

        console.log("ID de la escuela seleccionada:", parsedValue.id_escuela); // Imprimir en consola

        //console.log("id "+parsedValue.id)
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
                                <label htmlFor="dropdown-basic-button" className="form-label">Colegio</label>
                                <DropdownButton id="dropdown-basic-button"
                                 title="Seleccione un colegio" 
                                 onSelect={(value) => this.handleDropdownChange('escuela', value)}
                                 size="sm">
                                   {this.state.escuelas.map(escuela => (
                                        <Dropdown.Item
                                            key={escuela.id_escuela}
                                            eventKey={JSON.stringify({ id_escuela: escuela.id_escuela, nombre: escuela.nombre })}
                                        >
                                            {escuela.nombre}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>


                            <div className="d-grid gap-2 mb-4">
                                    <i class="fa-solid fa-trash fa-3x"></i>{/* Icono de usuario */}
                            </div>
                        </form>
                    </section>
                </section>
            </section>
        );
    }
}


export default BajaEscuela;