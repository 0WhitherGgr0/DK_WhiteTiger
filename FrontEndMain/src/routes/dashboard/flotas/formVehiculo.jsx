import { useNavigate } from 'react-router-dom';
import "../../../styles/vehiculos.css"
import { Form } from 'react-router-dom';
import SelectInput from '../../../components/select/selectInput';
import TextInput from '../../../components/textInput';
import SelectInputLabel from '../../../components/selectInputLabel';

export async function action({request, params}) {
    const formData = await request.formData();
    console.log(formData)
    return 2;
}

const marcas = [
    {
      label: 'Marca1',
      value: '1',
    },
    {
      label: 'Marca2',
      value: '2',
    },
    {
      label: 'Marca3',
      value: '3',
    },
    {
      label: 'Marca4',
      value: '4',
    },
    {
      label: 'Marca5',
      value: '5',
    },
    {
      label: 'Marca6',
      value: '6',
    },
  ];

export default function FormVehiculo(){

    const navigate = useNavigate();

    function handleKeyDown(event) {
        if (event.keyCode === 13 ) {
             event.preventDefault();
        }
      }

    return (
        <div className="vehiculosBlock">
            <div className="vehiculosBlock_tittle">
                <h2>Vehículos</h2>
            </div>
            <div className="vehiculosBlock_container">
                <fieldset className="vehiculosBlock_formContainer">
                    <legend>Agregar Vehiculo</legend> 
                    <Form  method='post'>    
                        <SelectInputLabel containerClass="vehiculosBlock_formInput"
                        options={marcas} info = "Marca" name = "marca" placeholder="Seleccionar marca" />
                        <SelectInputLabel containerClass="vehiculosBlock_formInput"
                        options={marcas} info = "Modelo" name = "modelo" placeholder="Seleccionar modelo" />
                        <SelectInputLabel containerClass="vehiculosBlock_formInput"
                        options={marcas} info = "Año" name = "año" placeholder="Seleccionar año" />
                        <SelectInputLabel containerClass="vehiculosBlock_formInput"
                        options={marcas} info = "Tipo" name = "tipo" placeholder="Seleccionar tipo de vehiculo" />
                        <SelectInputLabel containerClass="vehiculosBlock_formInput"
                        options={marcas} info = "Color" name = "color" placeholder="Seleccionar color" />
                        <TextInput containerClass="vehiculosBlock_formInput"
                            info="Placa:" name="placa" placeholder='API-123'/>
                        <TextInput containerClass="vehiculosBlock_formInput"
                            info="SOAT:" name="SOAT" placeholder='20000000'/>
                        <TextInput containerClass="vehiculosBlock_formInput"
                            info="Fecha:" name="date" type='date'/>
                        <div className="vehiculosBlock_buttonGroup">
                            <button type='reset' onClick={()=>{
                                navigate(-1);
                            }}>Cancelar</button>
                            <button type='submit'>Guardar</button>
                        </div>
                    </Form>
                </fieldset>
            </div>
        </div>
    )

}