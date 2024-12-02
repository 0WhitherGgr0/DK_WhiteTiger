export async function loaderMiRuta({params}) {
    const API_URL = import.meta.env.VITE_API_URL;
    const {idRuta} = params

    try {
        // Realizar fetch a todas las APIs necesarias
        const [pedidosResponse] = await Promise.all([
            fetch(`${API_URL}/pedidosRuta/${idRuta}`),
        ]);

        // Verificar que todas las respuestas sean correctas
        if (!pedidosResponse.ok) {
            throw new Error("Error al cargar los datos");
        }

        const misPedidos = await pedidosResponse.json();

        if(misPedidos.length == 0){
            throw new Error("Esta ruta no existe");
        }

        const misPedidosUbicacion = await Promise.all(
            misPedidos.map(async (pedido) => {
                // Obtener los estados del vehículo
                const miUbicacionResponse = await fetch(`${API_URL}/ubicacionPedido/${pedido.pedido_id}`);
                const miUbicacion = await miUbicacionResponse.json();      
                return {
                    ...pedido,
                    lat: miUbicacion[0].latitud || "Desconocido",
                    lng: miUbicacion[0].longitud || "Desconocido",
                };
            })
        );

        console.log(misPedidosUbicacion);

        return {
            pedidos: misPedidosUbicacion,
        };
    } catch (error) {
        console.error("Error en loaderVehiculosYUsuarios:", error);
        throw error;
    }
}
