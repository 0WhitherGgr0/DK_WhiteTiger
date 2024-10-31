import '../../styles/select.css'

const SelectContent = ({children, isOpen, width}) => {

  function min(a,b){
    if(a < b){
        return a;
    }
    return b;
  }

  return (
    <div style={{width: width + "px", maxHeight : min(children.length*42,250)+ "px"}} 
     className={`select-content ${isOpen ? "select-content--active" : null}
      ${min(children.length*42,250) != 250 ? "select-content--scroll" : null}`}>
        {children}
    </div>
  )
}

export default SelectContent