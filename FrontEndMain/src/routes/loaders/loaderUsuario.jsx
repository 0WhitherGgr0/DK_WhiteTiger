export async function loaderUsuario() {
  const API_URL = import.meta.env.VITE_API_URL;
  
  try {
      const [ usuariosResponse] = await Promise.all([
          fetch(`${API_URL}/usuarios`)
      ]);

      if (!usuariosResponse.ok) {
          throw new Error("Error al cargar los datos");
      }

      const usuarios = await usuariosResponse.json();

      return { usuarios };
  } catch (error) {
      console.error("Error en loaderUsuario:", error);
      throw error;
  }
}
