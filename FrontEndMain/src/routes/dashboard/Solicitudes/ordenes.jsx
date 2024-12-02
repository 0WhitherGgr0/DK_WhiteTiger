import { useNavigate, useLoaderData } from 'react-router-dom';
import TableCrud from "../../../components/tableCrud";
import { useState } from 'react';
import "../../../styles/panelCRUD.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Conductores() {
    const { envios: initialEnvios = []} = useLoaderData();

    const [envios, setEnvios] = useState(initialEnvios);
    console.log(envios)
    const heads = [
        { id: 'ID', key: "id", special: "", minWidth: 100 },
        { id: 'Estado', key: "estado", special: "", minWidth: 100 },
        { id: 'Registro', key: "registro", special: "", minWidth: 100 },
        { id: 'Recorrido ID', key: "recorrido", special: "", minWidth: 300 },
        { id: 'Pedido ID', key: "pedido", special: "", minWidth: 117 },
        { id: 'Opciones', key: "opciones", special: "", minWidth: 117 },
    ];

    const rows = envios.map((envio) => {
        // Obtiene el nombre del estado usando el mapeo `estados`
        return {
            id: envio.envio_id,
            estado: envio.estado_nombre || "Desconocido",
            registro: envio.envio_registro || "Sin vehículo asignado",
            recorrido: envio.recorrido_id || "Sin nombre",
            pedido: envio.pedido_id || "Desconocido",
        };
    });

    console.log("Filas de la tabla:", rows); // Depuración para confirmar los valores

    return (
        <div className="panelCRUD">
            <div className="panelCRUD_tittle">
                <h2>Ordenes</h2>
            </div>
            <TableCrud 
                heads={heads} 
                rows={rows} 
            />
        </div>
    );
}
