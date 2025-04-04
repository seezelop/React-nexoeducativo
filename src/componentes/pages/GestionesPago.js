import React, { useState } from "react";

const GestionesPago = () => {
  const [infoPago, setInfoPago] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Maneja cambios en el textarea
  const handleChange = (e) => {
    setInfoPago(e.target.value);
  };

  // Maneja la solicitud HTTP - simplificado solo para subir
  const handleSubmit = async () => {
    const endpoint = "http://localhost:8080/api/usuario/subirInfoPago";

    // Validación de longitud del texto
    if (infoPago.length < 10 || infoPago.length > 255) {
      setMensaje("El texto debe tener entre 10 y 255 caracteres.");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include", // Incluye cookies si es necesario
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(infoPago), // Enviamos directamente el string
      });

      if (response.ok) {
        setMensaje("Información de pago subida correctamente.");
      } else {
        const errorData = await response.json(); // Intenta obtener detalles del error
        setMensaje(errorData.message || "Hubo un error, inténtalo nuevamente.");
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
        {/* Solo botón para subir información */}
        <button
          className="btn btn-success mb-5"
          onClick={handleSubmit}
        >
          Subir Información
        </button>
      </div>

      {/* Mensaje de retroalimentación */}
      {mensaje && (
        <p
          className={`mt-3 alert ${
            mensaje.includes("correctamente") ? "alert-success" :
            mensaje.includes("error") ? "alert-danger" : "alert-info"
          }`}
        >
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default GestionesPago;