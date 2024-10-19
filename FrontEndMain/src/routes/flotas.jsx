import { Outlet } from "react-router-dom"
import SideBar from "../components/sidebar"
import '../styles/flota.css'

export default function Flotas(){
    return (
        <>
            <div className="contentDivider">
                <SideBar/>
                <Outlet/>   
            </div>
        </>
    )
}