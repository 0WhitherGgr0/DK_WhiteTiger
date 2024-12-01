import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "../../../styles/rutas.css";
import "../../../styles/panelCRUD.css";
import { useRef, useState, useMemo } from "react";
import TextInput from "../../../components/textInput";
import { Form, redirect, useActionData } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const API_URL = import.meta.env.VITE_API_URL;

  const dataUb = {
    referencia: "...",
    latitud: formData.get("latitud"),
    longitud: formData.get("longitud"),
  };

  console.log("Datos de envío enviados al backend:", dataUb);

  let ubID;

  try {
    const response = await fetch(`${API_URL}/ubicaciones/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataUb),
    });
    if (!response.ok) throw new Error("Error al enviar datos ubicación");
    const dataRecieve = await response.json();
    console.log(dataRecieve);
    ubID = dataRecieve.ubicacion_id;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error.message };
  }

  const dataP = {
    cliente_id: 1,
    pedido_peso: formData.get("peso_total"),
    ubicacion_id: ubID,
    pedido_volumen: formData.get("volumen"),
    pedido_precio: 100,
  };

  try {
    const response = await fetch(`${API_URL}/pedidos/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataP),
    });

    if (!response.ok) throw new Error("Error al enviar datos");
    return redirect("/dashboard/solicitudes/pedidos");
  } catch (error) {
    console.error("Error:", error);
    try {
      await fetch(`${API_URL}/ubicaciones/${ubID}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch {
      console.error("Error al eliminar ubicación:");
    }
    return { success: false, error: error.message };
  }
}

const position = [L.latLng(-12.056473685482011, -77.08035977824574)];
position.push([L.latLng(-11.753778766555213, -77.20505046496515)]);
position.push([L.latLng(-12.280324864404214, -76.75529388003694)]);

function MapEvents({ setEvent }) {
  useMapEvents({
    click: (e) => {
      setEvent(e.latlng);
    },
  });

  return null;
}

export default function FormPedido() {
  const [post, setPost] = useState(position[0]);
  const markerRef = useRef(null);
  const actionData = useActionData();
  const [peso, setPeso] = useState("");
  const [volumen, setVolumen] = useState("");
  const bounds = [position[1], position[2]];

  // Validación para valores decimales con hasta 2 dígitos después del punto
  const validateDecimal = (value) => /^\d*(\.\d{0,2})?$/.test(value);

  const markerEvents = useMemo(
    () => ({
      drag() {
        const marker = markerRef.current;
        if (marker != null) {
          setPost(marker.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <>
      <div className="panelCRUD">
        <div className="panelCRUD_tittle">
          <h2>Pedidos</h2>
        </div>
        <div className="panelCRUD_container" style={{ height: "100%" }}>
          <fieldset className="panelCRUD_formContainer">
            <legend>Crear Pedido</legend>
            <div className="panelCRUD_divider" style={{ height: "100%" }}>
              <div className="panelCRUD_map" style={{ height: "100%" }}>
                <MapContainer
                  maxBoundsViscosity={1.0}
                  maxBounds={bounds}
                  center={position[0]}
                  minZoom={11}
                  zoom={15}
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    borderRadius: 10,
                  }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    ref={markerRef}
                    draggable
                    eventHandlers={markerEvents}
                    position={post}
                  />
                  <MapEvents setEvent={setPost} />
                </MapContainer>
              </div>
              <Form method="post" className="panelCRUD_Form">
                <div className="panelCRUD_inputs">
                  {actionData?.error && (
                    <p className="errorMessage">{actionData.error}</p>
                  )}

                  <TextInput
                    containerClass="panelCRUD_formInput"
                    info="Latitud"
                    name="latitud"
                    placeholder="Latitud"
                    value={post.lat}
                    readOnly
                  />
                  <TextInput
                    containerClass="panelCRUD_formInput"
                    info="Longitud"
                    name="longitud"
                    placeholder="Longitud"
                    value={post.lng}
                    readOnly
                  />
                  <TextInput
                    containerClass="panelCRUD_formInput"
                    info="Peso"
                    name="peso_total"
                    type="text"
                    placeholder="0.00"
                    value={peso}
                    validate={validateDecimal}
                    onChange={({ target: { value } }) => setPeso(value)}
                  />
                  <TextInput
                    containerClass="panelCRUD_formInput"
                    info="Volumen"
                    name="volumen"
                    type="text"
                    placeholder="0.00"
                    value={volumen}
                    validate={validateDecimal}
                    onChange={({ target: { value } }) => setVolumen(value)}
                  />
                </div>
                <div className="panelCRUD_buttonGroup">
                  <button type="reset" onClick={() => navigate(-1)}>
                    Cancelar
                  </button>
                  <button type="submit">Guardar</button>
                </div>
              </Form>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
}
