import { redirect, useNavigate, useLoaderData } from 'react-router-dom';
import "../../../styles/panelCRUD.css";
import { Form } from 'react-router-dom';
import SelectInputLabel from '../../../components/selectInputLabel';
import TextInput from '../../../components/textInput';
import TextInputWithValidation from '../../../components/TextInputWithValidation';
export async function action({ request }) {
  const formData = await request.formData();
  const API_URL = import.meta.env.VITE_API_URL;

  const placa = formData.get("placa");
  const placaRegex = /^[A-Z]{3}-\d{3}$/;
  if (!placaRegex.test(placa)) {
    return { success: false, error: "El formato de la placa debe ser: AAA-123" };
  }

  const data = {
    vehiculo_marca: formData.get("marca"),
    vehiculo_modelo: formData.get("modelo"),
    vehiculo_año_fabri: parseInt(formData.get("año_fabricacion"), 10),
    vehiculo_color: formData.get("color"),
    vehiculo_placa: placa,
    vehiculo_soat: formData.get("soat"),
    vehiculo_max_dist_dia: formData.get("maximo_recorrido"),
    vehiculo_capacidad: formData.get("maxima_capacidad"),
  };

  try {
    const response = await fetch(`${API_URL}/vehiculos/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log(response);

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


  const soat = [
    { label: 'Sí', value: '1' },
    { label: 'No', value: '0' }
  ];


export default function FormVehiculo() {
  const navigate = useNavigate();

  const {colores = [] }= useLoaderData() || {};
  const {marcas = [] } = useLoaderData() || {};
  const {modelos = [] } = useLoaderData() || {};

  const modelosoptions = modelos.map(modelo => ({
    label: modelo.modelo_nombre,
    value: modelo.modelo_id
  }));

  const marcasoptions = marcas.map(marca => ({
    label: marca.marca_nombre,
    value: marca.marca_id
  }));

  const coloresOptions = colores.map(color => ({
    label: color.color_nombre,
    value: color.color_id 
  }));

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }
  const validateDecimal = (value) => /^\d*(\.\d{0,2})?$/.test(value);

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
              options={marcasoptions} 
              info="Marca" 
              name="marca" 
              placeholder="Seleccionar marca" 
            />
            <SelectInputLabel 
              containerClass="panelCRUD_formInput"
              options={modelosoptions} 
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
              validate={(value) => /^\d{0,4}$/.test(value)} 
              onChange={({ target: { value } }) => {
                if (/^\d{0,4}$/.test(value)) {
                  setAnoFabricacion(value);
                }
              }}
            />
            <SelectInputLabel 
              containerClass="panelCRUD_formInput"
              options={coloresOptions} 
              info="Color" 
              name="color" 
              placeholder="Seleccionar color" 
            />
            <TextInputWithValidation
              containerClass="panelCRUD_formInput"
              info="Placa"
              name="placa"
              placeholder="AAA-123"
            />
            <SelectInputLabel 
              containerClass="panelCRUD_formInput"
              options={soat} 
              info="SOAT" 
              name="soat" 
              placeholder="Seleccionar" 
            />
            <TextInput 
              containerClass="panelCRUD_formInput"
              info="Máximo Recorrido" 
              name="maximo_recorrido"
              placeholder='Ej: 100.00'
              type='text'
              step="100" 
              validate={validateDecimal}
            /> 
            <TextInput 
              containerClass="panelCRUD_formInput"
              info="Máxima Capacidad" 
              name="maxima_capacidad" 
              placeholder="Ej: 4.5" 
              type="text"
              validate={validateDecimal} 
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
