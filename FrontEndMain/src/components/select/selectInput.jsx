import '../../styles/select.css'
import React, { forwardRef } from 'react'
import SelectButton from './selectButton'
import SelectContent from './selectContent'
import { useState, useEffect, useRef} from 'react'
import SelectItem from './selectItem'



const SelectInput = ({name, placeholder, options}) => {

    const [open, setOpen] = useState(false);
    const [currInfo, setCurrInfo] = useState({info: placeholder, id: options[0].label + options[0].value});
    const selectRef = useRef();
    const refsInputs = useRef(new Map());

    useEffect(()=>{
        const handlerCancelation = (event) =>{
            if(selectRef.current &&
                !selectRef.current.contains(event.target)
            ){
                setOpen(false);
            }
        }
        document.addEventListener("click",handlerCancelation);

        return (()=>document.removeEventListener("click",handlerCancelation))

    },[selectRef])

    const activateSelect = function(){
        setOpen((prev) => !prev);
    }

    const setRef = function(key, element){
        if (element) {
            refsInputs.current.set(key, element); 
        } else {
            refsInputs.current.delete(key); 
        }
    };

    const handleFocus = (key) => {
        if(refsInputs.current){
            const element = refsInputs.current.get(key);
            if (element) {
                element.checked = true;
                element.focus();
            }
        }   
    };

    const changeMainInfo = function(label,id){
        setCurrInfo({info: label, id: id})
        activateSelect();    
    }

  return (
    <div className='custom-select' ref={selectRef}>
        <SelectButton info = {currInfo} action = {()=>{handleFocus(currInfo.id);activateSelect();}}>
        </SelectButton>
        <SelectContent isOpen = {open} width = {selectRef.current ? selectRef.current.offsetWidth: 0}>
            {options.map((option) =>{
                let id = option.label + option.value;
                return <SelectItem isOpen = {open} name = {name} data = {option}
                  ref = {(element) => setRef(id,element)} 
                    key = {id} changeInfo = {()=>changeMainInfo(option.label,id)}/>
            })}
        </SelectContent>
    </div>
  )
}

export default SelectInput