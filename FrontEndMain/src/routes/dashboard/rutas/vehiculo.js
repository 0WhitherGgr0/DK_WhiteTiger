import Orden from "./orden"

class Vehiculo  {
    constructor(id,capacidad){
        this.id = id
        this.capacidad = capacidad
        this.curLocation = 0
        this.carga = 0
        this.curRecor = 0
        this.maxRecor = 75000;
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