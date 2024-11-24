import { useNavigate, Form, useLoaderData, useActionData, redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TextInput from '../../../components/textInput';
import SelectInputLabel from '../../../components/selectInputLabel';
import "../../../styles/panelCRUD.css";

const API_URL = import.meta.env.VITE_API_URL;

// Función action para manejar la actualización del conductor
export async function action({ request, params }) {
  const formData = await request.formData();
  const { idConductor } = params;

  // Obtener y preparar los datos del formulario
  const data = {
    usuario_id: parseInt(formData.get("usuario_id"), 10),
    vehiculo_placa: formData.get("vehiculo_placa"),
    conductor_brevete: formData.get("conductor_brevete"),
    conductor_estado: parseInt(formData.get("conductor_estado"), 10),
  };

  console.log("Datos del formulario enviados:", data);

  // Validar datos antes de enviarlos al backend
  if (!data.usuario_id || !data.vehiculo_placa || !data.conductor_brevete || !data.conductor_estado) {
    return { success: false, error: "Todos los campos son obligatorios." };
  }

  try {
    const response = await fetch(`${API_URL}/conductores/${idConductor}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar el conductor. Estado: ${response.status}, Error: ${errorText}`);
    }
    alert("Conductor actualizado correctamente.");
    return redirect("/dashboard/flotas/conductores");
  } catch (error) {
    console.error("Error en action:", error);
    return { success: false, error: error.message };
  }
}

// Función loader para cargar los datos necesarios
export async function loader({ params }) {
  const { idConductor } = params;

  try {
    const conductorResponse = await fetch(`${API_URL}/conductores/${idConductor}/`);
    if (!conductorResponse.ok) {
      throw new Error('Error al cargar los datos del conductor');
    }
    const conductor = await conductorResponse.json();

    const vehiculosResponse = await fetch(`${API_URL}/vehiculos/`);
    if (!vehiculosResponse.ok) {
      throw new Error('Error al cargar los datos de vehículos');
    }
    const vehiculos = await vehiculosResponse.json();

    const estadosResponse = await fetch(`${API_URL}/estados/`);
    if (!estadosResponse.ok) {
      throw new Error('Error al cargar los datos de estados');
    }
    const estados = await estadosResponse.json();

    return { conductor, vehiculos, estados };
  } catch (error) {
    console.error("Error en loader:", error);
    throw error;
  }
}

// Componente principal
export default function FormConductorEdit() {
  const navigate = useNavigate();
  const { conductor, vehiculos, estados } = useLoaderData();
  const actionData = useActionData();

  // Construir opciones de estado utilizando los IDs
  const estadoOptions = estados.map((estado) => ({
    label: estado.estado_nombre,
    value: estado.estado_id,
  }));

  // Filtrar vehículos con estado "Activo" y construir opciones con marca y placa
  const vehiculoOptions = vehiculos
    .filter((vehiculo) => vehiculo.vehiculo_estado?.estado_nombre === "Activo")
    .map((vehiculo) => ({
      label: `${vehiculo.vehiculo_marca?.marca_nombre || "Sin marca"} - ${vehiculo.vehiculo_placa}`,
      value: vehiculo.vehiculo_placa,
    }));

  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    usuario_id: conductor?.usuario_id?.usuario_id || conductor?.usuario_id || "",
    vehiculo_placa: conductor?.vehiculo_placa?.vehiculo_placa || "",
    conductor_brevete: conductor?.conductor_brevete || "",
    conductor_estado: conductor?.conductor_estado?.estado_id || "",
  });

  // Actualizar el estado cuando se cargue el conductor
  useEffect(() => {
    if (conductor) {
      setFormData({
        usuario_id: conductor.usuario_id?.usuario_id || conductor.usuario_id || "",
        vehiculo_placa: conductor.vehiculo_placa?.vehiculo_placa || "",
        conductor_brevete: conductor.conductor_brevete,
        conductor_estado: conductor.conductor_estado?.estado_id || "",
      });
    }
  }, [conductor]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Evitar el submit con Enter
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
            {actionData?.error && <p className="errorMessage">{actionData.error}</p>}

            <input
              type="hidden"
              name="usuario_id"
              value={formData.usuario_id || ""}
              onChange={handleChange}
            />

            <SelectInputLabel
              containerClass="panelCRUD_formInput"
              options={vehiculoOptions}
              info="Vehículo Asociado"
              name="vehiculo_placa"
              placeholder="Seleccionar vehículo"
              value={formData.vehiculo_placa}
              onChange={handleChange}
              required
            />

            <SelectInputLabel
              containerClass="panelCRUD_formInput"
              options={estadoOptions}
              info="Estado"
              name="conductor_estado"
              placeholder="Seleccionar estado"
              value={formData.conductor_estado}
              onChange={handleChange}
              required
            />

            <TextInput
              containerClass="panelCRUD_formInput"
              info="Brevete"
              name="conductor_brevete"
              placeholder="Ej: ABC-123"
              validate={(value) => /^\d{0,9}$/.test(value)}
              value={formData.conductor_brevete}
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
