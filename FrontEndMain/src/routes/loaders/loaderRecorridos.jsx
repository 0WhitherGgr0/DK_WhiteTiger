export async function loaderRecorridos() {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
        // Realizar fetch a todas las APIs necesarias
        const [usuariosResponse, recorridosResponse, conductoresResponse, estadosResponse] = await Promise.all([
            fetch(`${API_URL}/usuarios`),
            fetch(`${API_URL}/recorridos`),
            fetch(`${API_URL}/conductores`),
            fetch(`${API_URL}/estados`),
        ]);

        // Verificar que todas las respuestas sean correctas
        if (!usuariosResponse.ok || !recorridosResponse.ok || !conductoresResponse.ok || !estadosResponse.ok) {
            throw new Error("Error al cargar los datos");
        }

        // Convertir todas las respuestas a JSON
        const recorridos = await recorridosResponse.json();
        const usuarios = await usuariosResponse.json();
        const conductores = await conductoresResponse.json();
        const estados = await estadosResponse.json();

        // Crear mapas para un acceso rápido por ID
        const estadosMap = estados.reduce((map, estado) => {
            if (estado.estado_id && estado.estado_nombre) {
                map[String(estado.estado_id).trim()] = estado.estado_nombre;
            }
            return map;
        }, {});

        const usuariosMap = usuarios.reduce((map, usuario) => {
            if (usuario.usuario_id && usuario.usuario_nombre && usuario.usuario_apellido) {
                map[String(usuario.usuario_id).trim()] = `${usuario.usuario_nombre} ${usuario.usuario_apellido}`;
            }
            return map;
        }, {});


        // Procesar los vehículos para incluir datos relacionados
        const recorridoConDatos = await Promise.all(
            recorridos.map(async (recorrido) => {

                // Obtener los estados del vehículo
                const miConductorResponse = await fetch(`${API_URL}/conductores/${recorrido.conductor_id}`);
                const miConductor = await miConductorResponse.json();
                
                return {
                    ...recorrido,
                    estado_nombre: estadosMap[recorrido.recorrido_estado] || "Sin usuario asociado",
                    usuario_asociado: usuariosMap[miConductor.usuario_id] || "Sin usuario asociado",
                };
            })
        );
        
        // Retornar los datos procesados
        return {
            recorridos: recorridoConDatos,
        };
    } catch (error) {
        console.error("Error en loaderVehiculosYUsuarios:", error);
        throw error;
    }
}
