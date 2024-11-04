// Función loader para cargar los datos de los vehículos
export async function loader() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/vehiculos"); // Asegúrate de que esta URL sea la correcta
      if (!response.ok) throw new Error("Error al obtener los datos de vehículos");
  
      const data = await response.json();
      return { vehiculos: data }; // Devuelve los datos en un formato adecuado
    } catch (error) {
      console.error("Error al cargar los datos de vehículos:", error);
      return { vehiculos: [] }; // Retorna un array vacío en caso de error
    }
  }
  