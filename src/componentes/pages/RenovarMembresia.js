import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

const RenovarMembresia = () => {
  const [planes, setPlanes] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanes = async () => {
      const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
      });
      
      try {
        const response = await api.get("/api/usuario/getInfoPlanes", {
          withCredentials: true,
        });
        setPlanes(response.data);
      } catch (error) {
        console.error("Error al cargar los planes:", error);
        alert("Error al cargar los planes.");
      }
    };
    fetchPlanes();
  }, []); // Se mantiene vacío porque 'api' no es necesario en las dependencias

  const handleRenovacion = async (renovar) => {
    if (!selectedPlan && renovar) {
      alert("Por favor, selecciona un plan.");
      return;
    }
    
    setLoading(true);
    try {
      const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
      });
      const response = await api.post(
        "/api/usuario/renovarMembresia", 
        { 
          idPlan: renovar ? parseInt(selectedPlan) : 0, 
          renovo: renovar 
        }, 
        {
          withCredentials: true,
        }
      );
      
      if (response.status === 200) {
        if (renovar) {
          alert("Tu solicitud para renovar la membresia ha ingresado al sistema");
        } else {
          alert("Todos los usuarios de su escuela han sido desactivados debido a que decidio no renovar su membresia");
        }
        navigate('/JefeColegio');
      } else {
        alert("Hubo un problema al procesar la solicitud.");
      }
    } catch (error) {
      console.error("Error en la operación:", error);
      alert("Hubo un error al procesar su solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Renovar Membresía</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Selecciona el tipo de plan</Form.Label>
          <Form.Select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
          >
            <option value="">Seleccione un plan</option>
            {planes.map((plan) => (
              <option key={plan.idPlan} value={plan.idPlan}>
                {plan.descripcion}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        
        <Row className="mb-5">
          <Col>
            <Button 
              variant="success" 
              disabled={loading} 
              onClick={() => handleRenovacion(true)}
              className="w-100"
            >
              {loading ? "Procesando..." : "Renovar Membresía"}
            </Button>
          </Col>
          <Col>
            <Button 
              variant="danger" 
              disabled={loading} 
              onClick={() => handleRenovacion(false)}
              className="w-100"
            >
              {loading ? "Procesando..." : "No Renovar"}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RenovarMembresia;
