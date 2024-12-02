import Orden from "./orden"

class Vehiculo  {
    constructor(id,capacidad, id_conductor, id_placa, maxRecor){
        this.id = id
        this.id_conductor = id_conductor;
        this.id_placa = id_placa;
        this.capacidad = capacidad
        this.curLocation = 0
        this.carga = 0
        this.curRecor = 0
        this.maxRecor = maxRecor;
        this.cerrado = false
        this.ruta = [];
    }

    agregarPedido(orden){
        this.ruta.push(orden);
        this.carga += orden.demand;
        this.curLocation = orden.id
    }

    esAsignable(demanda){
        return (this.carga + demanda <= this.capacidad)
    }

}

export default Vehiculo