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

export default function Rutas(){

    const [vehiculos, setVehiculos] = useState([])  
    const [conectado, setConectado] = useState(false);

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
    position.push(L.latLng(-11.8760850840127, -77.02439393022706));
    position.push(L.latLng(-11.894267384523717, -77.04276219744881));
    position.push(L.latLng(-11.922209949664754, -77.05318264671607));
    position.push(L.latLng(-11.933128876055962, -77.06769421918183));
    position.push(L.latLng(-11.942898661252602, -77.07255377847773));
    position.push(L.latLng(-11.967879925267278, -77.07019005515272));
    position.push(L.latLng(-12.004177577956549, -77.06300843689164));
    position.push(L.latLng(-12.070582680999145, -77.12140949328538));
    position.push(L.latLng(-12.083899698425034, -77.09409091669342));
    position.push(L.latLng(-12.081893777313727, -77.07365906718735));
    position.push(L.latLng(-12.074541774910996, -77.0760885619145));
    position.push(L.latLng(-12.056202025166657, -77.06578355193285));
    position.push(L.latLng(-12.045695251053663, -77.05343421983181));
    position.push(L.latLng(-12.033879312991576, -77.0496491304477));
    position.push(L.latLng(-12.017743735693706, -77.05800309082329));
    position.push(L.latLng(-12.095155808480119, -76.98228343311041));

    async function calculateDistanceMatrix(){

        let numPedidos = position.length - 1;
        let numVehiculos = 5
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

    useEffect(()=>{calculateDistanceMatrix()},[])

    return (
        <MapContainer center={position[0]} zoom={15} style={{height: '100%', width: '100%', position: 'relative'}}>  
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
    )
}

