// RealizarPago.js
import React, { useState } from 'react';
import axios from 'axios';

function RealizarPago() {
  const [loading, setLoading] = useState(false);

  const redirigirAMercadoPago = async () => {
    setLoading(true);
    try {
      // Realizar la solicitud para crear la preferencia
      const response = await axios.post('http://localhost:5000/crear-preferencia', {
        items: [
          {
            title: 'Cuota escolar',
            quantity: 1,
            unit_price: 5000,
          },
        ],
      });

      // Obtener el preferenceId
      const { preferenceId } = response.data;

      // Redirigir a Mercado Pago con el preferenceId
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
        <p className="mb-5">Estás a punto de realizar un pago seguro a través de Mercado Pago. Por favor, haz clic en "Continuar" para proceder.</p>
        <button className="btn btn-primary" onClick={redirigirAMercadoPago} disabled={loading}>
          {loading ? 'Cargando...' : 'Continuar con Mercado Pago'}
        </button>
      </div>
    </section>
  );
}

export default RealizarPago;
