import '../styles/header.css'
import { NavLink } from 'react-router-dom'

export default function GoLink({link, text}){

    return (
        <>
             <NavLink to={link} relative="path" end  
                className={({ isActive, isPending }) => {
                    return isActive ? "headerBox_link headerBox_link--active" : "headerBox_link"
                }  
            }>{text}</NavLink>
        </>
    )
}