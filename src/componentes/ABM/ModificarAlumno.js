import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ModificarAlumno = () => {
  const [formData, setFormData] = useState({
    id_usuario: '',
    nombre: '',
    apellido: '',
    dni: '',
    mail: '',
    telefono: '',
    activo: false,
  });

  const [alumnos, setAlumnos] = useState([]);
  const [errores, setErrores] = useState({});
  const [valoresOriginales, setValoresOriginales] = useState({});
  const [profesorSeleccionado, setProfesorSeleccionado] = useState("Seleccione un alumno");

  useEffect(() => {
    cargarAlumnos();
  }, []);

  const cargarAlumnos = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/usuario/verAlumnos`, {
        withCredentials: true,
      });

      const alumnosData = response.data.map(alumno => ({
        id_usuario: alumno.id_usuario,
        nombre: `${alumno.nombre} ${alumno.apellido}`,
      }));

      setAlumnos(alumnosData);
    } catch (error) {
      console.error("Error al cargar los alumnos:", error);
    }
  };

  const validarCampo = (id, value) => {
    let error = "";
    switch (id) {
      case "nombre":
        if (!/^[a-zA-Z]{3,30}$/.test(value)) {
          error = "El nombre debe tener entre 3 y 30 letras.";
        }
        break;
      case "apellido":
        if (!/^[a-zA-Z]{4,30}$/.test(value)) {
          error = "El apellido debe tener entre 4 y 30 letras.";
        }
        break;
      case "dni":
        if (!/^\d{6,8}$/.test(value)) {
          error = "El DNI debe tener entre 6 y 8 dígitos.";
        }
        break;
      case "mail":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Formato de email inválido.";
        }
        break;
      case "telefono":
        if (!/^\d{7,9}$/.test(value)) {
          error = "El teléfono debe tener entre 7 y 9 dígitos.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    const error = validarCampo(id, newValue);

    setFormData({
      ...formData,
      [id]: newValue,
    });

    setErrores({
      ...errores,
      [id]: error,
    });
  };

  const handleDropdownChange = async (value) => {
    try {
      const parsedValue = JSON.parse(value);
      setProfesorSeleccionado(parsedValue.nombre);
      setFormData({ ...formData, id_usuario: parsedValue.id_usuario });

      const response = await axios.get(`http://localhost:8080/api/usuario/getUsuario/${parsedValue.id_usuario}`, {
        withCredentials: true,
      });

      const { nombre, apellido, dni, mail, telefono, activo } = response.data;
      setFormData({
        id_usuario: parsedValue.id_usuario,
        nombre: nombre || "",
        apellido: apellido || "",
        dni: dni || "",
        mail: mail || "",
        telefono: telefono || "",
        activo: activo,
      });

      setValoresOriginales({ nombre, apellido, dni, mail, telefono, activo });
    } catch (error) {
      console.error("Error al cargar los datos del alumno:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.id_usuario) {
      alert("Por favor selecciona un alumno antes de guardar los cambios.");
      return;
    }

    const datosModificados = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== valoresOriginales[key]) {
        datosModificados[key] = formData[key];
      }
    });

    if (Object.keys(datosModificados).length === 0) {
      alert("No hay cambios para actualizar.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:8080/api/usuario/modificarUsuario/${formData.id_usuario}`,
        datosModificados,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Alumno modificado exitosamente!");
        cargarAlumnos();
        setProfesorSeleccionado("Seleccione un alumno");
        setFormData({
          id_usuario: "",
          nombre: "",
          apellido: "",
          dni: "",
          mail: "",
          telefono: "",
          activo: false,
        });
        setValoresOriginales({});
      } else {
        alert("Error al modificar el alumno.");
      }
    } catch (error) {
      console.error("Error al modificar el alumno:", error);
    }
  };

  return (
    <div>
      <h2>Modificar Alumno</h2>
      <DropdownButton title={profesorSeleccionado}>
        {alumnos.map((alumno) => (
          <Dropdown.Item
            key={alumno.id_usuario}
            onClick={() => handleDropdownChange(JSON.stringify(alumno))}
          >
            {alumno.nombre}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control id="nombre" value={formData.nombre} onChange={handleInputChange} />
          <span className="text-danger">{errores.nombre}</span>
        </Form.Group>

        <Form.Group>
          <Form.Label>Apellido</Form.Label>
          <Form.Control id="apellido" value={formData.apellido} onChange={handleInputChange} />
          <span className="text-danger">{errores.apellido}</span>
        </Form.Group>

        <Button type="submit">Modificar</Button>
      </Form>
    </div>
  );
};

export default ModificarAlumno;
