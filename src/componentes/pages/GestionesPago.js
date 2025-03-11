import React, { useState } from "react";

const GestionesPago = () => {
  const [infoPago, setInfoPago] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setInfoPago(e.target.value);
  };

  const handleSubmit = async (tipo) => {
    const endpoint =
      tipo === "subir"
        ? "http://localhost:8080/api/usuario/SubirInfoPago"
        : "http://localhost:8080/api/usuario/EdtarInfoPago";

    if (infoPago.length < 10 || infoPago.length > 255) {
      setMensaje("El texto debe tener entre 10 y 255 caracteres.");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ infoPago }),
      });

      if (response.ok) {
        setMensaje(`Información de pago ${tipo === "subir" ? "subida" : "editada"} correctamente.`);
      } else {
        setMensaje("Hubo un error, inténtalo nuevamente.");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Gestiones de Pago</h2>
      <textarea
        className="form-control"
        placeholder="Ingrese la información del pago..."
        value={infoPago}
        onChange={handleChange}
        rows="5"
      ></textarea>
      <div className="mt-3">
        <button className="btn btn-success me-2" onClick={() => handleSubmit("subir")}>
          Subir Información
        </button>
        <button className="btn btn-warning" onClick={() => handleSubmit("editar")}>
          Editar Información
        </button>
      </div>
      {mensaje && <p className="mt-3 alert alert-info">{mensaje}</p>}
    </div>
  );
};

export default GestionesPago;
