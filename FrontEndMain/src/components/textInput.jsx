import { useState } from "react"
import "../styles/panelCRUD.css"

export default function TextInput({containerClass, placeholder = "", type = "text", info, name, options}){

    function handleKeyDown(event) {
        if (event.keyCode === 13 ) {
          event.preventDefault();
        }
    }    

    return (
        <div className="panelCRUD_formInput">
            <label htmlFor={name}>{info}</label>
            <input onKeyDown={handleKeyDown}  type={type} id={name} name={name} placeholder={placeholder}></input>
        </div>
    )

}