import { useState } from "react";

const FormularioCuota = () => {
    const [formData, setFormData] = useState({
        monto: "",
        jornada: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.monto || !formData.jornada) {
            alert("Todos los campos son obligatorios");
            return;
        }

        console.log('LO QUE SE ENVIA COMO JORNADA: ' + formData.jornada);
        const url = "http://localhost:8080/api/usuario/altaCuota"; // Ajusta la URL

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", 
                body: JSON.stringify({
                    monto: formData.monto,
                    jornada: formData.jornada
                })
            });

            if (response.ok) {
                const message = await response.text(); 
                alert(message);
                setFormData({ monto: "", jornada: "" });
            } else {
                const errorData = await response.text();
                console.error("Error en la solicitud:", errorData);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!formData.monto || !formData.jornada) {
            alert("Todos los campos son obligatorios para modificar la cuota");
            return;
        }

        console.log('MODIFICANDO CUOTA PARA JORNADA: ' + formData.jornada);
        const url = `http://localhost:8080/api/usuario/modificarCuota/${formData.jornada}`;

        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(formData.monto) // Se envía solo el monto como pide el backend
            });

            if (response.ok) {
                const message = await response.text(); 
                alert(message);
                setFormData({ monto: "", jornada: "" });
            } else {
                const errorData = await response.text();
                console.error("Error en la solicitud:", errorData);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Gestión de Cuotas</h2>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Monto:</label>
                        <input
                            type="number"
                            name="monto"
                            className="form-control"
                            value={formData.monto}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Jornada:</label>
                        <select
                            name="jornada"
                            className="form-select"
                            value={formData.jornada}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Seleccione una opción</option>
                            <option value="simple">Simple</option>
                            <option value="completa">Completa</option>
                        </select>
                    </div>

                    {/* Botón para registrar */}
                    <div className="d-grid mb-2">
                        <button type="submit" className="btn btn-success" onClick={handleSubmit}>
                            Registrar Cuota
                        </button>
                    </div>

                    {/* Botón para modificar */}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-secondary" onClick={handleUpdate}>
                            Modificar Cuota
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioCuota;
