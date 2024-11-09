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
import { useLoaderData } from 'react-router-dom';

export default function Rutas(){

    const { vehiculos: initialVehiculos = [], pedidosUb: initialPedidos = [] } = useLoaderData();

    console.log(initialVehiculos, "conductores")
    console.log(initialPedidos, "pedidos")

    const [vehiculos, setVehiculos] = useState([])  
    const [conectado, setConectado] = useState(false);

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
        console.log(pedido.latitud, pedido.longitud)
        position.push(L.latLng(pedido.latitud, pedido.longitud));
    })


    async function calculateDistanceMatrix(){

        let numPedidos = position.length - 1;
        let numVehiculos = initialVehiculos.length;
        let capacidad = 40;

        let TABU = 5

        let pedidos = []
        let central = new Orden(0,position[0].lat,position[0].lng,0);
        pedidos.push(central)

        for(let i = 1;i<=numPedidos;i++){
            pedidos.push(new Orden(i,position[i].lat,position[i].lng,getRandom(4,10)))
        }

        const distancias = Array.from({length: position.length},()=>(Array(position.length).fill(0)))
        
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
        
        let solucion = new TabuSearch(numVehiculos,numPedidos,capacidad);
        solucion.solucionInicial(pedidos,distancias);
        solucion.tabuSearch(TABU,distancias)
        let saveSol =solucion.vehiculosSolucion
        setVehiculos(saveSol)
    }



    return (
        <div className='rutas'>
            <button className='rutas_button' onClick={calculateDistanceMatrix}>
                Generar Rutas
            </button>
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

