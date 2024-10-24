import '../../styles/select.css'
import selectIcon from '../../assets/selectIcon.svg'

const SelectButton = ({info, action}) => {
  return (
    <div onClick={action}  className='select-button'>
        <p>{info.info}</p>
        <img src={selectIcon} alt="" />
    </div>
  )
}

export default SelectButton