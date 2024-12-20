import { Outlet } from "react-router-dom"
import SideBar from "../../../layout/sidebar"
import '../../../styles/flota.css'
import userSVG from "../../../assets/user2.svg"
import vehicleSVG from "../../../assets/vehicle2.svg"
import mapSVG from "../../../assets/map2.svg"

const location = "/dashboard/flotas/"

function Route(to, svg, info){
    this.to = to;
    this.svg = svg;
    this.info = info;
}

const routes = []
routes.push(new Route(location+"vehiculos",vehicleSVG,"Vehiculos"))
routes.push(new Route(location+"conductores",userSVG,"Conductores"))
routes.push(new Route(location+"rutas",mapSVG,"Rutas"))

export default function Flotas(){
    return (
        <div className="contentDivider">
            <SideBar routes={routes}/>
            <Outlet/>   
        </div>
    )
}