import "../styles/panelCRUD.css";
import SelectInput from "./select/selectInput";

export default function SelectInputLabel({ containerClass, placeholder = "", info, name, options, value, onChange }) {
    return (
        <div className={containerClass}>
            <label htmlFor={name}>{info}</label>
            <SelectInput 
                options={options} 
                name={name} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange} 
            />
        </div>
    );
}
