import '../../../styles/panel.css'
import usersSVG from "../../../assets/users.svg"
import requestSVG from "../../../assets/request.svg"
import vehicleSVG from "../../../assets/vehicle.svg"
import timeSVG from "../../../assets/users.svg"
import mapSVG from "../../../assets/map.svg"
import routeSVG from "../../../assets/ubication.svg"
import PanelItem from '../../../components/panelItem'

export default function Panel(){
    return (
        <div className="panelBox">
            <h2 className="panelBox_tittle">Panel</h2>
            <div className="panelBox_grid">
                <PanelItem info="Clientes satisfechos" data="80" imgSrc={usersSVG}/>
                <PanelItem info="Órdenes entregadas"   color="green" data="120" imgSrc={requestSVG}/>
                <PanelItem info="Vehículos operativos" color="green" data="50" imgSrc={vehicleSVG}/>
                <PanelItem info="Tiempo aprox. entrega" data="60" imgSrc={routeSVG}/>
                <PanelItem info="Puntos de entrega" color="blue" data="120" imgSrc={timeSVG}/>
                <PanelItem info="Rutas cubiertas" color="blue" data="90" imgSrc={mapSVG}/>
            </div>
        </div>
    )
}