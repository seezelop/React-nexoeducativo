import React from 'react';

function RealizarPago() {
  const redirigirAMercadoPago = () => {
    // Aquí reemplaza con la URL de tu preferencia en Mercado Pago
    window.location.href = 'https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=TU_PREFERENCE_ID';
  };

  return (
    <section className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="container text-center">
        <h1 className="mb-4">Pago a través de Mercado Pago</h1>
        <p className="mb-5">Estás a punto de realizar un pago seguro a través de Mercado Pago. Por favor, haz clic en "Continuar" para proceder.</p>
        <button className="btn btn-primary" onClick={redirigirAMercadoPago}>
          Continuar con Mercado Pago
        </button>
      </div>
    </section>
  );
}

export default RealizarPago;
