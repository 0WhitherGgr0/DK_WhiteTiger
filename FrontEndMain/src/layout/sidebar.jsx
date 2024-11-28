import '../styles/sidebar.css'
import SidebarLink from '../components/sibebarLink'

export default function SideBar({routes}){
    return (
        <div className="sideBarBlock">
            <h4 className="sideBarBlock_tittle">      
                Gestión de la flota    
            </h4>
            <div className="sideBarBlock_list">
                {routes.map((route) => ( 
                    <SidebarLink to={route.to} imgSrc={route.svg} info={route.info}/>
                ))}
            </div>
        </div>
    )
} 