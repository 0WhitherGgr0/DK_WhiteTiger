import '../styles/sidebar.css'
import userSVG from "../assets/user2.svg"
import vehicleSVG from "../assets/vehicle2.svg"
import mapSVG from "../assets/map2.svg"
import SidebarLink from '../components/sibebarLink'

export default function SideBar(){
    return (
        <div className="sideBarBlock">
            <h4 className="sideBarBlock_tittle">      
                Gestión de la flota    
            </h4>
            <div className="sideBarBlock_list">
                <SidebarLink to="/dashboard/flotas/vehiculos" imgSrc={vehicleSVG} info="Vehiculos"/>
                <SidebarLink to="/dashboard/flotas/conductores" imgSrc={userSVG} info="Conductores"/>
                <SidebarLink to="/dashboard/flotas/rutas" imgSrc={mapSVG} info="Rutas"/>
            </div>
        </div>
    )
}