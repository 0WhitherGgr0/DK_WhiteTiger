export async function loaderPedidos() {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
        const pedidosResponse = await fetch(`${API_URL}/pedidos`);

        if (!pedidosResponse.ok) {
            throw new Error("Error al cargar los datos de conductores");
        }

        const pedidos = await pedidosResponse.json();

        console.log(pedidos)

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


        return { pedidos: pedidosUb };
    } catch (error) {
        console.error("Error en loaderConductores:", error);
        throw error;
    }
}
