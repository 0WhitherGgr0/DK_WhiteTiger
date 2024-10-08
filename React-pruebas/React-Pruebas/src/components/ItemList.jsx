import React from 'react';

const ItemList = ({ items, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Lista de Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id || `${item.lt}-${item.ln}-${item.fecha}`}> {/* Asegúrate de tener un key único */}
            Latitud: {item.lt}, Longitud: {item.ln}, Fecha: {item.fecha}, Nombre: {item.nombre}
            <button onClick={() => onEdit(item)}>Editar</button>
            <button onClick={() => onDelete(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
