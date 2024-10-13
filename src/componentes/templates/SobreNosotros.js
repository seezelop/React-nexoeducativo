import React, { Component } from "react";
import { Link } from 'react-router-dom'; // Importamos Link

class SobreNosotros extends Component {
    render() { // Faltaba el método render()
        return (
            <>
                <h1>¿Por qué decidimos fundar Nexo Educativo?</h1>
                <p>
                    En 2004, cuando eran compañeros de posgrado en el MIT, Brian Halligan y Dharmesh Shah
                    se dieron cuenta de que la manera de comprar estaba cambiando. La gente no quería estar 
                    recibiendo publicidad constantemente, quería información útil. En 2006, fundaron HubSpot 
                    para ayudar a las empresas a aprovechar ese cambio para crecer mejor con el inbound marketing.
                </p>
            </>
        );
    }
}

export default SobreNosotros;
