export async function loaderConductores() {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
        const conductoresResponse = await fetch(`${API_URL}/conductores/`);
        if (!conductoresResponse.ok) {
            throw new Error("Error al cargar los datos de conductores");
        }
        const conductores = await conductoresResponse.json();

        const usuarioIds = [...new Set(conductores.map((conductor) => conductor.usuario_id))];

        // Obtener usuarios
        const usuarioResponses = await Promise.all(
            usuarioIds.map((id) => fetch(`${API_URL}/usuarios/${id}/`))
        );
        const usuarios = await Promise.all(
            usuarioResponses.map((res) => (res.ok ? res.json() : null))
        );

        // Obtener estados

        const estadoResponses = await fetch(`${API_URL}/estados`);
        const estados = await estadoResponses.json()

        // Crear mapas
        const usuarioMap = usuarios.reduce((map, usuario) => {
            if (usuario) {
                map[usuario.usuario_id] = `${usuario.usuario_nombre} ${usuario.usuario_apellido}`;
            }
            return map;
        }, {});

        const estadoMap = estados.reduce((map, estado) => {
            if (estado.estado_id && estado.estado_nombre) {
                map[String(estado.estado_id).trim()] = estado.estado_nombre;
            }
            return map;
        }, {});

        console.log("Estado Map:", estadoMap); // Verifica que se está generando correctamente

        const conductoresCompletos = await Promise.all(
            conductores.map(async (conductor) => {

                // Obtener los estados del vehículo
                const misEstadosResponse = await fetch(`${API_URL}/conductoresEstados/${conductor.conductor_id}`);
                const misEstados = await misEstadosResponse.json();
                console.log(estadoMap);
                const dataEstados = misEstados.map((estado) => {
                    return estadoMap[estado.estado_id];
                });
        
                console.log(dataEstados);
        
                return {
                    ...conductor,
                    nombre: usuarioMap[conductor.usuario_id] || "Desconocido",
                    conductor_estado: dataEstados.length ? dataEstados : "Desconocido",
                };
            })
        );

        return {
            conductores: conductoresCompletos,
            estados: estadoMap, // Pasa el mapeo de estados al componente
        };
    } catch (error) {
        console.error("Error en loaderConductores:", error);
        throw error;
    }
}
