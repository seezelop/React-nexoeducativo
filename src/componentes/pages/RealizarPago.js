import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function RealizarPago() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [precio, setPrecio] = useState(null);
  const [estadoPago, setEstadoPago] = useState('');
  const [pagosAlDia, setPagosAlDia] = useState(false);
  const [verificando, setVerificando] = useState(true);

  
  const api = axios.create({
     baseURL: process.env.REACT_APP_API_URL,
   });

  useEffect(() => {
    const verificarEstadoPagos = async () => {
      setVerificando(true);
      try {
        // Verificar si el padre ya está al día con los pagos
        const pagosResponse = await api.get("/api/usuario/siPago", {
          withCredentials: true,
          timeout: 10000 //viendo si se arregla
        });
        
        // Verificar si todos los elementos en la lista son iguales a 1
        const todosAlDia = Array.isArray(pagosResponse.data) && 
                         pagosResponse.data.length > 0 && 
                         pagosResponse.data.every(valor => valor === 1);
        
        setPagosAlDia(todosAlDia);
        
        if (todosAlDia) {
          // Si está al día, actualizar estado de pago a "approved"
          setEstadoPago("approved");
        } else {
          // Si no está al día, verificar el estado del pago de la URL
          const status = searchParams.get("status");
          setEstadoPago(status || '');
          
          // Obtener el precio de la cuota si no está al día
          await fetchPrecio();
        }
      } catch (error) {
        console.error("Error al verificar estado de pagos:", error);
        // En caso de error, verificar el parámetro de la URL
        const status = searchParams.get("status");
        setEstadoPago(status || '');
        await fetchPrecio();
      } finally {
        setVerificando(false);
      }
    };

    const fetchPrecio = async () => {
      try {
        const response = await api.get("/api/usuario/obtenerInfoCuota", {
          withCredentials: true,
        });
        setPrecio(response.data);
      } catch (error) {
        console.error("Error al obtener el precio:", error);
      }
    };

    verificarEstadoPagos();
  }, [searchParams, api]);

  const redirigirAMercadoPago = async () => {
    if (!precio || precio <= 0) {
      alert("El precio no es válido");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/crear-preferencia", {
        items: [{ title: "Cuota Escolar", quantity: 1, unit_price: precio }],
        platform: "web" // Asegurar que use las URLs web
      });

      console.log('INFO RESPONSE: '+response.data)
      window.location.href = response.data.init_point; // Redirigir al init_point correcto
      
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar el pago");
      setLoading(false);
    }
  };

  return (
    <section className="d-flex flex-column align-items-center justify-content-start min-vh-100 pt-5">
      <div className="container">
        <div className="card shadow-lg rounded-4 p-5 mx-auto" style={{ maxWidth: "550px" }}>
          <div className="card-body text-center">
            <h1 className="card-title text-primary fs-2 mb-4">Pago de Cuota Escolar</h1>
  
            {verificando ? (
              <p className="text-secondary fs-5">Verificando estado de pagos...</p>
            ) : (
              <>
                {pagosAlDia && (
                  <div className="alert alert-success fs-5 mb-3">
                    ✅ Estás al día con tu cuota escolar.
                  </div>
                )}
  
                {!pagosAlDia && (
                  <>
                    {estadoPago === "approved" && (
                      <div className="alert alert-success fs-5 mb-3">
                        ✅ El pago fue aprobado correctamente.
                      </div>
                    )}
                    {estadoPago === "rejected" && (
                      <div className="alert alert-danger fs-5 mb-3">
                        ❌ El pago fue rechazado. Por favor, intenta nuevamente.
                      </div>
                    )}
  
                    {estadoPago !== "approved" && (
                      <>
                        <p className="text-dark fs-5 mb-4">
                          <strong>Precio:</strong>{" "}
                          {precio !== null ? `$${precio}` : "Cargando..."}
                        </p>
  
                        <button
                          className="btn btn-primary btn-lg w-100 fs-5"
                          onClick={redirigirAMercadoPago}
                          disabled={loading || !precio}
                        >
                          {loading ? "Procesando..." : "Pagar con Mercado Pago"}
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RealizarPago;