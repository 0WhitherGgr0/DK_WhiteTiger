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
    vehiculo_placa: formData.get("vehiculo_placa"),
  };

  console.log("Datos del formulario enviados:", data);

  // Validar datos antes de enviarlos al backend
  if (!data.vehiculo_placa) {
    return { success: false, error: "Todos los campos son obligatorios." };
  }


  let idVehiculoAntiguo;
  try {
    
    const responseAux = await fetch(`${API_URL}/conductores/${idConductor}/`);
    const responseActual = await responseAux.json();
    idVehiculoAntiguo = responseActual.vehiculo_placa;
    
    const response = await fetch(`${API_URL}/conductores/${idConductor}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar el conductor. Estado: ${response.status}, Error: ${errorText}`);
    }
    alert("Conductor actualizado correctamente.");
    
  } catch (error) {
    console.error("Error en action:", error);
    return { success: false, error: error.message };
  }

  console.log("Antiguo", idVehiculoAntiguo)
  const responseEstadosAntiguos = await fetch(`${API_URL}/vehiculosEstados/${idVehiculoAntiguo}`);
  const misEstadosAntiguos = await responseEstadosAntiguos.json();
  console.log("Mis Estados", misEstadosAntiguos)
  let idEstadoOldChange, idEstadoDelete;
  
  misEstadosAntiguos.forEach(estado => {
    if(estado.estado_id == 2){
      idEstadoOldChange = estado.id;
    }
    if(estado.estado_id == 7){
      idEstadoDelete = estado.id
    }
  });

  const responseOldChange = await fetch(`${API_URL}/registros-vehiculo/${idEstadoOldChange}/`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({estado_id: 6}),
  });
  console.log("Cambiar estado", responseOldChange);

  const responseOldDelete = await fetch(`${API_URL}/registros-vehiculo/${idEstadoDelete}/`, {
    method: 'DELETE'
  });
  console.log("Eliminar estado", responseOldChange);


  const responseEstados = await fetch(`${API_URL}/vehiculosEstados/${data.vehiculo_placa}`);
  const misEstados = await responseEstados.json();
  console.log("Mis Estados", misEstados)
  let idEstadoChange;
  
  misEstados.forEach(estado => {
    if(estado.estado_id == 6){
      idEstadoChange = estado.id;
    }
  });
  
  const responseChange = await fetch(`${API_URL}/registros-vehiculo/${idEstadoChange}/`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({estado_id: 2}),
  });
  
  const newData = {
    estado_id: 7, 
    vehiculo_placa: formData.get("vehiculo_placa")
  }

  const addChange = await fetch(`${API_URL}/registros-vehiculo/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
  });

  return redirect("/dashboard/flotas/conductores");
}


// Componente principal
export default function FormConductorEdit() {
  const navigate = useNavigate();
  const { conductor, vehiculos = []} = useLoaderData();
  const actionData = useActionData();

  // Filtrar vehículos con estado "Activo" y construir opciones con marca y placa
  const vehiculoOptions = vehiculos
        .filter(vehiculo => vehiculo.estado_nombre.includes("Sin asignar"))
        .map(vehiculo => ({
            label: `${vehiculo.marca_nombre} - ${vehiculo.vehiculo_placa}`,
            value: vehiculo.vehiculo_placa 
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
