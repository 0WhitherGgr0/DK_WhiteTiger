import { useState } from "react"
import "../styles/panelCRUD.css"

export default function TextInput({containerClass, value = null, placeholder = "", type = "text", info, name, options}){

    function handleKeyDown(event) {
        if (event.keyCode === 13 ) {
          event.preventDefault();
        }
    }    

    return (
        <div className="panelCRUD_formInput">
            <label htmlFor={name}>{info}</label>
            {value ? 
                <input 
                    onKeyDown={handleKeyDown}  
                    readOnly={true}
                    type={type} 
                    id={name} 
                    value={value}
                    name={name}
                    required={true}
                    placeholder={placeholder}>
                </input> : 
                <input 
                    onKeyDown={handleKeyDown}  
                    type={type} 
                    id={name} 
                    name={name}
                    required={true}
                    placeholder={placeholder}>
                </input>
            }
        </div>
    )

}