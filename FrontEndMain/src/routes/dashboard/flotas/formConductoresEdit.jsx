import { useNavigate, Form, useLoaderData, useActionData } from 'react-router-dom';
import TextInput from '../../../components/textInput';
import SelectInputLabel from '../../../components/selectInputLabel';
import "../../../styles/panelCRUD.css";

const API_URL = import.meta.env.VITE_API_URL;

export async function action({ request, params }) {
  const formData = await request.formData();
  const { idConductor } = params;

  // Mapea los datos en el formato que el backend espera
  const data = {
      usuario: formData.get("usuario_id"),
      vehiculo: formData.get("vehiculo_id"),
      breve: formData.get("breve"),
      estado: formData.get("estado")
  };

  // Log para verificar los datos antes de enviarlos
  console.log("ID del Conductor:", idConductor);
  console.log("Datos enviados al backend:", data);

  try {
      console.log(`Enviando PUT a ${API_URL}/conductores/${idConductor}`);
      const response = await fetch(`${API_URL}/conductores/${idConductor}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
      });

      console.log("Respuesta del servidor:", response);
      if (!response.ok) {
          const errorText = await response.text();
          console.error("Error en la respuesta del servidor:", errorText);
          throw new Error(`Error al actualizar el conductor. Estado: ${response.status}, Error: ${errorText}`);
      }

      return { success: true };
  } catch (error) {
      console.error("Error en la solicitud PUT:", error);
      return { success: false, error: error.message };
  }
}


export async function loader({ params }) {
  const { idConductor } = params;

  console.log(`Cargando datos del conductor con ID ${idConductor}`);
  const conductorResponse = await fetch(`${API_URL}/conductores/${idConductor}`);
  if (!conductorResponse.ok) {
      throw new Error('Error al cargar los datos del conductor');
  }
  const conductor = await conductorResponse.json();

  console.log("Datos del conductor cargados:", conductor);

  const vehiculosResponse = await fetch(`${API_URL}/vehiculos`);
  if (!vehiculosResponse.ok) {
      throw new Error('Error al cargar los datos de vehículos');
  }
  const vehiculos = await vehiculosResponse.json();

  console.log("Datos de vehículos cargados:", vehiculos);

  return { conductor, vehiculos };
}

export default function FormVehiculoEdit() {
    const navigate = useNavigate();
    const { conductor, vehiculos } = useLoaderData();
    const actionData = useActionData();

    // Opciones de estado para el selector
    const estadoOptions = [
        { label: 'Activo', value: 'Activo' },
        { label: 'Inactivo', value: 'Inactivo' }
    ];

    // Opciones de vehículos
    const vehiculoOptions = vehiculos.map(vehiculo => ({
        label: `${vehiculo.marca} - ${vehiculo.placa}`,
        value: vehiculo.placa 
    }));

    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    return (
        <div className="panelCRUD">
          <div className="panelCRUD_tittle">
            <h2>Editar Conductor</h2>
          </div>
          <div className="panelCRUD_container">
            <fieldset className="panelCRUD_formContainer">
              <legend>Editar Conductor</legend>
              <Form method="post" onKeyDown={handleKeyDown}>
                {actionData?.error && (
                    <p className="errorMessage">{actionData.error}</p>
                )}

                {/* Campo oculto para el ID de usuario */}
                <input type="hidden" name="usuario_id" value={conductor.usuario} />

                {/* Selección de vehículo */}
                <SelectInputLabel 
                  containerClass="panelCRUD_formInput"
                  options={vehiculoOptions} 
                  info="Vehículo Asociado" 
                  name="vehiculo_id" 
                  placeholder="Seleccionar vehículo" 
                  defaultValue={conductor.vehiculo}
                  required 
                />

                {/* Estado del conductor */}
                <SelectInputLabel 
                  containerClass="panelCRUD_formInput"
                  options={estadoOptions} 
                  info="Estado" 
                  name="estado" 
                  placeholder="Seleccionar estado" 
                  defaultValue={conductor.estado}
                  required
                />

                {/* Campo para el brevete */}
                <TextInput 
                  containerClass="panelCRUD_formInput"
                  info="Brevete" 
                  name="breve"  
                  placeholder="Ej: ABC-123" 
                  defaultValue={conductor.brevete}
                  required
                />

                <div className="panelCRUD_buttonGroup">
                  <button type="reset" onClick={() => navigate(-1)}>
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
