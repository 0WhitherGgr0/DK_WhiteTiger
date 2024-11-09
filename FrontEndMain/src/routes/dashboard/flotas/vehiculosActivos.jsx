import "../../../styles/panelCRUD.css";
import plusSVG from "../../../assets/plus.svg";
import TableCrud from "../../../components/tableCrud";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const heads = [
    { id: "Placa Vehicular", key: "placa", special: "", minWidth: 149 },
    { id: "Capacidad", key: "capacidad", special: "special", minWidth: 112 },
    { id: "Estado", key: "estado", special: "", minWidth: 150 },
    { id: "Ubicación", key: "ubicacion", special: "special", minWidth: 145 },
    { id: "Actualización", key: "actualizacion", special: "special", minWidth: 156 },
    { id: "Opciones", key: "opciones", special: "", minWidth: 117 },
];

export default function VehiculosActivos() {
    const navigate = useNavigate();
    const { vehiculos: initialVehiculos = [] } = useLoaderData();

    // Filtrar solo los vehículos con estado "Activo"
    const [vehiculos, setVehiculos] = useState(
        initialVehiculos.filter((vehiculo) => vehiculo.estado === "Activo")
    );

    // Mapear datos para las filas de la tabla
    const rows = vehiculos.map((vehiculo) => ({
        placa: vehiculo.placa,
        capacidad: vehiculo.capacidad,
        estado: vehiculo.estado, // `estado` es una cadena, no un array
        ubicacion: vehiculo.ubicacion || "Desconocido",
        actualizacion: vehiculo.actualizacion || "N/A",
    }));    

    // Función para manejar la edición de un vehículo
    const handleEdit = (placa) => {
        navigate(`/dashboard/flotas/vehiculos/formVehiculoEdit/${placa}`);
    };

    // Lógica simplificada de eliminación (los vehículos mostrados son siempre activos)
    const handleDelete = async (placa) => {
        alert("Los vehículos activos no pueden ser eliminados.");
    };

    return (
        <div className="panelCRUD">
            <div className="panelCRUD_tittle">
                <h2>Vehículos Activos</h2>
            </div>
            <div className="panelCRUD_options">
                <button
                    className="panelCRUD_button"
                    onClick={() => navigate("/dashboard/flotas/vehiculos/nuevoVehiculo")}
                >
                    <div className="panelCRUD_icon">
                        <img src={plusSVG} alt="" />
                    </div>
                    Agregar Vehículo
                </button>
            </div>
            <TableCrud
                heads={heads}
                rows={rows}
                onEdit={handleEdit}
                onDelete={(placa) => {
                    const row = rows.find((vehiculo) => vehiculo.placa === placa);
                    handleDelete(placa, row?.estado);
                }}
            />
        </div>
    );
}
