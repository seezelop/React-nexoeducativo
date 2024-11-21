import React from 'react';

class ModificarUsuario extends React.Component {
  render() {
    return (
      <section className="d-flex flex-column">
        <section className="container d-flex justify-content-center align-items-center flex-grow-1">
          <section className="col-md-8 mb-5">
            <div className="card shadow-sm">
              <div className="card-body">
                <form>
                  <div className="row">
                    {/* Campo para el Nombre */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="nombre" className="form-label">Nombre:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre2"
                        placeholder="Ingresa el nuevo nombre"
                        required
                      />
                    </div>

                    {/* Campo para el Apellido */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="apellido" className="form-label">Apellido:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="apellido2"
                        placeholder="Ingresa el nuevo apellido"
                        required
                      />
                    </div>
                  </div>

                  {/* Campo para el Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email2"
                      placeholder="Ingresa el nuevo email"
                      required
                    />
                  </div>

                  {/* Campo para la Dirección */}
                  <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="direccion2"
                      placeholder="Ingresa la nueva dirección"
                      required
                    />
                  </div>

                  {/* Botón de acción */}
                  <div className="d-grid gap-2 mb-4">
                    <button type="submit" className="btn btn-primary btn-lg">Editar Jefe de Colegio</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </section>
      </section>
    );
  }
}

export default ModificarUsuario;
