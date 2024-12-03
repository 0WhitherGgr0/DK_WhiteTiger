import '../styles/header.css'
import HeaderLink from '../components/HeaderLink';
import userSVG from "../assets/userHeader.svg";
import bellSVG from "../assets/bell.svg"
import Sign_Out from "../assets/logout.svg"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo.svg";
export default function Header() {
    const { role, logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/"); 
    };

    return (
        <nav className="headerBox">
 
            <img src={logo} alt="" />
            <div className="headerBox_nav">             
                {/* visible para todos*/}
                
                <HeaderLink link={"/dashboard"} text={"Panel"} check={true} /> 
                <HeaderLink link={"/dashboard/rutas"} text={"Rutas"} route='/dashboard/rutas'/>

                {/* Solo admin */}
                {role === "admin" && (
                    <>
                        <HeaderLink link={"/dashboard/flotas/vehiculos"} text={"Flota"} route='/dashboard/flotas'/>
                        <HeaderLink link={"/dashboard/solicitudes/ordenes"} text={"Solicitudes"} route='/dashboard/solicitudes'/>
                    </>
                )}

                <button className="headerBox_icon" onClick={() => {
                    navigate("/dashboard/user", { relative: "path" });
                }}>
                    <img src={userSVG} alt="Usuario" />
                </button>
                <button className="headerBox_icon" onClick={handleLogout}>
                    <img src={Sign_Out} alt="Cerrar sesión" />
                </button>
            </div>
        </nav>
    );
}
