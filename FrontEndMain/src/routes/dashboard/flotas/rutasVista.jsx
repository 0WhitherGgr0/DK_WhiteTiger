import { useNavigate, useLoaderData } from 'react-router-dom';
import TableCrud from "../../../components/tableCrud";
import { useState } from 'react';
import "../../../styles/panelCRUD.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Conductores() {
    const { recorridos: initialRecorridos = []} = useLoaderData();

    const [recorridos, setRecorridos] = useState(initialRecorridos);
    console.log(recorridos)
    const heads = [
        { id: 'Conductor', key: "nombre", special: "", minWidth: 100 },
        { id: 'Vehículo', key: "vehiculo", special: "", minWidth: 100 },
        { id: 'Estado', key: "estado", special: "", minWidth: 300 },
        { id: 'Carga', key: "carga", special: "", minWidth: 117 },
        { id: 'Distancia', key: "distancia", special: "", minWidth: 117 },
        { id: 'Opciones', key: "opciones", special: "", minWidth: 117 },
    ];

    const rows = recorridos.map((recorrido) => {
        // Obtiene el nombre del estado usando el mapeo `estados`
        return {
            nombre: recorrido.usuario_asociado,
            vehiculo: recorrido.vehiculo_id || "Sin vehículo asignado",
            estado: recorrido.estado_nombre || "Sin nombre",
            carga: recorrido.recorrido_carga || "Desconocido",
            distancia: recorrido.recorrido_distancia || "Desconocido",
        };
    });

    console.log("Filas de la tabla:", rows); // Depuración para confirmar los valores

    return (
        <div className="panelCRUD">
            <div className="panelCRUD_tittle">
                <h2>Rutas</h2>
            </div>
            <TableCrud 
                heads={heads} 
                rows={rows} 
            />
        </div>
    );
}
