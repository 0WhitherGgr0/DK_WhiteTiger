import { forwardRef } from 'react'
import '../../styles/select.css'

const SelectItem = forwardRef((props, ref) => {
    
    function handleKeyDown(event) {
        if (event.keyCode === 13 ) {
          event.preventDefault();
        }
        if(props.isOpen){
            props.changeInfo();
        }
        
    }  

    return (
    <div className="select-item" onClick={props.changeInfo}>
        <input onKeyDown={handleKeyDown}  value = {props.data.value} ref = {ref} type='radio' name={props.name}></input>
        <p>{props.data.label}</p>
    </div>
    )

})

export default SelectItem