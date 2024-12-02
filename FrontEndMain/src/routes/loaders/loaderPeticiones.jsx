export async function loaderPeticiones() {
    const API_URL = import.meta.env.VITE_API_URL;
    
    try {

        const [conductoresResponse, pedidosResponse] = await Promise.all([
            fetch(`${API_URL}/conductores`),
            fetch(`${API_URL}/pedidos`)
        ]);
  
        if (!conductoresResponse.ok || !pedidosResponse.ok) {
            throw new Error("Error al cargar los datos");
        }

        const pedidosSinFiltrar = await pedidosResponse.json();
        const pedidos = pedidosSinFiltrar.filter((item) => item.pedido_estado === 1);

        const ubicacionesId = [...new Set(pedidos.map(pedidos => pedidos.ubicacion_id))];

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
                latitud: ubicacionesMap[pedido.ubicacion_id].latitud,
                longitud: ubicacionesMap[pedido.ubicacion_id].longitud
            }
        ))

        const conductores = await conductoresResponse.json();
  
        const conductoresConVehiculoNFiltro = await Promise.all(
            conductores.map(async (conductor) => {
                // Obtener los datos del vehiculo relacionado
                const miVehiculoResponse = await fetch(`${API_URL}/vehiculos/${conductor.vehiculo_placa}`);
                const miVehiculo = await miVehiculoResponse.json();
                
                const misEstadosResponse = await fetch(`${API_URL}/vehiculosEstados/${conductor.vehiculo_placa}`);
                const misEstados = await misEstadosResponse.json();
                const dataEstados = misEstados.map((estado) => {
                    return estado.estado_id;
                });

                return {
                    ...conductor,
                    vehiculo_estados: dataEstados,
                    vehiculo_capacidad: miVehiculo.vehiculo_capacidad,
                    vehiculo_distancia: miVehiculo.vehiculo_max_dist_dia
                };
            })
        );

        const conductoresConVehiculo = conductoresConVehiculoNFiltro.filter((conductor) => conductor.vehiculo_estados.includes(7))

        return { conductoresConVehiculo, pedidosUb };
    } catch (error) {
        console.error("Error en loaderVehiculosYUsuarios:", error);
        throw error;
    }
  }