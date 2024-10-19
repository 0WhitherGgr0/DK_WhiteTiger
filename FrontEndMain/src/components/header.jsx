import '../styles/header.css'
import { useNavigate } from 'react-router-dom';
import GoLink from './goLink';

export default function Header(){
    const navigate = useNavigate();
    return (
        <>
            <nav className="headerBox">
                <h1 className="headerBox_tittle">RoadMap Pro</h1>
                <div className="headerBox_nav">             
                    <GoLink link={"/dashboard"} text={"Panel"}/>
                    <GoLink link={"/dashboard/ordenes"} text={"Órdenes"}/>
                    <GoLink link={"/dashboard/flotas"} text={"Flota"}/>
                    <GoLink link={"/dashboard/rutas"} text={"Rutas"}/>
                    <div className="headerBox_icon">
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3281 12.7453C14.8945 11.9984 14.25 9.88516 14.25 7.125C14.25 3.67322 11.4518 0.875 8 0.875C4.54822 0.875 1.75 3.67322 1.75 7.125C1.75 9.88594 1.10469 11.9984 0.671094 12.7453C0.445722 13.1318 0.444082 13.6092 0.666796 13.9973C0.889509 14.3853 1.30261 14.6247 1.75 14.625H4.93828C5.23556 16.0796 6.51529 17.1243 8 17.1243C9.48471 17.1243 10.7644 16.0796 11.0617 14.625H14.25C14.6972 14.6244 15.1101 14.3849 15.3326 13.9969C15.5551 13.609 15.5534 13.1317 15.3281 12.7453ZM8 15.875C7.20562 15.8748 6.49761 15.3739 6.23281 14.625H9.76719C9.50239 15.3739 8.79438 15.8748 8 15.875ZM1.75 13.375C2.35156 12.3406 3 9.94375 3 7.125C3 4.36358 5.23858 2.125 8 2.125C10.7614 2.125 13 4.36358 13 7.125C13 9.94141 13.6469 12.3383 14.25 13.375H1.75Z" fill="#09121A"/>
                        </svg>
                    </div>
                    <div className="headerBox_icon" onClick={()=>{
                        navigate("..", { relative: "path" });
                    }}>
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.6666 16.5V14.8333C14.6666 13.9493 14.3154 13.1014 13.6903 12.4763C13.0652 11.8512 12.2173 11.5 11.3333 11.5H4.66659C3.78253 11.5 2.93468 11.8512 2.30956 12.4763C1.68444 13.1014 1.33325 13.9493 1.33325 14.8333V16.5M11.3333 4.83333C11.3333 6.67428 9.84087 8.16667 7.99992 8.16667C6.15897 8.16667 4.66659 6.67428 4.66659 4.83333C4.66659 2.99238 6.15897 1.5 7.99992 1.5C9.84087 1.5 11.3333 2.99238 11.3333 4.83333Z" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </nav>
        </>
    )
}