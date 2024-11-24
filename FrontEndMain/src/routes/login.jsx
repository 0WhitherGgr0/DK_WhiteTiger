import '../styles/reset.css';
import '../styles/login.css';
import arrobaSVG from "../assets/arroba.svg";
import lockPart1SVG from "../assets/lock_1.svg";
import lockPart2SVG from "../assets/lock_2.svg";
import userSVG from "../assets/user.svg";
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { encryptData } from '../context/cryptoConfig';

import React, { useState, useEffect } from 'react';

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [usuario_email, setEmail] = useState('');
    const [usuario_contraseña, setPassword] = useState('');
    const [usuario_nombre, setName] = useState('');
    const [usuario_apellido, setApellido] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [salt, setSalt] = useState(null); 
    const { setUserId } = useUser();
    const [usuario_fecha_nac, setDate] = useState('');
    const [usuario_telefono, setTelefono] = useState('');

    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/dashboard');
        } else {
            getSaltFromBackend();
        }
    }, [isAuthenticated, navigate]);

    const getSaltFromBackend = async () => {
        try {
            const response = await fetch(`${API_URL}/generate-key`);
            const data = await response.json();
            setSalt(data.salt); 
        } catch (error) {
            console.error("Error al obtener el salt del backend:", error);
            setError("No se pudo conectar con el servidor");
        }
    };

    const handleSubmit = async () => {
        try {
            if (!salt) {
                setError("Error: No se pudo obtener el salt");
                return;
            }
    
            const endpoint = isLogin
                ? `${API_URL}/login/`
                : `${API_URL}/register/`;
    
            // Encriptar el password antes de enviarlo al backend usando el salt almacenado
            const encryptedPassword = await encryptData({ usuario_contraseña }, salt);
            console.log("Password encriptado:", encryptedPassword);
            const body = isLogin
                ? { usuario_email, usuario_contraseña: encryptedPassword }
                : { usuario_nombre, usuario_apellido, usuario_fecha_nac, usuario_telefono,usuario_email, usuario_contraseña: encryptedPassword };
    
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                mode: 'cors',
            });
            console.log("Respuesta del backend:", response);
            if (response.ok) {
                const data = await response.json();
                if (isLogin) {
                    const { rol } = data.user;  
                    if (!rol) {
                        throw new Error('El rol no está definido');
                    }
                    login(rol);
                    const {id} = data.user;
                    setUserId(id);
                    console.log("Usuario logueado:", data.user);
                    navigate('/dashboard');
                } else {
                    setSuccessMessage(data.message || 'Registro exitoso');
                    setError(null);
                }
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error en la autenticación');
                setSuccessMessage(null);
            }
        } catch (error) {
            setError('No se pudo conectar con el servidor');
            setSuccessMessage(null);
            console.error('Error en login:', error);
        }
    };
    


    return (
        <div className='flexContainer'>
            <div className="formBox">
                <div className="formBox_header">
                    <h2 className="formBox_tittle">RoadMap Pro</h2>
                </div>
                <div className={`formBox_switch ${!isLogin ? 'formBox_switch--right' : ''}`}>
                    <button onClick={() => { setIsLogin(true); setSuccessMessage(null); }} className={`formBox_mode formBox_mode--left ${isLogin ? 'formBox_mode--active' : ''}`}>
                        INGRESAR
                    </button>
                    <button onClick={() => { setIsLogin(false); setSuccessMessage(null); }} className={`formBox_mode formBox_mode--right ${!isLogin ? 'formBox_mode--active' : ''}`}>
                        REGISTRAR
                    </button>
                </div>
                <div className="formBox_form">
                    {!isLogin &&
                    <div>
                        <div className="formBox_input">
                            <div className="formBox_icon">
                                <img src={userSVG} alt="User icon" />
                            </div>
                            <input
                                type="text"
                                className="formBox_inputText"
                                placeholder='Nombre'
                                value={usuario_nombre}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="formBox_input">
                            <div className="formBox_icon">
                                <img src={userSVG} alt="User icon" />
                            </div>
                            <input
                                type="text"
                                className="formBox_inputText"
                                placeholder='Apellido'
                                value={usuario_apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                        </div>
                        <div className="formBox_input">
                            <div className="formBox_icon">
                                <img src={userSVG} alt="Calendar icon" />
                            </div>
                            <input
                                type="date"
                                className="formBox_inputText"
                                value={usuario_fecha_nac}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="formBox_input">
                        <div className="formBox_icon">
                            <img src={userSVG} alt="User icon" />
                        </div>
                        <input
                            type="text"
                            className="formBox_inputText"
                            placeholder="Teléfono (9 dígitos)"
                            value={usuario_telefono}
                            onChange={(e) => {
                                const input = e.target.value;
                                if (/^\d{0,9}$/.test(input)) {
                                    setTelefono(input);
                                }
                            }}
                        />
                        </div>
                    </div>
                        
                    }
                    <div className="formBox_input">
                        <div className="formBox_icon">
                            <img src={arrobaSVG} alt="Email icon" />
                        </div>
                        <input
                            type="email"
                            className="formBox_inputText"
                            placeholder='Correo'
                            value={usuario_email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="formBox_input">
                        <div className="formBox_icon">
                            <div className="svgJoiner">
                                <img src={lockPart2SVG} alt="Lock icon part 2" />
                                <img style={{ marginTop: "-4px" }} src={lockPart1SVG} alt="Lock icon part 1" />
                            </div>
                        </div>
                        <input
                            type="password"
                            className="formBox_inputText"
                            placeholder='Contraseña'
                            value={usuario_contraseña}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                {error && <div className="formBox_error">{error}</div>}
                {successMessage && !isLogin && <div className="formBox_success">{successMessage}</div>}
                <button className="formBox_button" onClick={handleSubmit}>
                    {isLogin ? "Ingresar" : "Registrarse"}
                </button>
                <div className="formBox_footer">
                    <p onClick={() => setIsLogin(false)} className="formBox_link">
                        ¿Aún no tienes una cuenta?
                    </p>
                </div>
            </div>
        </div>
    );
}
