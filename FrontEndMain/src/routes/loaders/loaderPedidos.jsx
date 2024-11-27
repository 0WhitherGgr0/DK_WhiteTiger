export async function loaderPedidos() {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
        // 1. Obtener pedidos
        const pedidosResponse = await fetch(`${API_URL}/pedidos`);
        if (!pedidosResponse.ok) {
            throw new Error("Error al cargar los datos de pedidos");
        }
        const pedidos = await pedidosResponse.json();

        console.log("Pedidos sin procesar:", pedidos);

        // 2. Obtener ubicaciones
        const ubicacionesId = [...new Set(pedidos.map(pedido => pedido.ubicacion_id))];
        console.log("Ubicaciones únicas:", ubicacionesId);

        const ubicacionesResponses = await Promise.all(ubicacionesId.map(id => 
            fetch(`${API_URL}/ubicaciones/${id}`)
        ));
        const ubicaciones = await Promise.all(ubicacionesResponses.map(response => response.json()));
        console.log("Ubicaciones cargadas:", ubicaciones);

        const ubicacionesMap = ubicaciones.reduce((map, ubicacion) => {
            map[ubicacion.ubicacion_id] = ubicacion;
            return map;
        }, {});

        // 3. Obtener estados
        const estadosId = [...new Set(pedidos.map(pedido => pedido.pedido_estado))];
        console.log("Estados únicos:", estadosId);

        const estadosResponses = await Promise.all(estadosId.map(id => 
            fetch(`${API_URL}/estados/${id}`)
        ));
        const estados = await Promise.all(estadosResponses.map(response => response.json()));
        console.log("Estados cargados:", estados);

        const estadosMap = estados.reduce((map, estado) => {
            map[estado.estado_id] = estado;
            return map;
        }, {});

        // 4. Combinar pedidos con ubicaciones y estados
        const pedidosUb = pedidos.map((pedido) => ({
            ...pedido,
            latitud: ubicacionesMap[pedido.ubicacion_id]?.latitud || null,
            longitud: ubicacionesMap[pedido.ubicacion_id]?.longitud || null,
            estado: estadosMap[pedido.pedido_estado]?.estado_nombre || "Desconocido",
        }));

        console.log("Pedidos combinados:", pedidosUb);

        return { pedidos: pedidosUb };
    } catch (error) {
        console.error("Error en loaderPedidos:", error);
        throw error;
    }
}
