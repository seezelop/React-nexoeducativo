import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RealizarPago() {
  const [loading, setLoading] = useState(false);
  const [detalle, setDetalle] = useState("Cuota escolar");
  const [precio, setPrecio] = useState(5000);

  // Cargar los datos guardados por el administrativo
  useEffect(() => {
    const detalleGuardado = localStorage.getItem("detalleCuota");
    const precioGuardado = localStorage.getItem("precioCuota"); //establecerpreciocuota.js

    if (detalleGuardado && precioGuardado) {
      setDetalle(detalleGuardado);
      setPrecio(Number(precioGuardado));
    }
  }, []);

  const redirigirAMercadoPago = async () => {
    setLoading(true);
    try {
      // Enviar los datos cargados al backend
      const response = await axios.post('http://localhost:5000/crear-preferencia', {
        items: [
          {
            title: detalle,    // Detalle ingresado por el administrativo
            quantity: 1,
            unit_price: precio, // Precio ingresado por el administrativo
          },
        ],
      });

      const { preferenceId } = response.data;
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=${preferenceId}`;
    } catch (error) {
      console.error('Error al crear la preferencia', error);
      setLoading(false);
    }
  };

  return (
    <section className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="container text-center">
        <h1 className="mb-4">Pago a través de Mercado Pago</h1>
        <p className="mb-3"><strong>Detalle:</strong> {detalle}</p>
        <p className="mb-5"><strong>Precio:</strong> ${precio}</p>
        <button className="btn btn-primary" onClick={redirigirAMercadoPago} disabled={loading}>
          {loading ? 'Cargando...' : 'Continuar con Mercado Pago'}
        </button>
      </div>
    </section>
  );
}

export default RealizarPago;
