import '../styles/sidebar.css'
import { NavLink } from 'react-router-dom'

export default function SideBar(){
    return (
        <>
            <div className="sideBarBlock">
                <h4 className="sideBarBlock_tittle">      
                    Gestión de la flota    
                </h4>
                <div className="sideBarBlock_list">
                    <NavLink to="/dashboard/flotas" relative='path' end className={({isActive, isPending})=>{
                        return isActive ? "sideBarBlock_item sideBarBlock_item--active": "sideBarBlock_item ";
                    }}>
                        <div className="sideBarBlock_icon">
                            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1966 5.96875L21.8841 2.6875C21.6561 2.11912 21.1043 1.74751 20.4919 1.75H17.25V1C17.25 0.585786 16.9142 0.25 16.5 0.25H2.25C1.42157 0.25 0.75 0.921573 0.75 1.75V12.25C0.75 13.0784 1.42157 13.75 2.25 13.75H3.84375C4.18363 15.0774 5.37974 16.0059 6.75 16.0059C8.12026 16.0059 9.31637 15.0774 9.65625 13.75H14.3438C14.6836 15.0774 15.8797 16.0059 17.25 16.0059C18.6203 16.0059 19.8164 15.0774 20.1562 13.75H21.75C22.5784 13.75 23.25 13.0784 23.25 12.25V6.25C23.2501 6.15372 23.232 6.05828 23.1966 5.96875ZM6.75 14.5C5.92157 14.5 5.25 13.8284 5.25 13C5.25 12.1716 5.92157 11.5 6.75 11.5C7.57843 11.5 8.25 12.1716 8.25 13C8.25 13.8284 7.57843 14.5 6.75 14.5ZM2.25 7.75V1.75H15.75V7.75H2.25ZM17.25 14.5C16.4216 14.5 15.75 13.8284 15.75 13C15.75 12.1716 16.4216 11.5 17.25 11.5C18.0784 11.5 18.75 12.1716 18.75 13C18.75 13.8284 18.0784 14.5 17.25 14.5ZM17.25 5.5V3.25H20.4919L21.3919 5.5H17.25Z" fill="#101112"/>
                            </svg>
                        </div>
                        <p className="sideBarBlock_info">Vehículos</p>
                    </NavLink>
                    <NavLink to="/dashboard/flotas/conductores" end className={({isActive, isPending})=>{
                        return isActive ? "sideBarBlock_item sideBarBlock_item--active": "sideBarBlock_item";
                    }}>
                        <div className="sideBarBlock_icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6488 17.875C18.2209 15.4066 16.0206 13.6366 13.4528 12.7975C16.0635 11.2433 17.3141 8.13638 16.5082 5.2069C15.7022 2.27741 13.0383 0.247449 10 0.247449C6.96167 0.247449 4.29779 2.27741 3.49182 5.2069C2.68585 8.13638 3.93645 11.2433 6.54719 12.7975C3.97938 13.6356 1.77906 15.4056 0.35125 17.875C0.208704 18.1074 0.203527 18.3989 0.337731 18.6363C0.471935 18.8736 0.724375 19.0194 0.997024 19.0171C1.26967 19.0147 1.51958 18.8646 1.64969 18.625C3.41594 15.5725 6.53781 13.75 10 13.75C13.4622 13.75 16.5841 15.5725 18.3503 18.625C18.4804 18.8646 18.7303 19.0147 19.003 19.0171C19.2756 19.0194 19.5281 18.8736 19.6623 18.6363C19.7965 18.3989 19.7913 18.1074 19.6488 17.875ZM4.75 7C4.75 4.1005 7.1005 1.75 10 1.75C12.8995 1.75 15.25 4.1005 15.25 7C15.25 9.8995 12.8995 12.25 10 12.25C7.10179 12.2469 4.7531 9.89821 4.75 7Z" fill="#101112"/>
                            </svg>
                        </div>
                        <p className="sideBarBlock_info">Conductores</p>
                    </NavLink>
                    <NavLink to="/dashboard/flotas/rutas" end className={({isActive, isPending})=>{
                        return isActive ? "sideBarBlock_item sideBarBlock_item--active": "sideBarBlock_item";
                    }}>
                        <div className="sideBarBlock_icon">
                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4613 1.65844C19.2792 1.51659 19.042 1.46645 18.8181 1.5225L13.0872 2.955L7.33562 0.0787499C7.17537 -0.0011816 6.99181 -0.0211341 6.81812 0.0225L0.818125 1.5225C0.484278 1.60595 0.250052 1.90588 0.25 2.25V15.75C0.250035 15.9809 0.356449 16.199 0.538475 16.3411C0.720501 16.4832 0.957841 16.5335 1.18187 16.4775L6.91281 15.045L12.6644 17.9212C12.7688 17.9727 12.8836 17.9997 13 18C13.0613 18 13.1224 17.9924 13.1819 17.9775L19.1819 16.4775C19.5157 16.3941 19.7499 16.0941 19.75 15.75V2.25C19.7501 2.01885 19.6435 1.80059 19.4613 1.65844ZM7.75 1.96313L12.25 4.21313V16.0369L7.75 13.7869V1.96313ZM1.75 2.83594L6.25 1.71094V13.6641L1.75 14.7891V2.83594ZM18.25 15.1641L13.75 16.2891V4.33594L18.25 3.21094V15.1641Z" fill="#101112"/>
                            </svg>
                        </div>
                        <p className="sideBarBlock_info">Rutas</p>
                    </NavLink>
                </div>
            </div>
        </>
    )
}