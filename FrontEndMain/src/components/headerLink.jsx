import '../styles/header.css'
import { NavLink, useLocation } from 'react-router-dom'

export default function HeaderLink({link, text, check = false, route="/dashboard"}){

    const location = useLocation();
    let isActive = location.pathname == route;
    if(!check){
        isActive = location.pathname.startsWith(route);
    }
    
    return (
        <NavLink to={link} end = {check}  
            className={ isActive
                 ? "headerBox_link headerBox_link--active" : "headerBox_link"
            }  
        >{text}</NavLink>
    )
}