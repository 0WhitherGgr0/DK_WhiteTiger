import { useNavigate } from 'react-router-dom';
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
    registro: formData.get("registro"),
    capacidad: parseFloat(formData.get("capacidad")),
    estado: formData.get("estado"),
  };

  try {
    const response = await fetch(`${API_URL}/vehiculos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error en el servidor:", errorData);
        throw new Error("Error al enviar datos");
    }
    
    return { success: true };
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

const estados = [
  { label: 'Activo', value: 'Activo' },
  { label: 'Inactivo', value: 'Inactivo' },
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
              options={marcas} 
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
              options={marcas} 
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
              info="Registro" 
              name="registro" 
              type="date" 
            />
            <TextInput 
              containerClass="panelCRUD_formInput"
              info="Capacidad" 
              name="capacidad" 
              placeholder="Ej: 4.5" 
              type="number" 
              step="0.01" 
            />
            <SelectInputLabel 
              containerClass="panelCRUD_formInput"
              options={estados} 
              info="Estado" 
              name="estado" 
              placeholder="Seleccionar estado" 
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
