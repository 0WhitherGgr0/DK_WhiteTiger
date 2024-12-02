import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
const ROUTE_URL = import.meta.env.VITE_ROUTE_URL;
const router = new L.Routing.OSRMv1({
    serviceUrl: `${ROUTE_URL}`
})

export default function getDistance(start, end) {
    return new Promise((resolve, reject) => {
        router.route([L.routing.waypoint(start), L.routing.waypoint(end)], (err, routes) => {
            if (err) {
                reject(err || 'No se encontró la ruta');
            } else {
                const distance = routes[0].summary.totalDistance;
                resolve(distance);
            }
        });
    });
}

