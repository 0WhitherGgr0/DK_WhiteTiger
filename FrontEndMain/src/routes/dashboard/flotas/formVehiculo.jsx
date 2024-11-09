import { redirect, useNavigate } from 'react-router-dom';
import "../../../styles/panelCRUD.css";
import { Form } from 'react-router-dom';
import SelectInputLabel from '../../../components/selectInputLabel';
import TextInput from '../../../components/textInput';

export async function action({ request }) {
  const formData = await request.formData();
  const API_URL = import.meta.env.VITE_API_URL;
  const data = {
    marca: formData.get("marca"),
    modelo: formData.get("modelo"),
    año_fabricacion: parseInt(formData.get("año_fabricacion"), 10),
    color: formData.get("color"),
    placa: formData.get("placa"),
    soat: formData.get("soat"),
    maximo_recorrido_diario: formData.get("maximo_recorrido"),
    maxima_capacidad: formData.get("maxima_capacidad"),
    capacidad: 0,
    total_recorrido: 0,
    estado: "Inactivo",
  };
  console.log(data)
  try {
    const response = await fetch(`${API_URL}/vehiculos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    console.log(response)
    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error en el servidor:", errorData);
        throw new Error("Error al enviar datos");
    }
    
    return redirect("/dashboard/flotas/vehiculos");
} catch (error) {
    console.error("Error:", error);
    return { success: false, error: error.message };
}

}

const marcas = [
  { label: 'Marca1', value: 'Marca1' },
  { label: 'Marca2', value: 'Marca2' },
  { label: 'Marca3', value: 'Marca3' },
  { label: 'Marca4', value: 'Marca4' },
  { label: 'Marca5', value: 'Marca5' },
  { label: 'Marca6', value: 'Marca6' },
];

const modelos = [
  { label: 'Modelo1', value: 'Modelo1' },
  { label: 'Modelo1', value: 'Modelo2' },
  { label: 'Modelo3', value: 'Modelo3' },
  { label: 'Modelo4', value: 'Modelo4' },
  { label: 'Modelo5', value: 'Modelo5' },
  { label: 'Modelo6', value: 'Modelo6' },
];

const colores = [
  { label: 'Color1', value: 'Color1' },
  { label: 'Color2', value: 'Color2' },
  { label: 'Color3', value: 'Color3' },
];



export default function FormVehiculo() {
  const navigate = useNavigate();

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  return (
    <div className="panelCRUD">
      <div className="panelCRUD_tittle">
        <h2>Vehículos</h2>
      </div>
      <div className="panelCRUD_container">
        <fieldset className="panelCRUD_formContainer">
          <legend>Agregar Vehículo</legend>
          <Form method="post" onKeyDown={handleKeyDown}>
            <SelectInputLabel 
              containerClass="panelCRUD_formInput"
              options={marcas} 
              info="Marca" 
              name="marca" 
              placeholder="Seleccionar marca" 
            />
            <SelectInputLabel 
              containerClass="panelCRUD_formInput"
              options={modelos} 
              info="Modelo" 
              name="modelo" 
              placeholder="Seleccionar modelo" 
            />
            <TextInput 
              containerClass="panelCRUD_formInput"
              info="Año de Fabricación" 
              name="año_fabricacion" 
              placeholder="2022" 
              type="number" 
            />
            <SelectInputLabel 
              containerClass="panelCRUD_formInput"
              options={colores} 
              info="Color" 
              name="color" 
              placeholder="Seleccionar color" 
            />
            <TextInput 
              containerClass="panelCRUD_formInput"
              info="Placa" 
              name="placa" 
              placeholder="API-123" 
            />
            <TextInput 
              containerClass="panelCRUD_formInput"
              info="SOAT" 
              name="soat" 
              placeholder="Número de SOAT" 
            />
            <TextInput 
              containerClass="panelCRUD_formInput"
              info="Máximo Recorrido" 
              name="maximo_recorrido"
              type='number'
              step="100" 
            /> 
            <TextInput 
              containerClass="panelCRUD_formInput"
              info="Máxima Capacidad" 
              name="maxima_capacidad" 
              placeholder="Ej: 4.5" 
              type="number" 
            />
            <div className="panelCRUD_buttonGroup">
              <button type="reset" onClick={() => navigate(-1)}>
                Cancelar
              </button>
              <button type="submit">Guardar</button>
            </div>
          </Form>
        </fieldset>
      </div>
    </div>
  );
}
