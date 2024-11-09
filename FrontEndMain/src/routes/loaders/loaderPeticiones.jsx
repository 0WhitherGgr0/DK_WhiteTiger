export async function loaderPeticiones() {
    const API_URL = import.meta.env.VITE_API_URL;
    
    try {

        const [vehiculosResponse, pedidosResponse] = await Promise.all([
            fetch(`${API_URL}/vehiculos`),
            fetch(`${API_URL}/pedidos`)
        ]);
  
        if (!vehiculosResponse.ok || !pedidosResponse.ok) {
            throw new Error("Error al cargar los datos");
        }

        const pedidos = await pedidosResponse.json();

        const ubicacionesId = [...new Set(pedidos.map(pedidos => pedidos.ubicacion))];

        const ubicacionesResponses = await Promise.all(ubicacionesId.map(id => 
            fetch(`${API_URL}/ubicaciones/${id}`)
        ));

        const ubicaciones = await Promise.all(ubicacionesResponses.map((response) => response.json()))

        const ubicacionesMap = ubicaciones.reduce((map, ub) => {
            map[ub.ubicacion_id] = ub;
            return map;
        },{})

        const pedidosUb = pedidos.map((pedido) => (
            {
                ...pedido,
                latitud: ubicacionesMap[pedido.ubicacion].latitud,
                longitud: ubicacionesMap[pedido.ubicacion].longitud
            }
        ))
        const vehiculos = await vehiculosResponse.json();
  
        return { vehiculos, pedidosUb };
    } catch (error) {
        console.error("Error en loaderVehiculosYUsuarios:", error);
        throw error;
    }
  }