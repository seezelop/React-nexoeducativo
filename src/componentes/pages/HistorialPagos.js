import React, { useEffect, useState } from "react";
import axios from "axios";

const HistorialPagos = () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    obtenerHistorial();
  }, []);

  const obtenerHistorial = async () => {
    try {
      const response = await axios.get("http://localhost:5000/ver-historial-pagos");
      setHistorial(response.data);
    } catch (error) {
      console.error("Error al obtener el historial de pagos", error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Historial de Pagos</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Detalle</th>
            <th>Monto</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((pago, index) => (
            <tr key={index}>
              <td>{pago.fecha}</td>
              <td>{pago.detalle}</td>
              <td>${pago.monto}</td>
              <td>{pago.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialPagos;
