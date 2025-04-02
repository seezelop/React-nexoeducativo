import React, { useState, useEffect } from "react";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const InformacionPago = () => {
  const [infoPago, setInfoPago] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  // Función para obtener la información de pago
  const obtenerInfoPago = async () => {
    try {
      const response = await axios.get("http://localhost:8080/verInfoPago", {
        withCredentials: true, 
      });

      setInfoPago(response.data);
    } catch (err) {
      // Manejar errores
      setError("Error al obtener la información de pago: " + (err.response?.data || err.message));
    } finally {
      // Finalizar la carga
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerInfoPago();
  }, []);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }
  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="pt-5 pb-5">
      <Card>
        <Card.Header as="h5">Información de Pago</Card.Header>
        <Card.Body>
          <Card.Text>{infoPago}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InformacionPago;