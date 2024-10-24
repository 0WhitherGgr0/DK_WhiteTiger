import "../styles/vehiculos.css"
import SelectInput from "./select/selectInput"

export default function SelectInputLabel({containerClass, placeholder = "", info, name, options}){

    return (
        <div className={containerClass}>
            <label htmlFor={name}>{info}</label>
            <SelectInput  options={options} name = {name} placeholder={placeholder}/>
        </div>
    )
}