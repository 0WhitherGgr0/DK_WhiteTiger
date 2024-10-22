import '../styles/sidebar.css'
import { NavLink } from 'react-router-dom'

export default function SidebarLink({to, imgSrc, info}){
    return (
        <NavLink to={to} relative='path'  className={({isActive, isPending})=>{
            return isActive ? 
                "sideBarBlock_item sideBarBlock_item--active" : "sideBarBlock_item ";
        }}>
            <div className="sideBarBlock_icon">
                <img src={imgSrc} alt="" />
            </div>
            <p className="sideBarBlock_info">{info}</p>
        </NavLink>
    )
}