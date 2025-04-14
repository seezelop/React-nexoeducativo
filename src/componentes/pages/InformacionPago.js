import React, { useState, useEffect, useCallback } from "react";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const InformacionPago = () => {
  const [infoPago, setInfoPago] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const obtenerInfoPago = useCallback(async () => {
    try {
      const response = await api.get("/verInfoPago", {
        withCredentials: true, 
      });

      setInfoPago(response.data);
    } catch (err) {
      setError("Error al obtener la información de pago: " + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  },[api]);

  useEffect(() => {
    obtenerInfoPago();
  }, [obtenerInfoPago]); // Agregamos 'obtenerInfoPago' como dependencia

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
