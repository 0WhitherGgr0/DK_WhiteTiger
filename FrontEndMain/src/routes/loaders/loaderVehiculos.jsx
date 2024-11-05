export async function loaderVehiculosYUsuarios() {
  const API_URL = import.meta.env.VITE_API_URL;
  
  try {
      const [vehiculosResponse, usuariosResponse] = await Promise.all([
          fetch(`${API_URL}/vehiculos`),
          fetch(`${API_URL}/usuarios`)
      ]);

      if (!vehiculosResponse.ok || !usuariosResponse.ok) {
          throw new Error("Error al cargar los datos");
      }

      const vehiculos = await vehiculosResponse.json();
      const usuarios = await usuariosResponse.json();

      return { vehiculos, usuarios };
  } catch (error) {
      console.error("Error en loaderVehiculosYUsuarios:", error);
      throw error;
  }
}
