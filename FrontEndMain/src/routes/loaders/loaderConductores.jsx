export async function loaderConductores() {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
        const conductoresResponse = await fetch(`${API_URL}/conductores/`);
        if (!conductoresResponse.ok) {
            throw new Error("Error al cargar los datos de conductores");
        }
        const conductores = await conductoresResponse.json();

        const usuarioIds = [...new Set(conductores.map((conductor) => conductor.usuario_id))];
        const estadoIds = [...new Set(conductores.map((conductor) => conductor.conductor_estado))];

        // Obtener usuarios
        const usuarioResponses = await Promise.all(
            usuarioIds.map((id) => fetch(`${API_URL}/usuarios/${id}/`))
        );
        const usuarios = await Promise.all(
            usuarioResponses.map((res) => (res.ok ? res.json() : null))
        );

        // Obtener estados
        const estadoResponses = await Promise.all(
            estadoIds.map((id) => fetch(`${API_URL}/estados/${id}/`))
        );
        const estados = await Promise.all(
            estadoResponses.map((res) => (res.ok ? res.json() : null))
        );

        // Crear mapas
        const usuarioMap = usuarios.reduce((map, usuario) => {
            if (usuario) {
                map[usuario.usuario_id] = `${usuario.usuario_nombre} ${usuario.usuario_apellido}`;
            }
            return map;
        }, {});

        const estadoMap = estados.reduce((map, estado) => {
            if (estado && estado.estado_id && estado.estado_nombre) {
                map[estado.estado_id] = estado.estado_nombre;
            }
            return map;
        }, {});

        console.log("Estado Map:", estadoMap); // Verifica que se está generando correctamente

        const conductoresCompletos = conductores.map((conductor) => ({
            ...conductor,
            nombre: usuarioMap[conductor.usuario_id] || "Desconocido",
            conductor_estado: conductor.conductor_estado,
        }));

        return {
            conductores: conductoresCompletos,
            estados: estadoMap, // Pasa el mapeo de estados al componente
        };
    } catch (error) {
        console.error("Error en loaderConductores:", error);
        throw error;
    }
}
