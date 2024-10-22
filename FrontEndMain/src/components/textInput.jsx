import "../styles/vehiculos.css"

export default function TextInput({containerClass, placeholder = "", type = "text", info, name, options}){

    return (
        <div className="vehiculosBlock_formInput">
            <label htmlFor={name}>{info}</label>
            <input type={type} id={name} name={name} placeholder={placeholder}></input>
        </div>
    )

}