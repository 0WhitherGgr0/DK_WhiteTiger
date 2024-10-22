import '../styles/reset.css'
import '../styles/login.css'
import arrobaSVG from "../assets/arroba.svg"
import lockPart1SVG from "../assets/lock_1.svg"
import lockPart2SVG from "../assets/lock_2.svg"
import userSVG from "../assets/user.svg"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(){

    const [isLogin , setIsLogin] = useState(true);
    const navigate = useNavigate();

    return (
        <div className='flexContainer'>
            <div className="formBox">
                <div className="formBox_header">
                    <h2 className="formBox_tittle">RoadMap Pro</h2>
                </div>
                <div className={`formBox_switch ${isLogin === false ? 'formBox_switch--right' : ''}`}>
                    <button onClick={()=>{setIsLogin(true)}} className="formBox_mode formBox_mode--left formBox_mode--active">
                        INGRESAR
                    </button>
                    <button onClick={()=>{setIsLogin(false)}} className="formBox_mode formBox_mode--right">
                        REGISTRAR
                    </button>
                </div>
                <div className="formBox_form">
                    {!isLogin &&
                        <div className="formBox_input">
                            <div className="formBox_icon">
                                <img src={userSVG} alt="" />  
                            </div>
                            <input type="text" className="formBox_inputText" placeholder='Nombres'/>
                        </div>
                    }
                    <div className="formBox_input">
                        <div className="formBox_icon">
                            <img src={arrobaSVG} alt="" />
                        </div>
                        <input type="text" className="formBox_inputText" placeholder='Correo'/>
                    </div>
                    <div className="formBox_input">
                        <div className="formBox_icon">
                            <div className="svgJoiner">
                                <img src={lockPart2SVG} alt="" />
                                <img style={{marginTop: "-4px"}} src={lockPart1SVG} alt="" />
                            </div>
                        </div>
                        <input type="text" className="formBox_inputText" placeholder='Contraseña'/>
                    </div>    
                </div>
                <button className="formBox_button" onClick={()=>{
                    navigate("/dashboard");
                }}>
                    {isLogin ? "Ingresar" : "Registrarse"}
                </button>
                <div className="formBox_footer">
                    <p onClick={()=>{setIsLogin(false)}} className="formBox_link">
                        ¿Aún no tienes una cuenta?
                    </p>
                </div>
            </div>
        </div>
    )

}