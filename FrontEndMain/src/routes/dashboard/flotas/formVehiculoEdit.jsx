import { useNavigate, Form, useLoaderData, useActionData } from 'react-router-dom';
import TextInput from '../../../components/textInput';
import SelectInputLabel from '../../../components/selectInputLabel';
import "../../../styles/panelCRUD.css";

const API_URL = import.meta.env.VITE_API_URL;

export async function actionv({ request, params }) {
    const formData = await request.formData();
    const { placa } = params;

    // Mapea los datos en el formato que el backend espera, incluyendo `placa`
    const data = {
        placa, // Agrega `placa` al cuerpo de la solicitud
        marca: formData.get("marca"),
        modelo: formData.get("modelo"),
        color: formData.get("color"),
        capacidad: formData.get("capacidad"),
        estado: formData.get("estado"),
        soat: formData.get("soat"),
        registro: formData.get("registro"),
        año_fabricacion: formData.get("año_fabricacion")
    };

    console.log("Datos enviados al backend:", data);

    try {
        const response = await fetch(`${API_URL}/vehiculos/${placa}/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al actualizar el vehículo. Estado: ${response.status}, Error: ${errorText}`);
        }

        return { success: true };
    } catch (error) {
        console.error("Error en la solicitud PUT:", error);
        return { success: false, error: error.message };
    }
}

export async function loader({ params }) {
    const { placa } = params;

    console.log(`Cargando datos del vehículo con placa ${placa}`);
    const vehiculoResponse = await fetch(`${API_URL}/vehiculos/${placa}`);
    if (!vehiculoResponse.ok) {
        throw new Error('Error al cargar los datos del vehículo');
    }
    const vehiculo = await vehiculoResponse.json();

    console.log("Datos del vehículo cargados:", vehiculo);

    return { vehiculo };
}

export default function FormVehiculoEdit() {
    const navigate = useNavigate();
    const { vehiculo } = useLoaderData();
    const actionData = useActionData();

    const estadoOptions = [
        { label: 'Activo', value: 'Activo' },
        { label: 'Inactivo', value: 'Inactivo' }
    ];

    return (
        <div className="panelCRUD">
            <div className="panelCRUD_tittle">
                <h2>Editar Vehículo</h2>
            </div>
            <div className="panelCRUD_container">
                <fieldset className="panelCRUD_formContainer">
                    <legend>Editar Vehículo</legend>
                    <Form method="post">
                        {actionData?.error && (
                            <p className="errorMessage">{actionData.error}</p>
                        )}
                        <TextInput 
                            containerClass="panelCRUD_formInput"
                            info="Marca" 
                            name="marca"  
                            placeholder="Ej: Toyota" 
                            defaultValue={vehiculo.marca}
                            required
                        />

                        <TextInput 
                            containerClass="panelCRUD_formInput"
                            info="Modelo" 
                            name="modelo"  
                            placeholder="Ej: Corolla" 
                            defaultValue={vehiculo.modelo}
                            required
                        />

                        <TextInput 
                            containerClass="panelCRUD_formInput"
                            info="Color" 
                            name="color"  
                            placeholder="Ej: Rojo" 
                            defaultValue={vehiculo.color}
                            required
                        />

                        <TextInput 
                            containerClass="panelCRUD_formInput"
                            info="Capacidad" 
                            name="capacidad"  
                            placeholder="Ej: 5" 
                            defaultValue={vehiculo.capacidad}
                            required
                        />

                        <SelectInputLabel 
                            containerClass="panelCRUD_formInput"
                            options={estadoOptions} 
                            info="Estado" 
                            name="estado" 
                            placeholder="Seleccionar estado" 
                            defaultValue={vehiculo.estado}
                            required
                        />

                        {/* Campos adicionales requeridos */}
                        <TextInput 
                            containerClass="panelCRUD_formInput"
                            info="SOAT" 
                            name="soat"  
                            placeholder="Número de SOAT" 
                            defaultValue={vehiculo.soat}
                            required
                        />

                        <TextInput 
                            containerClass="panelCRUD_formInput"
                            info="Registro" 
                            name="registro"  
                            type="date" 
                            defaultValue={vehiculo.registro}
                            required
                        />

                        <TextInput 
                            containerClass="panelCRUD_formInput"
                            info="Año de Fabricación" 
                            name="año_fabricacion"  
                            placeholder="Ej: 2020" 
                            defaultValue={vehiculo.año_fabricacion}
                            required
                        />

                        <div className="panelCRUD_buttonGroup">
                            <button type="button" onClick={() => navigate(-1)}>
                                Cancelar
                            </button>
                            <button type="submit">Guardar Cambios</button>
                        </div>
                    </Form>
                </fieldset>
            </div>
        </div>
    );
}
