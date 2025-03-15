import { useState, useEffect } from "react";
import axios from "axios";

function RealizarPago() {
  const [loading, setLoading] = useState(false);
  const [detalle, setDetalle] = useState("Cuota Escolar");
  const [precio, setPrecio] = useState(null); // Inicialmente vacío

  // Cargar el precio desde el backend
  useEffect(() => {
    const fetchPrecio = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/usuario/obtenerInfoCuota", {
          withCredentials: true, // Para enviar cookies de sesión si es necesario
        });

        setPrecio(response.data); // Establece el precio con el valor recibido del backend
      } catch (error) {
        console.error("Error al obtener la información de la cuota:", error);
      }
    };

    fetchPrecio();
  }, []);

  const redirigirAMercadoPago = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/crear-preferencia", {
        items: [
          {
            title: detalle, // Detalle fijo
            quantity: 1,
            unit_price: precio, // Precio desde el backend
          },
        ],
      });

      const { preferenceId } = response.data;
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=${preferenceId}`;
    } catch (error) {
      console.error("Error al crear la preferencia", error);
      setLoading(false);
    }
  };

  return (
    <section className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="container text-center">
        <h1 className="mb-4">Pago a través de Mercado Pago</h1>
        <p className="mb-3"><strong>Detalle:</strong> {detalle}</p>
        <p className="mb-5"><strong>Precio:</strong> {precio !== null ? `$${precio}` : "Cargando..."}</p>
        <button className="btn btn-primary" onClick={redirigirAMercadoPago} disabled={loading || precio === null}>
          {loading ? "Cargando..." : "Continuar con Mercado Pago"}
        </button>
      </div>
    </section>
  );
}

export default RealizarPago;
