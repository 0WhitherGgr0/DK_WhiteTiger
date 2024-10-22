import "../styles/vehiculos.css"

export default function SelectInput({containerClass, placeholder = "", info, name, options}){

    return (
        <div className={containerClass}>
            <label htmlFor={name}>{info}</label>
            <select name={name} id={name}>
                {placeholder.length !== 0 &&
                <option value="" disabled selected>{placeholder}</option>}
                {options.map((option) => (
                    <option value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}