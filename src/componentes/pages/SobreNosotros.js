import React, { Component } from "react";
import { Link } from 'react-router-dom'; // Importamos Link
import Header from '../templates/Header';
import Footer from '../templates/Footer';

class SobreNosotros extends Component {
    render() {
        return (
            <>
           
            <div className="container p-4 pb-0">
                <h1>¿Por qué decidimos fundar Nexo Educativo?</h1>
                <p className="SobreNosotros">
                    En 2024, los estudiantes de la carrera de Analista de Sistemas, Martina Asad y Sebastian Lopez
                    se dieron cuenta de la complejidad de realizar tareas administrativas en los 
                    colegios y la falta de digitalizacion de esa informacion para que este al alcance. 
                    La gente no quería utilizar mucho tiempo para encontrar informacion ni enviar constantemente mails al colegio para resolver
                    dudas o enviar informacion sobre el pago.
                    Entonces, decidimos fundar Nexo Educativo para ayudar a colegios, padres y alumnos a aprovechar
                    la tecnologia para tener todo la informacion necesario en un solo lugar de manera intuitiva.
                </p>
                <p className="SobreNosotros">Desde entonces, Nexo Educativo ha ido más allá de las plataformas
                    educativas actuales convirtiendose en una plataforma simple y enfocada en usuarios de todas
                    las edades ya que nuestro objetivo principal como empresa es realizar un software acorde
                    a las necesidades del negocio y sus potenciales usuarios.</p>
                    </div>
            <Footer />
            </>
        );
    }
}

export default SobreNosotros;