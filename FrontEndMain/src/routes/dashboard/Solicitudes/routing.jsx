import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
const ROUTE_URL = import.meta.env.VITE_ROUTE_URL;
const routerService = new L.Routing.osrmv1({
  serviceUrl: `${ROUTE_URL}`
});

function addRoute(sourceCity,destinationCity,map,constrolArray,color){
  
    const routingControl = L.Routing.control({
        waypoints: [
          sourceCity,
          destinationCity,
        ],
        draggableWaypoints: false, 
        addWaypoints: false, 
        createMarker: () => null,
        router: routerService,
        showAlternatives: false,
        lineOptions: {
          styles: [{ color: color, weight: 4 }]
        },
        routeWhileDragging: false,
        show: false
    }).addTo(map);

    constrolArray.push(routingControl)
}

const Routing = ({ ruta , color = "#ff0000"}) => {
    const map = useMap();
    
    useEffect(() => {
        if (!map) return;
        
        let constrolArray =  []
        let sourceCity, destinationCity;

        for(let i = 0;i<ruta.length - 1;i++){
          sourceCity = L.latLng(ruta[i].posx,ruta[i].posy);
          destinationCity = L.latLng(ruta[i+1].posx,ruta[i+1].posy);
          addRoute(sourceCity,destinationCity,map,constrolArray,color)
        }

        if(ruta.length != 0){
          let lastPos = ruta.length-1;
          sourceCity = L.latLng(ruta[lastPos].posx,ruta[lastPos].posy);
          destinationCity = L.latLng(ruta[0].posx,ruta[0].posy);
          addRoute(sourceCity,destinationCity,map,constrolArray,color)
        }
      
        return () => {
          constrolArray.map((control)=>{
            map.removeControl(control)
          })
        }
        
    }, []);   

    return null;
}

export default Routing;