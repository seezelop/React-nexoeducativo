import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";

function Padre() {
  const [searchParams] = useSearchParams();
  const [estadoPago, setEstadoPago] = useState('');
  const [precio, setPrecio] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const status = searchParams.get("status");
    setEstadoPago(status || ''); // Siempre actualiza el estado

    if (status === "approved") {
      obtenerPrecioYGenerarComprobante();
    }
  }, [searchParams]); // Se ejecuta con cada cambio en la URL

  const obtenerPrecioYGenerarComprobante = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/usuario/obtenerInfoCuota", {
        withCredentials: true,
      });
      
      setPrecio(response.data);
      if (response.data) {
        generarComprobante(response.data);
      }
    } catch (error) {
      console.error("Error al obtener la información:", error);
    }
  };

  const generarComprobante = async (importe) => {
    try {
      await axios.post(
        "http://localhost:8080/api/usuario/generarComprobante",
        { importe },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error al generar comprobante:", error);
    }
  };

  return (
    <section className="d-flex flex-column min-vh-100 pt-5">
      <div className="container flex-grow-1">
        <h1 className="mb-4 text-white">Bienvenido Padre</h1>
        {estadoPago === "approved" && (
          <p className="text-white fs-4">✅ El pago fue aprobado, y estás al día con la cuota.</p>
        )}
        {estadoPago === "rejected" && (
          <p className="text-danger fs-4">❌ El pago fue rechazado. Por favor, intenta nuevamente.</p>
        )}
      </div>
    </section>
  );
}

export default Padre;