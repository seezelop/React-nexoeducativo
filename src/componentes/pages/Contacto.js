import React, { Component } from 'react'
import Footer from '../templates/Footer'

class Contacto extends Component{
    render(){
        return(
            <>
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email: </label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ingresa tu mail">
            </div>
            <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Comentarios</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

            <Footer />
            </>
        )
    }
}
export default Contacto;