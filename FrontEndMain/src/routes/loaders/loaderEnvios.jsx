export async function loaderEnvios() {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
        // Realizar fetch a todas las APIs necesarias
        const [enviosResponse, estadosResponse] = await Promise.all([
            fetch(`${API_URL}/envios`),
            fetch(`${API_URL}/estados`),
        ]);

        // Verificar que todas las respuestas sean correctas
        if (!enviosResponse.ok || !estadosResponse.ok) {
            throw new Error("Error al cargar los datos");
        }

        // Convertir todas las respuestas a JSON
        const envios = await enviosResponse.json();
        const estados = await estadosResponse.json();

        // Crear mapas para un acceso rápido por ID
        const estadosMap = estados.reduce((map, estado) => {
            if (estado.estado_id && estado.estado_nombre) {
                map[String(estado.estado_id).trim()] = estado.estado_nombre;
            }
            return map;
        }, {});

        // Procesar los vehículos para incluir datos relacionados
        const enviosConDatos = envios.map( (envio) => {
            return {
                ...envio,
                estado_nombre: estadosMap[envio.envio_estado] || "Sin usuario asociado",
            };
        });
        
        // Retornar los datos procesados
        return {
            envios: enviosConDatos,
        };
    } catch (error) {
        console.error("Error en loaderVehiculosYUsuarios:", error);
        throw error;
    }
}
