import React, { Component } from "react";

class SobreNosotros extends Component {
    render() {
        return (
            <>
                <div className="container p-4 pb-0">
                    <h1 className="text-center mb-4 text-white">¿Por qué decidimos fundar Nexo Educativo?</h1>
                    <div className="card mb-4"> {/* Tarjeta envolvente con margen inferior */}
                        <div className="card-body">
                            <p className="SobreNosotros">
                                En 2024, los estudiantes de la carrera de Analista de Sistemas, Martina Asad y Sebastian Lopez
                                se dieron cuenta de la complejidad de realizar tareas administrativas en los
                                colegios y la falta de digitalización de esa información para que esté al alcance.
                                La gente no quería utilizar mucho tiempo para encontrar información ni enviar constantemente mails al colegio para resolver
                                dudas o enviar información sobre el pago.
                                Entonces, decidimos fundar Nexo Educativo para ayudar a colegios, padres y alumnos a aprovechar
                                la tecnología para tener toda la información necesaria en un solo lugar de manera intuitiva.
                            </p>
                            <p className="SobreNosotros">
                                Desde entonces, Nexo Educativo ha ido más allá de las plataformas
                                educativas actuales convirtiéndose en una plataforma simple y enfocada en usuarios de todas
                                las edades, ya que nuestro objetivo principal como empresa es realizar un software acorde
                                a las necesidades del negocio y sus potenciales usuarios.
                            </p>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default SobreNosotros;
