import '../styles/reset.css';
import '../styles/login.css';
import arrobaSVG from "../assets/arroba.svg";
import lockPart1SVG from "../assets/lock_1.svg";
import lockPart2SVG from "../assets/lock_2.svg";
import userSVG from "../assets/user.svg";

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { encryptData } from '../context/cryptoConfig';

import React, { useState, useEffect } from 'react';

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [salt, setSalt] = useState(null);  // Nuevo estado para el salt
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/dashboard');
        } else {
            // Obtener el salt solo una vez cuando se carga el componente
            getSaltFromBackend();
        }
    }, [isAuthenticated, navigate]);

    const getSaltFromBackend = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/generate-key');
            const data = await response.json();
            setSalt(data.salt);  // Guardar el salt en el estado
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
                ? 'http://127.0.0.1:8000/api/v1/login/'
                : 'http://127.0.0.1:8000/api/v1/register/';
    
            // Encriptar el password antes de enviarlo al backend usando el salt almacenado
            const encryptedPassword = await encryptData({ password }, salt);
            console.log("Password encriptado:", encryptedPassword);
            const body = isLogin
                ? { email, password: encryptedPassword }
                : { name, email, password: encryptedPassword };
    
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                mode: 'cors',
            });
    
            if (response.ok) {
                const data = await response.json();
                if (isLogin) {
                    const { rol } = data.user;  // Cambiado de 'role' a 'rol'
                    if (!rol) {
                        throw new Error('El rol no está definido');
                    }
                    login(rol);  // Pasa el rol al contexto de autenticación
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
                        <div className="formBox_input">
                            <div className="formBox_icon">
                                <img src={userSVG} alt="User icon" />
                            </div>
                            <input
                                type="text"
                                className="formBox_inputText"
                                placeholder='Nombres'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
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
                            value={email}
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
                            value={password}
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
