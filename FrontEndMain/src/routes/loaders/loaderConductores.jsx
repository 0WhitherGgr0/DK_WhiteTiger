export async function loaderConductores() {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
        const conductoresResponse = await fetch(`${API_URL}/conductores`);

        if (!conductoresResponse.ok) {
            throw new Error("Error al cargar los datos de conductores");
        }

        const conductores = await conductoresResponse.json();

        // Obtener los IDs únicos de usuario de la lista de conductores
        const usuarioIds = [...new Set(conductores.map(conductor => conductor.usuario))];

        // Realizar solicitudes paralelas para obtener los datos de cada usuario
        const usuarioResponses = await Promise.all(usuarioIds.map(id => 
            fetch(`${API_URL}/usuarios/${id}`)
        ));

        const usuarios = await Promise.all(usuarioResponses.map(res => res.json()));

        // Crear un mapa de usuarios con su ID como clave para acceder fácilmente al nombre
        const usuarioMap = usuarios.reduce((map, usuario) => {
            map[usuario.id] = usuario.nombre;  // Ajusta `nombre` según el campo de tu API
            return map;
        }, {});

        // Combina el nombre de usuario con cada conductor
        const conductoresConNombre = conductores.map(conductor => ({
            ...conductor,
            nombre: usuarioMap[conductor.id_usuario] || "Desconocido"
        }));

        return { conductores: conductoresConNombre };
    } catch (error) {
        console.error("Error en loaderConductores:", error);
        throw error;
    }
}
