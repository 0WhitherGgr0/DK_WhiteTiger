import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker} from 'react-leaflet'
import L from "leaflet";
import { Polyline } from 'react-leaflet';
import "../../../styles/rutas.css"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import Orden from './orden';
import Routing from './routing';
import getDistance from './routerMachineDistance';
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';

export async function action({ request }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const formData = await request.formData();
    const accion = formData.get('accion');
    const pedidos = JSON.parse(formData.get("pedidos"));
    const reccoridoId = pedidos[0].recorrido_id;
     
    let recorridoEstado = 13;
    if(accion == 1){
        recorridoEstado = 14;
    }

    const recorridoNewState = await fetch(`${API_URL}/recorridos/${reccoridoId}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({recorrido_estado: recorridoEstado}),
    });
    const miRecorrido = await recorridoNewState.json();

    const conductorId = miRecorrido.conductor_id;
    const vehiculoId = miRecorrido.vehiculo_id;

    const conductorEstadosResponse = await fetch(`${API_URL}/conductoresEstados/${conductorId}/`);
    const conductorEstados = await conductorEstadosResponse.json();
    let idEstadoChange;
    conductorEstados.forEach(estado => {
        if(estado.estado_id == 8){
          idEstadoChange = estado.id;
        }
    });   
    const nuevoEstadoConductor = await fetch(`${API_URL}/registros-conductor/${idEstadoChange}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({estado_id: 7}),
    });

    const vehiculoEstadosResponse = await fetch(`${API_URL}/vehiculosEstados/${vehiculoId}/`);
    const vehiculorEstados = await vehiculoEstadosResponse.json();
    vehiculorEstados.forEach(estado => {
        if(estado.estado_id == 8){
          idEstadoChange = estado.id;
        }
    });   
    const nuevoEstadoVehiculo = await fetch(`${API_URL}/registros-vehiculo/${idEstadoChange}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({estado_id: 7}),
    });

    let pedidoEstado = 1;
    let envioEstado = 11;
    if(accion == 1){
        pedidoEstado = 5;
        envioEstado = 5;
    }

    await Promise.all(pedidos.map(async (pedido) => {
        
        const envioId = pedido.envio_id;
        const pedidoId = pedido.pedido_id;
        const envioNewState = await fetch(`${API_URL}/envios/${envioId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({envio_estado: envioEstado}),
        });

        const pedidoNewState = await fetch(`${API_URL}/pedidos/${pedidoId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({pedido_estado: pedidoEstado}),
        });

        console.log(pedidoNewState)
        
    }))

    return redirect("/dashboard/solicitudes/ordenes");
  }


export default function MiRuta(){
    const navigate = useNavigate();       
    const { pedidos: initialPedidos = []} = useLoaderData();
    const [conectado, setConectado] = useState(false);
    const [terminado, setTerminado] = useState(false);
    const [rutas, setRutas] = useState([]);
    const [position, setPosition] = useState([]);

    const generateRutes = async() =>{

        const recorridoId = initialPedidos[0].recorrido_id;
        const API_URL = import.meta.env.VITE_API_URL;

        const recorridoNewState = await fetch(`${API_URL}/recorridos/${recorridoId}/`);
        const miRecorrido = await recorridoNewState.json();

        if(miRecorrido.recorrido_estado != 12){
            setTerminado(true);
        }

        const center = L.latLng( -12.056473685482011, -77.08035977824574)
        const conectar = await getDistance(center, center).then(distance => {return true}).catch(err => {return false})
        setConectado(conectar)
        const position = [L.latLng( -12.056473685482011, -77.08035977824574)];

        const central = new Orden(0,position[0].lat,position[0].lng,0,-1)
        const rutas = [];

        const pedidosMap = initialPedidos.reduce((map, pedido) => {
            map[pedido.envio_id] = pedido
            return map;
        }, {});

        const pedidosNext = initialPedidos.reduce((map, pedido) => {
            map[pedido.envio_anterior] = pedido.envio_id;
            return map;
        }, {});

        rutas.push(central);
        let actualPedido = -1;
        actualPedido = pedidosNext[actualPedido];
        while(actualPedido != undefined){
            const pedidoCurrent = pedidosMap[actualPedido];
            
            rutas.push(new Orden(0,pedidoCurrent.lat,pedidoCurrent.lng,0,-1))

            actualPedido = pedidosNext[actualPedido];
        }
        
        initialPedidos.map((pedido) => {
            position.push(L.latLng(pedido.lat, pedido.lng));
        })
        setPosition(position)
        setRutas(rutas)
    }

    useEffect( () => {
        generateRutes()
    }, [])

    const bounds = [
        [L.latLng(-11.753778766555213, -77.20505046496515)], 
        [L.latLng(-12.280324864404214, -76.75529388003694)] 
    ];

    return (
        <div className='rutas'>
            {!terminado && (
                <div className="buttonGroup">
                    <Form method='post'>
                        <input type="hidden" name="pedidos" value={JSON.stringify(initialPedidos)} />
                        <button type="submit" name="accion" value={1} className='rutas_button'>
                            Marcar como exitoso
                        </button>
                    </Form>
                    <Form method='post'>
                         <input type="hidden" name="pedidos" value={JSON.stringify(initialPedidos)} />    
                        <button type="submit" name="accion" value={2} className='rutas_button'>
                            Marcar como fallido
                        </button>
                    </Form>

                </div>
            )}
            
            <div className="rutas_map">
                <MapContainer maxBoundsViscosity={1.0} maxBounds = {bounds} center={position[0]} minZoom={11} zoom={15} style={{height: '100%', width: '100%', position: 'relative'}}>  
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {position.map((pos)=>(
                        <Marker position={pos} key={pos.lat}/>
                    ))}
                    
                    {
                        rutas.length !== 0 && !conectado && (
                            <Polyline
                                positions={rutas.map(ruta => [ruta.posx, ruta.posy]).concat([[rutas[0].posx, rutas[0].posy]])}
                            />
                        )
                    }

                    {
                        rutas.length != 0 && conectado &&
                            <Routing ruta={rutas} color={"#FF0000"} />
                    }

                </MapContainer>     
            </div>
        </div>
    )

}