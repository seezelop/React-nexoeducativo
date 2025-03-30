import { useState, useEffect } from "react";
import axios from "axios";

function RealizarPago() {
  const [loading, setLoading] = useState(false);
  const [precio, setPrecio] = useState(null);

  useEffect(() => {
    const fetchPrecio = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/usuario/obtenerInfoCuota", {
          withCredentials: true,
        });
        setPrecio(response.data);
      } catch (error) {
        console.error("Error al obtener el precio:", error);
      }
    };
    fetchPrecio();
  }, []);

  const redirigirAMercadoPago = async () => {
    if (!precio || precio <= 0) {
      alert("El precio no es válido");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/crear-preferencia", {
        items: [{ title: "Cuota Escolar", quantity: 1, unit_price: precio }],
        platform: "web" // Asegurar que use las URLs web
      });

      window.location.href = response.data.init_point; // Redirigir al init_point correcto
      
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar el pago");
      setLoading(false);
    }
  };

  return (
    <section className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="container text-center">
        <h1 className="mb-4">Pago a través de Mercado Pago</h1>
        <p className="mb-5"><strong>Precio:</strong> {precio !== null ? `$${precio}` : "Cargando..."}</p>
        <button 
          className="btn btn-primary" 
          onClick={redirigirAMercadoPago} 
          disabled={loading || !precio}
        >
          {loading ? "Procesando..." : "Pagar con Mercado Pago"}
        </button>
      </div>
    </section>
  );
}

export default RealizarPago;