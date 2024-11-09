import { useNavigate, Form, useLoaderData, useActionData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TextInput from '../../../components/textInput';
import SelectInputLabel from '../../../components/selectInputLabel';
import "../../../styles/panelCRUD.css";

const API_URL = import.meta.env.VITE_API_URL;

export async function action({ request, params }) {
  const formData = await request.formData();
  const { idConductor } = params;

  const data = {
      usuario: formData.get("usuario_id"),
      vehiculo: formData.get("vehiculo_id"),
      breve: formData.get("breve"),
      estado: formData.get("estado")
  };

  try {
      const response = await fetch(`${API_URL}/conductores/${idConductor}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al actualizar el conductor. Estado: ${response.status}, Error: ${errorText}`);
      }
      alert("Conductor actualizado correctamente.");
      return redirect("/dashboard/flotas/conductores");
  } catch (error) {
      return { success: false, error: error.message };
  }
}

export async function loader({ params }) {
  const { idConductor } = params;

  const conductorResponse = await fetch(`${API_URL}/conductores/${idConductor}`);
  if (!conductorResponse.ok) {
      throw new Error('Error al cargar los datos del conductor');
  }
  const conductor = await conductorResponse.json();

  const vehiculosResponse = await fetch(`${API_URL}/vehiculos`);
  if (!vehiculosResponse.ok) {
      throw new Error('Error al cargar los datos de vehículos');
  }
  const vehiculos = await vehiculosResponse.json();

  return { conductor, vehiculos };
}

export default function FormVehiculoEdit() {
    const navigate = useNavigate();
    const { conductor, vehiculos } = useLoaderData();
    const actionData = useActionData();

    const estadoOptions = [
        { label: 'Activo', value: 'Activo' },
        { label: 'Inactivo', value: 'Inactivo' }
    ];

    // Filtrar vehículos con estado "Activo"
    const vehiculoOptions = vehiculos
        .filter(vehiculo => vehiculo.estado === "Activo")
        .map(vehiculo => ({
            label: `${vehiculo.marca} - ${vehiculo.placa}`,
            value: vehiculo.placa 
        }));

    const [formData, setFormData] = useState({
        usuario_id: conductor?.usuario || '',
        vehiculo_id: conductor?.vehiculo || '',
        breve: conductor?.breve || '',
        estado: conductor?.estado || ''
    });

    useEffect(() => {
        if (conductor) {
            setFormData({
                usuario_id: conductor.usuario,
                vehiculo_id: conductor.vehiculo,
                breve: conductor.breve,
                estado: conductor.estado
            });
        }
    }, [conductor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        console.log("Formulario actualizado:", { [name]: value });
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    };

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

                <input
                  type="hidden"
                  name="usuario_id"
                  value={formData.usuario_id || ''}
                  onChange={handleChange}
                />

                <SelectInputLabel 
                  containerClass="panelCRUD_formInput"
                  options={vehiculoOptions} 
                  info="Vehículo Asociado" 
                  name="vehiculo_id" 
                  placeholder="Seleccionar vehículo"
                  value={formData.vehiculo_id}
                  onChange={handleChange}
                  required 
                />

                <SelectInputLabel 
                  containerClass="panelCRUD_formInput"
                  options={estadoOptions} 
                  info="Estado" 
                  name="estado" 
                  placeholder="Seleccionar estado" 
                  value={formData.estado}
                  onChange={handleChange}
                  required
                />

                <TextInput 
                  containerClass="panelCRUD_formInput"
                  info="Brevete" 
                  name="breve"  
                  placeholder="Ej: ABC-123" 
                  value={formData.breve}
                  onChange={handleChange}
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
