export async function loaderColores() {
  const API_URL = import.meta.env.VITE_API_URL;
  
  try {
      const [coloresResponse] = await Promise.all([
          fetch(`${API_URL}/colores/`)
      ]);

      if (!coloresResponse.ok) {
          throw new Error("Error al cargar los datos");
      }

      const colores = await coloresResponse.json();
      console.log("Colores:", colores);
      return { colores };
  } catch (error) {
      console.error("Error en loaderColores:", error);
      throw error;
  }
}
