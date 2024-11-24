export async function loaderVehiculosYUsuarios() {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
        // Realizar fetch a todas las APIs necesarias
        const [vehiculosResponse, usuariosResponse, coloresResponse, marcasResponse, estadosResponse, modelosResponse] = await Promise.all([
            fetch(`${API_URL}/vehiculos`),
            fetch(`${API_URL}/usuarios`),
            fetch(`${API_URL}/colores`),
            fetch(`${API_URL}/marcas`),
            fetch(`${API_URL}/estados`),
            fetch(`${API_URL}/modelos`),
        ]);

        // Verificar que todas las respuestas sean correctas
        if (!vehiculosResponse.ok || !usuariosResponse.ok || !coloresResponse.ok || !marcasResponse.ok || !estadosResponse.ok || !modelosResponse.ok) {
            throw new Error("Error al cargar los datos");
        }

        // Convertir todas las respuestas a JSON
        const vehiculos = await vehiculosResponse.json();
        const usuarios = await usuariosResponse.json();
        const colores = await coloresResponse.json();
        const marcas = await marcasResponse.json();
        const estados = await estadosResponse.json();
        const modelos = await modelosResponse.json();

        // Crear mapas para un acceso rápido por ID
        const estadosMap = estados.reduce((map, estado) => {
            if (estado.estado_id && estado.estado_nombre) {
                map[String(estado.estado_id).trim()] = estado.estado_nombre;
            }
            return map;
        }, {});

        const coloresMap = colores.reduce((map, color) => {
            if (color.color_id && color.color_nombre) {
                map[String(color.color_id).trim()] = color.color_nombre;
            }
            return map;
        }, {});

        const marcasMap = marcas.reduce((map, marca) => {
            if (marca.marca_id && marca.marca_nombre) {
                map[String(marca.marca_id).trim()] = marca.marca_nombre;
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
        const vehiculosConDatos = vehiculos.map((vehiculo) => {
            // Normalizar IDs y manejar casos donde falten datos
            const estadoId = vehiculo.vehiculo_estado_id ? String(vehiculo.vehiculo_estado_id).trim() : null;
            const colorId = vehiculo.vehiculo_color_id ? String(vehiculo.vehiculo_color_id).trim() : null;
            const marcaId = vehiculo.vehiculo_marca_id ? String(vehiculo.vehiculo_marca_id).trim() : null;
            const usuarioId = vehiculo.usuario_id ? String(vehiculo.usuario_id).trim() : null;

            if (!estadoId) {
                console.warn(`Vehículo con ID ${vehiculo.vehiculo_id} no tiene estado definido.`);
            }

            return {
                ...vehiculo,
                estado_nombre: estadosMap[estadoId] || "Desconocido",
                color_nombre: coloresMap[colorId] || "Desconocido",
                marca_nombre: marcasMap[marcaId] || "Desconocido",
                usuario_asociado: usuariosMap[usuarioId] || "Sin usuario asociado",
            };
        });

        // Logs para depuración
        console.log("Vehículos desde la API:", vehiculos);
        console.log("Mapa de estados:", estadosMap);
        console.log("Vehículos procesados con datos:", vehiculosConDatos);

        // Retornar los datos procesados
        return {
            vehiculos: vehiculosConDatos,
            usuarios,
            colores,
            marcas,
            estados,
            modelos,
        };
    } catch (error) {
        console.error("Error en loaderVehiculosYUsuarios:", error);
        throw error;
    }
}
