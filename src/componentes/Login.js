import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="col-md-6"> {/* Esto limita el tamaño del formulario */}
          <h2 className="text-center my-4">Iniciar sesión</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input type="email" className="form-control" id="email" placeholder="Ingrese su correo" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
