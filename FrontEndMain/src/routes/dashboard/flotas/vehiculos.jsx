import "../../../styles/vehiculos.css"
import plusSVG from "../../../assets/plus.svg"
import TableCrud from "../../../components/tableCrud"
import { useNavigate } from 'react-router-dom';

const heads = [
    {
    id: 'Placa Vehicular',
    key: "placa",
    special: "",
    minWidth: 149,},
    {
    id: 'Capacidad',
    key: "capacidad",
    special: "special",
    minWidth: 112,},
    {
    id: 'Estado',
    key: "estado",
    special: "",
    minWidth: 195,},
    {
    id: 'Ubicación',
    key: "ubicacion",
    special: "special",
    minWidth: 145,},
    {
    id: 'Actualización',
    key: "actualizacion",
    special: "special",
    minWidth: 156,},
    {
    id: 'Opciones',
    key: "opciones",
    special: "",
    minWidth: 117,},
];

const rows = [];

function createData(placa,capacidad,estado,ubicacion,actualizacion){
    return {placa,capacidad,estado,ubicacion,actualizacion};
}

for(let i =0;i<2;i++){
    rows.push( createData(867686,13,["Activo"],"Lima","1m"));
}

export default function Vehiculos(){
    const navigate = useNavigate();
    return (
        <div className="vehiculosBlock">
            <div className="vehiculosBlock_tittle">
                <h2>Vehículos</h2>
            </div>
            <div className="vehiculosBlock_options">
                <button className="vehiculosBlock_button" onClick={()=>{
                    navigate("/dashboard/flotas/vehiculos/nuevoVehiculo");
                }}>
                    <div className="vehiculosBlock_icon">
                        <img src={plusSVG} alt="" />
                    </div>    
                    Agregar Vehiculo
                </button>
            </div>
            <TableCrud heads={heads} rows={rows}/>
        </div>
    )
}