import { useNavigate } from 'react-router-dom';
import "../../../styles/vehiculos.css"
import { Form } from 'react-router-dom';
import SelectInput from '../../../components/selectInput';
import TextInput from '../../../components/textInput';

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
  ];

export default function FormVehiculo(){

    const navigate = useNavigate();

    return (
        <div className="vehiculosBlock">
            <div className="vehiculosBlock_tittle">
                <h2>Vehículos</h2>
            </div>
            <div className="vehiculosBlock_container">
                <fieldset className="vehiculosBlock_formContainer">
                    <legend>Agregar Vehiculo</legend> 
                    <Form method='post'>    
                        <SelectInput containerClass="vehiculosBlock_formInput" 
                            options={marcas} info="Marca" placeholder="Seleccionar marca" name="marca" />
                        <SelectInput containerClass="vehiculosBlock_formInput" 
                            options={marcas} info="Modelo" placeholder="Seleccionar modelo" name="modelo" />
                        <SelectInput containerClass="vehiculosBlock_formInput" 
                            options={marcas} info="Año" placeholder="Seleccionar año" name="año" />
                        <SelectInput containerClass="vehiculosBlock_formInput" 
                            options={marcas} info="Tipo" placeholder="Seleccionar tipo de vehiculo" name="tipo" />
                        <SelectInput containerClass="vehiculosBlock_formInput" 
                            options={marcas} info="Color" placeholder="Seleccionar color" name="color" />
                        <TextInput containerClass="vehiculosBlock_formInput"
                            info="Placa:" name="placa" placeholder='API-123'/>
                        <TextInput containerClass="vehiculosBlock_formInput"
                            info="SOAT:" name="SOAT" placeholder='20000000'/>
                        <TextInput containerClass="vehiculosBlock_formInput"
                            info="Fecha:" name="date" type='date'/>
                        <div className="vehiculosBlock_buttonGroup">
                            <button type='reset' onClick={()=>{
                                navigate("/dashboard/flotas/vehiculos");
                            }}>Cancelar</button>
                            <button type='submit'>Guardar</button>
                        </div>
                    </Form>
                </fieldset>
            </div>
        </div>
    )

}