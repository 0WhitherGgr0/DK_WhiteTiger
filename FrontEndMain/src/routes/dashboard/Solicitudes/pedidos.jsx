import "../../../styles/panelCRUD.css"
import plusSVG from "../../../assets/plus.svg"
import TableCrud from "../../../components/tableCrud"
import { useNavigate, useLoaderData } from 'react-router-dom';
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;


const heads = [
  {
      id: 'ID Pedido',
      key: "idPedido",
      special: "",
      minWidth: 149,
  },
  {
      id: 'Estado',
      key: "estado",
      special: "",
      minWidth: 150,
  },
  {
      id: 'Peso',
      key: "peso",
      special: "",
      minWidth: 150,
  },
  {
      id: 'Volumen',
      key: "volumen",
      special: "",
      minWidth: 156,
  },
  {
    id: 'Latitud',
    key: "latitud",
    special: "",
    minWidth: 156,
  },
  {
    id: 'Altitud',
    key: "altitud",
    special: "",
    minWidth: 156,
  },
  {
    id: 'Opciones',
    key: "opciones",
    special: "",
    minWidth: 117,},
];

export default function Pedidos() {

  const navigate = useNavigate();
  const {pedidos : initialPedidos = [] } = useLoaderData(); 
  
  const [pedidos, setPedidos] = useState(initialPedidos)

  const rows = pedidos.map((pedido) => (
    {
        peso: pedido.peso,
        volumen: 0,
        estado: Array.isArray(vehiculo.estado) ? pedido.estado : [pedido.estado],
        ubicacion: vehiculo.ubicacion || 'Desconocido',
        idPedido: pedido.pedido_id,
        latitud: pedido.latitud,
        longitud: pedido.longitud
    }
  ));  

  return (
      <div className="panelCRUD">
          <div className="panelCRUD_tittle">
              <h2>Pedidos</h2>
          </div>
          <div className="panelCRUD_options">
              <button className="panelCRUD_button" onClick={() => {
                  navigate("/dashboard/solicitudes/pedidos/nuevoPedido");
              }}>
                  <div className="panelCRUD_icon">
                      <img src={plusSVG} alt="" />
                  </div>
                  Agregar Pedido
              </button>
          </div>
          <TableCrud heads={heads} rows={rows} />
      </div>
  );
}