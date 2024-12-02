import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker} from 'react-leaflet'
import L from "leaflet";
import { Polyline } from 'react-leaflet';
import "../../../styles/rutas.css"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import Routing from './routing';
import calculateDistance from './routerDistance';
import Orden from './orden';
import TabuSearch from './tabuSearch';
import getDistance from './routerMachineDistance';
import { Form, useLoaderData } from 'react-router-dom';

export async function action({ request }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const formData = await request.formData();
    const vehiculos = JSON.parse(formData.get("vehiculos"));
    const allResponses = await Promise.all(vehiculos.forEach(async (vehiculo) => {
            console.log(vehiculo);
            //Modificar Estados
            const conductor = vehiculo.id_conductor;
            const conductorEstadosResponse = await fetch(`${API_URL}/conductoresEstados/${conductor}/`);
            const conductorEstados = await conductorEstadosResponse.json();
            let idEstadoChange;
            console.log(conductorEstados)
            conductorEstados.forEach(estado => {
                if(estado.estado_id == 7){
                  idEstadoChange = estado.id;
                }
            });   
            const nuevoEstadoConductor = await fetch(`${API_URL}/registros-conductor/${idEstadoChange}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({estado_id: 8}),
            });
            console.log("Cod mod", nuevoEstadoConductor);

            const placa = vehiculo.id_placa;
            const vehiculoEstadosResponse = await fetch(`${API_URL}/vehiculosEstados/${placa}/`);
            const vehiculorEstados = await vehiculoEstadosResponse.json();
            vehiculorEstados.forEach(estado => {
                if(estado.estado_id == 7){
                  idEstadoChange = estado.id;
                }
            });   
            const nuevoEstadoVehiculo = await fetch(`${API_URL}/registros-vehiculo/${idEstadoChange}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({estado_id: 8}),
            });
            console.log("Veh mod", nuevoEstadoVehiculo);

            //Crear Ruta
            const rutas = vehiculo.ruta;
            const dataRuta = {
                recorrido_carga: vehiculo.carga,  
                recorrido_distancia: Math.ceil(vehiculo.curRecor),
                conductor_id: conductor,
                vehiculo_id: placa,
                recorrido_estado: 12 
            };
            const responseRuta = await fetch(`${API_URL}/recorridos/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataRuta)
            });
            const nuevaRuta = await responseRuta.json();
            const idRuta = nuevaRuta.recorrido_id;
            console.log("Ruta creada", responseRuta);

            const cantidadRutas = rutas.length;
            let prevEnvio = -1;
            let envioActual;
            for(let i = 1;i<cantidadRutas - 1;i++){
                envioActual = rutas[i].pedido_id;
                //Editar estado pedido
                const nuevoEstadoPedido = await fetch(`${API_URL}/pedidos/${envioActual}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({pedido_estado: 2}),
                });
                console.log("Veh mod", nuevoEstadoPedido);

                //Crear nuevo envio
                const dataEnvio = {
                    recorrido_id: idRuta,
                    pedido_id : envioActual,
                    envio_estado: 12,
                    envio_anterior: prevEnvio
                };
                const responseEnvio = await fetch(`${API_URL}/envios/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dataEnvio)
                });
                console.log("Env", responseEnvio)
                const nuevoEnvio = await responseEnvio.json();
                const idEnvio = nuevoEnvio.envio_id;
                prevEnvio = idEnvio;
            }
        })
    )
    console.log("FIN");
    return redirect("/dashboard/solicitudes/ordenes");
};

export default function Rutas(){

    const { conductoresConVehiculo: initialVehiculos = [], pedidosUb: initialPedidos = [] } = useLoaderData();
    console.log(initialVehiculos)
    console.log(initialPedidos)
    const [vehiculos, setVehiculos] = useState([])  
    const [conectado, setConectado] = useState(false);
    const [generado, setGenerado]   = useState(false);
    
    const bounds = [
        [L.latLng(-11.753778766555213, -77.20505046496515)], 
        [L.latLng(-12.280324864404214, -76.75529388003694)] 
    ];

    function getRandom(start,end){
        return (Math.floor(Math.random()*end) + start);
    }

    function getRandomColor() {
        const r = Math.floor(Math.random() * 128) + 128; 
        const g = Math.floor(Math.random() * 128) + 128; 
        const b = Math.floor(Math.random() * 128) + 128; 

        return `rgb(${r}, ${g}, ${b})`;
    }

    const position = [L.latLng( -12.056473685482011, -77.08035977824574)];

    initialPedidos.map((pedido) => {
        position.push(L.latLng(pedido.latitud, pedido.longitud));
    })

    async function calculateDistanceMatrix(){

        
        let numPedidos = position.length - 1;
        let numVehiculos = initialVehiculos.length;

        if(numVehiculos == 0){
            alert("No hay conductores disponibles, cree o libere a un conductor");
            return false;
        }

        if(numPedidos == 0){
            alert("No hay pedidos disponibles");
            return false;
        }

        let TABU = 5
        let pedidos = []
        let central = new Orden(0,position[0].lat,position[0].lng,0,-1);
        pedidos.push(central)

        for(let i = 1;i<=numPedidos;i++){
            pedidos.push(new Orden(
                i,
                position[i].lat,
                position[i].lng,
                Number(initialPedidos[i-1].pedido_volumen),
                initialPedidos[i-1].pedido_id
            ))
        }

        //Crear la matriz de distancias entre cada nodo
        const distancias = Array.from({length: position.length},()=>(Array(position.length).fill(0)))
        //Verificar si se encuentra activado el OSRM 
        const conectar = await getDistance(position[0], position[0]).then(distance => {return true}).catch(err => {return false})
       
        setConectado(conectar);

        if(conectar){
            const promises = [];
            for(let i = 0;i<position.length;i++){
                for(let j =0;j<position.length;j++){
                    const promise = getDistance(position[i], position[j])
                    .then(distance => {
                        distancias[i][j] = distance;
                    }).catch(err =>{
                        console.log(err)
                    });
                    promises.push(promise);
                }
            }
            await Promise.all(promises);
        }else{
            let distance;
            for(let i = 0;i<position.length;i++){
                for(let j =i;j<position.length;j++){
                    distance = calculateDistance(position[i], position[j]);
                    distancias[i][j] = distance;
                    distancias[j][i] = distance;
                }
            }
        }

        let solucion = new TabuSearch(numVehiculos,numPedidos,initialVehiculos);
        solucion.solucionInicial(pedidos,distancias);
        solucion.tabuSearch(TABU,distancias)
        let saveSol =solucion.vehiculosSolucion
        console.log("Solucion", saveSol);
        setGenerado(true);
        setVehiculos(saveSol);
    }


    return (
        <div className='rutas'>
            <div className="buttonGroup">
                {!generado ? 
                    (<button className='rutas_button' onClick={calculateDistanceMatrix}>
                        Generar Rutas
                    </button>) :

                    (
                        <Form method='post'>
                            <button type='submit' 
                            className='rutas_button'
                            name="vehiculos" 
                            value={JSON.stringify(vehiculos)}>
                                Guardar Rutas
                            </button>
                        </Form>
                    )
                }
            </div>
            <div className="rutas_map">
                <MapContainer maxBoundsViscosity={1.0} maxBounds = {bounds} center={position[0]} minZoom={11} zoom={15} style={{height: '100%', width: '100%', position: 'relative'}}>  
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {position.map((pos)=>(
                        <Marker position={pos}/>
                    ))}
                    
                    {vehiculos.length != 0 && !conectado &&
                        vehiculos.map((vehiculo,index) =>{
                            const positions = [];
                            for(let i = 0;i<vehiculo.ruta.length;i++){
                                positions.push([vehiculo.ruta[i].posx,vehiculo.ruta[i].posy])}
                            if(vehiculo.ruta.length){
                                positions.push([vehiculo.ruta[0].posx,vehiculo.ruta[0].posy])
                                
                                return (<Polyline
                                    key={index}
                                    positions={positions}
                                    pathOptions={{ color: getRandomColor() }}
                                />)    
                            }
                            return null
                        })
                    }

                    {vehiculos.length != 0 && conectado &&
                        vehiculos.map((vehiculo) => (
                            <Routing ruta={vehiculo.ruta} color={getRandomColor()}/>
                        ))
                    }

                </MapContainer>     
            </div>
        </div>
           
    )
}

