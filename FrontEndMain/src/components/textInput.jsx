import { useEffect, useState } from "react";
import "../styles/panelCRUD.css";

export default function TextInput({
  containerClass,
  value = "",
  placeholder = "",
  type = "text",
  info,
  name,
  onChange,
  step = "1",
  validate,
}) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event) => {
    let newValue = event.target.value;

    newValue = newValue.replace(',', '.');

    if (validate && !validate(newValue)) return;

    setInputValue(newValue);
    onChange && onChange({ target: { name, value: newValue } });
  };

  return (
    <div className={containerClass}>
      <label htmlFor={name}>{info}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        required
        step={step}
      />
    </div>
  );
}
