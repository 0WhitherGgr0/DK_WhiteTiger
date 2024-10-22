import '../styles/header.css'
import HeaderLink from '../components/HeaderLink';
import userSVG from "../assets/userHeader.svg";
import bellSVG from "../assets/bell.svg"
import { useNavigate } from 'react-router-dom';

export default function Header(){
    const navigate = useNavigate();
    return (
        <nav className="headerBox">
            <h1 className="headerBox_tittle">RoadMap Pro</h1>
            <div className="headerBox_nav">             
                <HeaderLink link={"/dashboard"} text={"Panel"}/>
                <HeaderLink link={"/dashboard/ordenes"} text={"Órdenes"}/>
                <HeaderLink link={"/dashboard/flotas/vehiculos"} text={"Flota"}/>
                <HeaderLink link={"/dashboard/rutas"} text={"Rutas"}/>
                <button className="headerBox_icon">
                    <img src={bellSVG} alt="" />
                </button>
                <button className="headerBox_icon" onClick={()=>{
                    navigate("..", { relative: "path" });
                }}>
                    <img src={userSVG} alt="" />
                </button>
             </div>
        </nav>
    )
}