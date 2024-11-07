export async function loaderPedidos() {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
        const pedidosResponse = await fetch(`${API_URL}/pedidos`);

        if (!pedidosResponse.ok) {
            throw new Error("Error al cargar los datos de conductores");
        }

        const pedidos = await pedidosResponse.json();

        console.log(pedidos)

        return { pedidos: pedidos };
    } catch (error) {
        console.error("Error en loaderConductores:", error);
        throw error;
    }
}
