import { useNavigate, useLoaderData } from 'react-router-dom';
import plusSVG from "../../../assets/plus.svg";
import TableCrud from "../../../components/tableCrud";
import { useState } from 'react';
import "../../../styles/panelCRUD.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Conductores() {
    const navigate = useNavigate();
    const { conductores: initialConductores = []} = useLoaderData();

    const [conductores, setConductores] = useState(initialConductores);

    const handleEdit = (idConductor) => {
        navigate(`/dashboard/flotas/conductores/formConductoresEdit/${idConductor}`);
    };

    const handleDelete = async (idConductor, vehiculo, estado) => {
        if (!estado || estado !== "Inactivo") {
            alert("Solo los conductores con estado 'Inactivo' pueden ser eliminados.");
            return;
        }

        if (window.confirm("¿Estás seguro de que deseas eliminar este conductor?")) {
            try {
                console.log(`Eliminando conductor con ID: ${idConductor}`);
                
                const response = await fetch(`${API_URL}/conductores/${idConductor}/`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                });

                const response2 = await fetch(`${API_URL}/vehiculos/${vehiculo}/`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ estado: "Inactivo" })
                });

                if (!response.ok || !response2.ok) {
                    throw new Error("Error al eliminar el conductor o actualizar el vehículo.");
                }

                console.log("Conductor eliminado correctamente.");
                setConductores((prevConductores) =>
                    prevConductores.filter((conductor) => conductor.conductor_id !== idConductor)
                );
            } catch (error) {
                console.error("Error al eliminar el conductor:", error);
                alert("Hubo un error al intentar eliminar el conductor. Por favor, inténtalo de nuevo.");
            }
        }
    };

    const heads = [
        { id: 'ID Conductor', key: "idConductor", special: "", minWidth: 100 },
        { id: 'Nombre', key: "nombre", special: "", minWidth: 100 },
        { id: 'Vehículo', key: "vehiculo", special: "", minWidth: 100 },
        { id: 'Estado', key: "estado", special: "", minWidth: 300 },
        { id: 'Opciones', key: "opciones", special: "", minWidth: 117 },
    ];

    const rows = conductores.map((conductor) => {
        // Obtiene el nombre del estado usando el mapeo `estados`

        return {
            idConductor: conductor.conductor_id,
            vehiculo: conductor.vehiculo_placa || "Sin vehículo asignado",
            nombre: conductor.nombre || "Sin nombre",
            estado: conductor.conductor_estado || "Desconocido",
        };
    });

    console.log("Filas de la tabla:", rows); // Depuración para confirmar los valores

    return (
        <div className="panelCRUD">
            <div className="panelCRUD_tittle">
                <h2>Conductores</h2>
            </div>
            <div className="panelCRUD_options">
                <button className="panelCRUD_button" onClick={() => {
                    navigate("/dashboard/flotas/conductores/nuevoConductor");
                }}>
                    <div className="panelCRUD_icon">
                        <img src={plusSVG} alt="" />
                    </div>
                    Agregar Conductor
                </button>
            </div>
            <TableCrud 
                heads={heads} 
                rows={rows} 
                onEdit={handleEdit} 
                onDelete={(idConductor, vehiculo) => {
                    const conductor = conductores.find(c => c.conductor_id === idConductor);
                    handleDelete(idConductor, vehiculo, conductor?.estado);
                }} 
            />
        </div>
    );
}
