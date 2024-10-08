import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

const API_URL = 'http://127.0.0.1:5000'; // URL del API

const App = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  // Obtener la lista de items de la API
  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/`);
      if (!response.ok) {
        throw new Error('Error al obtener los items');
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error al obtener los items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Agregar o editar un item en la API
  const addOrEditItem = async (item) => {
    if (item.id) {
      // Si el item tiene un ID, significa que es una actualización
      try {
        const response = await fetch(`${API_URL}/edit/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });

        if (!response.ok) {
          throw new Error('Error al actualizar el item');
        }

        const updatedItem = await response.json();
        setItems(
          items.map((i) => (i.id === item.id ? updatedItem : i))
        );
      } catch (error) {
        console.error('Error al actualizar el item:', error);
      }
    } else {
      // Si el item no tiene un ID, significa que es un nuevo item
      try {
        const response = await fetch(`${API_URL}/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lt: item.lt,
            ln: item.ln,
            fecha: item.fecha,
            nombre: item.nombre,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error al crear el item:', errorData.error);
          return;
        }

        const newItem = await response.json();
        setItems([...items, newItem]);
      } catch (error) {
        console.error('Error al crear el item:', error);
      }
    }
    setCurrentItem(null);
  };

  // Eliminar un item en la API
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el item');
      }

      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error al eliminar el item:', error);
    }
  };

  // Editar un item (solo cambia el estado)
  const editItem = (item) => {
    setCurrentItem(item);
  };

  return (
    <div className="App">
      <h1>CRUD Básico con React y API</h1>
      <ItemForm addOrEditItem={addOrEditItem} currentItem={currentItem} />
      <ItemList items={items} onEdit={editItem} onDelete={deleteItem} />
    </div>
  );
};

export default App;
