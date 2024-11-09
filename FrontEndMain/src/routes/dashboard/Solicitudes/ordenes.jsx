import "../../../styles/panelCRUD.css"
import plusSVG from "../../../assets/plus.svg"
import TableCrud from "../../../components/tableCrud"
import { useNavigate, useLoaderData } from 'react-router-dom';
import { useState } from "react";


const heads = [
    {
        id: 'ID Envio',
        key: "idEnvio",
        special: "",
        minWidth: 149,
    },
    {
        id: 'Registro',
        key: "registro",
        special: "",
        minWidth: 150,
    },
    {
        id: 'Estado',
        key: "estado",
        special: "",
        minWidth: 150,
    },
    {
        id: 'ID Pedido',
        key: "idPedido",
        special: "",
        minWidth: 156,
    },
    {
      id: 'ID Recorrido',
      key: "idRecorrido",
      special: "",
      minWidth: 156,
    },

];


export default function Ordenes(){


    const rows = [];

    return (
        <div className="panelCRUD">
          <div className="panelCRUD_tittle">
              <h2>Ordenes</h2>
          </div>
          <div className="panelCRUD_options">
              <button className="panelCRUD_button" onClick={() => {
                  
              }}>
                  <div className="panelCRUD_icon">
                      <img src={plusSVG} alt="" />
                  </div>
                  Crear Ordenes
              </button>
          </div>
          <TableCrud heads={heads} rows={rows} />
      </div>
    )

}