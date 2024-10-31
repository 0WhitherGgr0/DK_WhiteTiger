import L from "leaflet";
import "leaflet-routing-machine"
import 'leaflet/dist/leaflet.css';

export default function calculateDistance(start,end) {
    const R = 6371000; 
    const dLat = (end.lat - start.lat) * (Math.PI / 180);
    const dLon = (end.lng - start.lng) * (Math.PI / 180);

    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(start.lat * (Math.PI / 180)) * Math.cos(end.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
 }