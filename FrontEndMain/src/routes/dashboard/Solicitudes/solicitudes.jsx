import { Outlet } from "react-router-dom"
import SideBar from "../../../layout/sidebar"
import '../../../styles/flota.css'
import userSVG from "../../../assets/user2.svg"
import vehicleSVG from "../../../assets/vehicle2.svg"

const location = "/dashboard/solicitudes/"

function Route(to, svg, info){
    this.to = to;
    this.svg = svg;
    this.info = info;
}

const routes = []
routes.push(new Route(location+"ordenes",vehicleSVG,"Ordenes"))
routes.push(new Route(location+"pedidos",userSVG,"Pedidos"))

export default function Solicitudes(){
    return (
        <div className="contentDivider">
            <SideBar routes={routes}/>
            <Outlet/>   
        </div>
    )
}