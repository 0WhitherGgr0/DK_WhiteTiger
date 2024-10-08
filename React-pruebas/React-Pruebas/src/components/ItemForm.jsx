import React, { useState, useEffect } from 'react';

const ItemForm = ({ addOrEditItem, currentItem }) => {
  const [item, setItem] = useState({
    lt: '',
    ln: '',
    fecha: '',
    nombre: '',
  });

  useEffect(() => {
    if (currentItem) {
      setItem(currentItem);
    }
  }, [currentItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEditItem(item);
    setItem({ lt: '', ln: '', fecha: '', nombre: '' });
  };

  return (
    <div>
      <h2>{item.id ? 'Editar Item' : 'Agregar Item'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="lt"
          placeholder="Latitud"
          value={item.lt}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="ln"
          placeholder="Longitud"
          value={item.ln}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="fecha"
          value={item.fecha}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={item.nombre}
          onChange={handleInputChange}
        />
        <button type="submit">{item.id ? 'Actualizar' : 'Agregar'}</button>
      </form>
    </div>
  );
};

export default ItemForm;
