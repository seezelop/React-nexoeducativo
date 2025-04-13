import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Spinner, Alert } from "react-bootstrap";

function VerNovedades() {
  const [novedades, setNovedades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

  useEffect(() => {
    const cargarNovedades = async () => {
      try {
        const response = await api.get("/verNovedades", {
          withCredentials: true,
        });

        if (response.status === 204) {
          setError("No hay novedades disponibles.");
        } else {
          setNovedades(response.data);
        }
      } catch (err) {
        setError("Error al cargar las novedades.");
      } finally {
        setCargando(false);
      }
    };

    cargarNovedades();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Últimas Novedades</h2>

      {cargando && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="warning">{error}</Alert>}

      {novedades.map((novedad, index) => (
        <Card key={index} className="mb-3 shadow-sm">
          <Card.Body>
            <Card.Text>{novedad.contenido}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default VerNovedades;
