import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const RenovarMembresia = () => {
  const [planes, setPlanes] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Para redirigir después de la acción

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/usuario/getInfoPlanes", {
          withCredentials: true,
        });
        setPlanes(response.data);  // Guardamos los planes obtenidos
      } catch (error) {
        console.error("Error al cargar los planes:", error);
        alert("Error al cargar los planes.");
      }
    };
    fetchPlanes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan) {
      alert("Por favor, selecciona un plan.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/usuario/renovarMembresia", { plan: selectedPlan }, {
        withCredentials: true,
      });
      console.log('infoo: '+response.data)
      if (response.status === 200) {
        alert("Membresía renovada exitosamente.");
        navigate('/JefeColegio');  // Redirige a la página de jefe colegio después de renovar membresia
      } else {
        alert("Hubo un problema al renovar la membresía.");
      }
    } catch (error) {
      console.error("Error al renovar la membresía:", error);
      alert("Hubo un error en la renovación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Renovar Membresía</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Selecciona el tipo de plan</Form.Label>
          <Form.Select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            required
          >
            <option value="">Seleccione un plan</option>
            {planes.map((plan) => (
              <option key={plan.idPlan} value={plan.idPlan}>
                {plan.descripcion}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="success" disabled={loading} className="mb-5"> {/* Añade la clase 'mb-5' */}
          {loading ? "Procesando..." : "Renovar Membresía"}
        </Button>
      </Form>
    </div>
  );
};

export default RenovarMembresia;