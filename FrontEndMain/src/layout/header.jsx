import '../styles/header.css'
import HeaderLink from '../components/HeaderLink';
import userSVG from "../assets/userHeader.svg";
import bellSVG from "../assets/bell.svg"
import Sign_Out from "../assets/logout.svg"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Header(){

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("..", { relative: "path" }); // Redirige al login después de cerrar sesión
    };

    return (
        <nav className="headerBox">
            <h1 className="headerBox_tittle">RoadMap Pro</h1>
            <div className="headerBox_nav">             
                <HeaderLink link={"/dashboard"} text={"Panel"}/>
                <HeaderLink link={"/dashboard/solicitudes/ordenes"} text={"Solicitudes"}/>
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
                <button className="headerBox_icon" onClick={handleLogout}>
                    <img src={Sign_Out} alt="" />
                </button>
             </div>
        </nav>
    )
}