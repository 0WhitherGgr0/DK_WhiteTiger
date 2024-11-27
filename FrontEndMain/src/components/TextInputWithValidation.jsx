import React, { useState } from 'react';

const TextInputWithValidation = ({ containerClass, info, name, placeholder }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value.toUpperCase(); // Convertir a mayúsculas automáticamente
    setValue(inputValue);

    // Validar el formato
    const placaRegex = /^[A-Z]{3}-\d{3}$/;
    if (!placaRegex.test(inputValue)) {
      setError("El formato de la placa debe ser: AAA-123");
    } else {
      setError('');
    }
  };

  return (
    <div className={containerClass}>
      <label>{info}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={7} // Limitar a 7 caracteres
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TextInputWithValidation;
