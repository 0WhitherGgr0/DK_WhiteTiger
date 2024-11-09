import { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';
import "../../../styles/panelCRUD.css";

const API_URL = import.meta.env.VITE_API_URL;

export async function loader() {
    return {};
}

export default function UsuarioDetalles() {
    const { userId } = useUser(); 
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarDatosUsuario = async () => {
            if (!userId) {
                setError('No se proporcionó un ID de usuario');
                setLoading(false);
                return;
            }

            console.log(`Cargando datos del usuario con usuario_id ${userId}`);

            try {
                const usuarioResponse = await fetch(`${API_URL}/usuarios/${userId}/`);
                if (!usuarioResponse.ok) {
                    throw new Error('Error al cargar los datos del usuario');
                }

                const data = await usuarioResponse.json();
                console.log("Datos del usuario cargados:", data);
                setUsuario(data);
            } catch (err) {
                console.error("Error al cargar los datos del usuario:", err);
                setError('Hubo un problema al cargar los datos del usuario.');
            } finally {
                setLoading(false);
            }
        };

        cargarDatosUsuario();
    }, [userId]);

    if (loading) {
        return (
            <div className="panelCRUD">
                <div className="panelCRUD_tittle">
                    <h2>Detalles del Usuario</h2>
                </div>
                <div className="panelCRUD_container">
                    <p>Cargando datos del usuario...</p>
                </div>
            </div>
        );
    }

    if (error || !usuario) {
        return (
            <div className="panelCRUD">
                <div className="panelCRUD_tittle">
                    <h2>Detalles del Usuario</h2>
                </div>
                <div className="panelCRUD_container">
                    <p>{error || "No se pudo cargar la información del usuario."}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="panelCRUD">
            <div className="panelCRUD_tittle">
                <h2>Detalles del Usuario</h2>
            </div>
            <div className="panelCRUD_container">
                <fieldset className="panelCRUD_formContainer">
                    <legend>Información del Usuario</legend>

                    <div className="panelCRUD_formInput">
                        <label>ID</label>
                        <p>{usuario.usuario_id || 'N/A'}</p>
                    </div>

                    <div className="panelCRUD_formInput">
                        <label>Nombre</label>
                        <p>{usuario.nombre || 'N/A'}</p>
                    </div>

                    <div className="panelCRUD_formInput">
                        <label>Contacto</label>
                        <p>{usuario.contacto || 'N/A'}</p>
                    </div>

                    <div className="panelCRUD_formInput">
                        <label>Región</label>
                        <p>{usuario.region || 'N/A'}</p>
                    </div>

                    <div className="panelCRUD_formInput">
                        <label>Rol</label>
                        <p>{usuario.rol || 'N/A'}</p>
                    </div>

                    <div className="panelCRUD_formInput">
                        <label>Tipo de documento</label>
                        <p>{usuario.tipo_documento || 'N/A'}</p>
                    </div>

                    <div className="panelCRUD_formInput">
                        <label>Documento</label>
                        <p>{usuario.documento || 'N/A'}</p>
                    </div>

                    <div className="panelCRUD_formInput">
                        <label>Correo Electrónico</label>
                        <p>{usuario.correo || 'N/A'}</p>
                    </div>

                    <div className="panelCRUD_formInput">
                        <label>Teléfono</label>
                        <p>{usuario.telefono || 'N/A'}</p>
                    </div>

                    <div className="panelCRUD_formInput">
                        <label>Dirección</label>
                        <p>{usuario.direccion || 'N/A'}</p>
                    </div>

                    <div className="panelCRUD_formInput">
                        <label>Estado</label>
                        <p>{usuario.estado || 'N/A'}</p>
                    </div>
                </fieldset>
            </div>
        </div>
    );
}
