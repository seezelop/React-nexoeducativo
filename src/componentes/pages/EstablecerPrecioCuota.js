import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EstablecerPrecioCuota = () => {
  const [detalle, setDetalle] = useState("");
  const [precio, setPrecio] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Guardar los datos en localStorage
    localStorage.setItem("detalleCuota", detalle);
    localStorage.setItem("precioCuota", precio);

    // Mostrar notificación
    alert("La información de la cuota fue actualizada correctamente.");

    // Redirigir al panel Administrativo
    navigate("/Administrativo");
  };

  return (
    <div className="container">
      <h1>Establecer Precio Cuota</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="detalle" className="form-label">Detalle</label>
          <input
            type="text"
            className="form-control"
            id="detalle"
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Establecer Precio
        </button>
      </form>
    </div>
  );
};

export default EstablecerPrecioCuota;
