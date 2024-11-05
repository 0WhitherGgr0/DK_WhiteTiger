import { useNavigate, useLoaderData } from 'react-router-dom';
import plusSVG from "../../../assets/plus.svg";
import TableCrud from "../../../components/tableCrud";
import { useState } from 'react';
import "../../../styles/panelCRUD.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Conductores() {
    const navigate = useNavigate();
    const { conductores: initialConductores = [] } = useLoaderData();

    const [conductores, setConductores] = useState(initialConductores);

    const handleEdit = (idConductor) => {
        navigate(`/dashboard/flotas/conductores/formConductoresEdit/${idConductor}`);
    };

    const handleDelete = async (idConductor) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este conductor?")) {
            try {
                console.log(`Eliminando conductor con ID: ${idConductor}`);
                
                const response = await fetch(`${API_URL}/conductores/${idConductor}/`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error al eliminar el conductor. Estado: ${response.status}, Error: ${errorText}`);
                }

                console.log("Conductor eliminado correctamente.");

                setConductores(prevConductores => prevConductores.filter(conductor => conductor.usuario !== idConductor));
            } catch (error) {
                console.error("Error al eliminar el conductor:", error);
                alert("Hubo un error al intentar eliminar el conductor. Por favor, inténtalo de nuevo.");
            }
        }
    };

    const heads = [
        { id: 'ID Conductor', key: "idConductor", special: "", minWidth: 149 },
        { id: 'Nombre', key: "nombre", special: "", minWidth: 200 },
        { id: 'Estado', key: "estado", special: "", minWidth: 150 },
        { id: 'Categoría', key: "categoria", special: "", minWidth: 150 },
        { id: 'Actualización', key: "actualizacion", special: "", minWidth: 156 },
        { id: 'Opciones', key: "opciones", special: "", minWidth: 117 },
    ];

    const rows = conductores.map(conductor => ({
        idConductor: conductor.usuario,
        nombre: conductor.nombre,
        estado: Array.isArray(conductor.estado) ? conductor.estado : [conductor.estado],
        categoria: conductor.categoria,
        actualizacion: conductor.actualizacion,
    }));

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
            <TableCrud heads={heads} rows={rows} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
}
