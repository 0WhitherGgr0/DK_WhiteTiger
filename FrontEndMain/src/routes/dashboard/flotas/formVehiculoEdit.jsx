import { useNavigate, Form, useLoaderData, useActionData, redirect } from 'react-router-dom';
import TextInput from '../../../components/textInput';
import SelectInputLabel from '../../../components/selectInputLabel';
import "../../../styles/panelCRUD.css";
const API_URL = import.meta.env.VITE_API_URL;

export async function actionv({ request, params }) {
    const formData = await request.formData();
    const { placa } = params;

    const data = {
        vehiculo_placa: placa,
        vehiculo_marca_id: formData.get("marca"),
        vehiculo_modelo_id: formData.get("modelo"),
        vehiculo_color_id: formData.get("color"),
        vehiculo_capacidad: formData.get("capacidad"),
        vehiculo_estado_id: formData.get("estado"),
        vehiculo_soat: formData.get("soat"),
        vehiculo_max_dist_dia: formData.get("max_distancia"),
        vehiculo_año_fabri: formData.get("anio_fabricacion"),
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
        alert("Vehículo actualizado correctamente.");
        return redirect("/dashboard/flotas/vehiculos");
    } catch (error) {
        console.error("Error en la solicitud PUT:", error);
        return { success: false, error: error.message };
    }
}

export async function loader({ params }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const { placa } = params;

    console.log(`Cargando datos del vehículo con placa ${placa}`);
    const [vehiculoResponse, coloresResponse, marcasResponse, modelosResponse, estadosResponse] = await Promise.all([
        fetch(`${API_URL}/vehiculos/${placa}`),
        fetch(`${API_URL}/colores`),
        fetch(`${API_URL}/marcas`),
        fetch(`${API_URL}/modelos`),
        fetch(`${API_URL}/estados`),
    ]);

    if (!vehiculoResponse.ok || !coloresResponse.ok || !marcasResponse.ok || !modelosResponse.ok || !estadosResponse.ok) {
        throw new Error('Error al cargar los datos del vehículo o listas');
    }

    const vehiculo = await vehiculoResponse.json();
    const colores = await coloresResponse.json();
    const marcas = await marcasResponse.json();
    const modelos = await modelosResponse.json();
    const estados = await estadosResponse.json();

    console.log("Datos del vehículo cargados:", vehiculo);

    return { vehiculo, colores, marcas, modelos, estados };
}

export default function FormVehiculoEdit() {
    const navigate = useNavigate();
    const { vehiculo, colores, marcas, modelos, estados } = useLoaderData();
    const actionData = useActionData();

    const soatOptions = [
        { label: 'Sí', value: '1' },
        { label: 'No', value: '0' }
    ];

    const modelosOptions = modelos.map(modelo => ({
        label: modelo.modelo_nombre,
        value: modelo.modelo_id
    }));

    const marcasOptions = marcas.map(marca => ({
        label: marca.marca_nombre,
        value: marca.marca_id
    }));

    const coloresOptions = colores.map(color => ({
        label: color.color_nombre,
        value: color.color_id
    }));

    const estadoOptions = estados.map(estado => ({
        label: estado.estado_nombre,
        value: estado.estado_id
    }));

    const validateDecimal = (value) => /^\d*(\.\d{0,2})?$/.test(value);

    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    return (
        <div className="panelCRUD">
            <div className="panelCRUD_tittle">
                <h2>Editar Vehículo</h2>
            </div>
            <div className="panelCRUD_container">
                <fieldset className="panelCRUD_formContainer">
                    <legend>Editar Vehículo</legend>
                    <Form method="post" onKeyDown={handleKeyDown}>
                        {actionData?.error && (
                            <p className="errorMessage">{actionData.error}</p>
                        )}
                        <SelectInputLabel 
                            containerClass="panelCRUD_formInput"
                            options={marcasOptions} 
                            info="Marca" 
                            name="marca" 
                            placeholder="Seleccionar marca" 
                        />
                        <SelectInputLabel 
                            containerClass="panelCRUD_formInput"
                            options={modelosOptions} 
                            info="Modelo" 
                            name="modelo" 
                            placeholder="Seleccionar modelo" 
                        />
                        <TextInput 
                            containerClass="panelCRUD_formInput"
                            info="Año de Fabricación" 
                            name="anio_fabricacion" 
                            placeholder="2022" 
                            type="number" 
                            validate={(value) => /^\d{0,4}$/.test(value)} 
                        />
                        <SelectInputLabel 
                            containerClass="panelCRUD_formInput"
                            options={coloresOptions} 
                            info="Color" 
                            name="color" 
                            placeholder="Seleccionar color" 
                        />
                        <SelectInputLabel 
                            containerClass="panelCRUD_formInput"
                            options={soatOptions} 
                            info="SOAT" 
                            name="soat" 
                            placeholder="Seleccionar" 
                        />
                        <SelectInputLabel 
                            containerClass="panelCRUD_formInput"
                            options={estadoOptions} 
                            info="Estado" 
                            name="estado" 
                            placeholder="Seleccionar estado" 
                        />
                        <TextInput 
                            containerClass="panelCRUD_formInput"
                            info="Máximo Recorrido" 
                            name="max_distancia"
                            placeholder='Ej: 100.00'
                            type='text'
                            validate={validateDecimal}
                        /> 
                        <TextInput 
                            containerClass="panelCRUD_formInput"
                            info="Máxima Capacidad" 
                            name="capacidad" 
                            placeholder="Ej: 4.5" 
                            type="text"
                            validate={validateDecimal} 
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
