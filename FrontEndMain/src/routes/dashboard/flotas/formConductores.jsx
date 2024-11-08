import { useNavigate, Form, useActionData, useLoaderData } from 'react-router-dom';
import "../../../styles/panelCRUD.css";
import SelectInputLabel from '../../../components/selectInputLabel';
import TextInput from '../../../components/textInput';
import { useUser } from '../../../context/UserContext';

export async function action({ request }) {
  const formData = await request.formData();
  const API_URL = import.meta.env.VITE_API_URL;
  
  const data = {
      usuario: formData.get("id_usuario"),  
      vehiculo: formData.get("id_vehiculo"),
      estado: formData.get("estado"),
      breve: formData.get("breve"), 
  };
  
  console.log("Datos enviados al backend:", data);
  
  try {
      const response = await fetch(`${API_URL}/conductores/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error("Error al enviar datos");
      return { success: true };
  } catch (error) {
      console.error("Error:", error);
      return { success: false, error: error.message };
  }
}

const estados = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Inactivo', value: 'Inactivo' },
];

export default function FormConductor() {
    const navigate = useNavigate();
    const actionData = useActionData();
    const { vehiculos = [], usuarios = [] } = useLoaderData() || {};
    const { userId } = useUser();

    const vehiculoOptions = vehiculos
        .filter(vehiculo => vehiculo.estado === "Activo")
        .map(vehiculo => ({
            label: `${vehiculo.marca} - ${vehiculo.placa}`,
            value: vehiculo.placa 
    }));

    const usuarioOptions = usuarios.map(usuario => ({
      label: usuario.nombre,
      value: usuario.usuario_id 
    }));

    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    return (
        <div className="panelCRUD">
          <div className="panelCRUD_tittle">
            <h2>Conductores</h2>
          </div>
          <div className="panelCRUD_container">
            <fieldset className="panelCRUD_formContainer">
              <legend>Agregar Conductor</legend>
              <Form method="post">
                {actionData?.error && (
                    <p className="errorMessage">{actionData.error}</p>
                )}
                
                <SelectInputLabel 
                  containerClass="panelCRUD_formInput"
                  options={usuarioOptions} 
                  info="Usuario Asociado" 
                  name="id_usuario" 
                  placeholder="Seleccionar usuario" 
                  required 
                />

                <SelectInputLabel 
                  containerClass="panelCRUD_formInput"
                  options={vehiculoOptions} 
                  info="Vehículo Asociado" 
                  name="id_vehiculo" 
                  placeholder="Seleccionar vehículo" 
                  required 
                />

                <SelectInputLabel 
                  containerClass="panelCRUD_formInput"
                  options={estados} 
                  info="Estado" 
                  name="estado" 
                  placeholder="Seleccionar estado" 
                  required
                />
                <TextInput 
                  containerClass="panelCRUD_formInput"
                  info="Brevete" 
                  name="breve"  
                  placeholder="Ej: ABC-123" 
                  required
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
