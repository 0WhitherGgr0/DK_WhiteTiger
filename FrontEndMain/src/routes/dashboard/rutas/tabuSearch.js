import Vehiculo from "./vehiculo";
import Orden from "./orden";
import Rutas from "../rutas/rutas";

function getRandom(start,end){
    return (Math.floor(Math.random()*end) + start);
}

class TabuSearch{

    constructor(numberV, numberP, capacity){
        this.numberVehicles = numberV;
        this.numberPedidos = numberP;
        this.coste = 0;
        this.mejorCoste = 0;
        this.vehiculos = []
        this.vehiculosSolucion = []
        this.vehiculosGreedy = []
        for(let i = 0;i<numberV;i++){
            this.vehiculos.push(new Vehiculo(i+1,capacity));
            this.vehiculosSolucion.push(new Vehiculo(i+1,capacity));
        }
    }

    pedidosNoAsignados(pedidos){
        for(let i = 1;i<pedidos.length;i++){
            if(!pedidos[i].conRuta){
                return true;
            }
        }
        return false;
    }

    solucionInicial(pedidos, distancias){
        let costoCandidato
        let costoOrigen
        let costoFinal
        let indexVehiculo = 0;

        while(this.pedidosNoAsignados(pedidos)) {
            let indexPedido = 0;
            let pedidoCandidato = null;
            let costeMinimo = Number.MAX_VALUE;

            if (this.vehiculos[indexVehiculo].ruta.length == 0){
                this.vehiculos[indexVehiculo].agregarPedido(pedidos[0]);
            }

            for (let i = 1; i <= this.numberPedidos; i++) {
                if (pedidos[i].conRuta == false) {
                    if (this.vehiculos[indexVehiculo].esAsignable(pedidos[i].demand)) {
                        costoCandidato = distancias[this.vehiculos[indexVehiculo].curLocation][i];
                        costoOrigen = distancias[i][0];
                        if (costeMinimo > costoCandidato && (costoCandidato + costoOrigen <= (this.vehiculos[indexVehiculo].maxRecor - this.vehiculos[indexVehiculo].curRecor))) {
                            costeMinimo = costoCandidato;
                            indexPedido = i;
                            pedidoCandidato = pedidos[i];
                        }
                    }
                }
            }
            if(pedidoCandidato  == null){
                if(indexVehiculo+1 < this.vehiculos.length){
                    if (this.vehiculos[indexVehiculo].curLocation != 0) {
                        costoFinal = distancias[this.vehiculos[indexVehiculo].curLocation][0];
                        this.vehiculos[indexVehiculo].agregarPedido(pedidos[0]);
                        this.vehiculos[indexVehiculo].curRecor+=costoFinal;
                        this.coste +=  costoFinal;
                    }
                    indexVehiculo = indexVehiculo+1; 
                }
                else{ 
                    break;
                }
            }
            else{
                this.vehiculos[indexVehiculo].agregarPedido(pedidoCandidato);
                this.vehiculos[indexVehiculo].curRecor+=costeMinimo;
                pedidos[indexPedido].conRuta = true;
                this.coste += costeMinimo;
            }
        }

        costoFinal = distancias[this.vehiculos[indexVehiculo].curLocation][0];
        this.vehiculos[indexVehiculo].agregarPedido(pedidos[0]);
        this.vehiculos[indexVehiculo].curRecor+=costoFinal;
        this.coste +=  costoFinal;

        this.vehiculosGreedy = JSON.parse(JSON.stringify(this.vehiculos))
        this.guardarSolucion();
    }

    tabuSearch(TabuHorizon, distancias){
        let rutaDesde = []
        let rutaHacia = []

        let auxPedido = 0
        let vehiculoDesde;
        let vehiculoHacia;

        let mejorCostoPedido;
        let mejorCostoVecino;

        let swapA = -1;
        let swapB = -1;
        let swapRouteDesde = -1;
        let swapRouteHacia = -1;

        let numberIter = 6000;
        let currIter = 0;
        let currChange = 0;
        let currDesde = 0;
        let currHacia = 0;
        let currHaciaAux = 0;

        let finish = false;

        this.mejorCoste = this.coste

        let dimPedidos = distancias[0].length;
        let matrizTabu = [];
        for(let i = 0;i<dimPedidos + 1;i++){
            matrizTabu.push(new Array(dimPedidos + 1).fill(0))
        }

        while(!finish){
            if (currIter == numberIter){
                finish = true;
            }
            currIter++;
            mejorCostoPedido = Number.MAX_VALUE;

            for (vehiculoDesde = 0;  vehiculoDesde <  this.vehiculos.length;  vehiculoDesde++) {
                rutaDesde =  this.vehiculos[vehiculoDesde].ruta;
                let rutaDesdeLength = rutaDesde.length;
                for (let i = 1; i < rutaDesdeLength - 1; i++) {

                    for (vehiculoHacia = 0; vehiculoHacia <  this.vehiculos.length; vehiculoHacia++) {
                        rutaHacia =  this.vehiculos[vehiculoHacia].ruta;
                        let vehiculoHacialength = rutaHacia.length
                        for (let j = 0;j < (vehiculoHacialength - 1); j++) {

                            auxPedido = rutaDesde[i].demand;

                            if ((vehiculoDesde == vehiculoHacia) ||  this.vehiculos[vehiculoHacia].esAsignable(auxPedido)) {

                                if (!((vehiculoDesde == vehiculoHacia) && ((j == i) || (j == i - 1))))  
                                {
                                    let distRest1 = distancias[rutaDesde[i - 1].id][rutaDesde[i].id];
                                    let distRest2 = distancias[rutaDesde[i].id][rutaDesde[i + 1].id];
                                    let distRest3 = distancias[rutaHacia[j].id][rutaHacia[j + 1].id];

                                    let distSum1 = distancias[rutaDesde[i - 1].id][rutaDesde[i + 1].id];
                                    let distSum2 = distancias[rutaHacia[j].id][rutaDesde[i].id];
                                    let distSum3 = distancias[rutaDesde[i].id][rutaHacia[j + 1].id];

                                    if ((matrizTabu[rutaDesde[i - 1].id][rutaDesde[i+1].id] != 0)
                                            || (matrizTabu[rutaHacia[j].id][rutaDesde[i].id] != 0)
                                            || (matrizTabu[rutaDesde[i].id][rutaHacia[j+1].id] != 0)) {
                                        continue;
                                    }
                                      
                                    mejorCostoVecino = distSum1 + distSum2 + distSum3 - distRest1 - distRest2 - distRest3;
                                    currHaciaAux = distSum2 + distSum3 - distRest3;
                                    if(mejorCostoVecino < mejorCostoPedido &&
                                        this.vehiculos[vehiculoHacia].curRecor + currHaciaAux <= this.vehiculos[vehiculoHacia].maxRecor
                                    ){
                                        mejorCostoPedido = mejorCostoVecino;
                                        swapA = i;
                                        swapB = j;
                                        currChange = auxPedido;
                                        swapRouteDesde = vehiculoDesde;
                                        swapRouteHacia = vehiculoHacia;
                                        currDesde = distSum1 - distRest1 - distRest2;
                                        currHacia = currHaciaAux;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            for(let i = 0; i < matrizTabu[0].length;  i++) {
                for(let j = 0; j < matrizTabu[0].length ; j++) {
                    if(matrizTabu[i][j] > 0){ 
                        matrizTabu[i][j]--;
                    }
                }
            }

            if(mejorCostoPedido == Number.MAX_VALUE){
                continue;
            }
            
            rutaDesde =  this.vehiculos[swapRouteDesde].ruta;
            rutaHacia =  this.vehiculos[swapRouteHacia].ruta;
            
            this.vehiculos[swapRouteDesde].ruta = null;
            this.vehiculos[swapRouteHacia].ruta = null;

            let pedidoChange = rutaDesde[swapA];

            let pedidoPrevDesde = rutaDesde[swapA-1].id;
            let pedidoPostDesde = rutaDesde[swapA+1].id;
            let pedidoPrevHacia = rutaHacia[swapB].id;
            let pedidoPostHacia = rutaHacia[swapB+1].id;

            matrizTabu[pedidoPrevDesde][pedidoChange.id] = TabuHorizon + getRandom(1,4);
            matrizTabu[pedidoChange.id][pedidoPostDesde] = TabuHorizon + getRandom(1,4);
            matrizTabu[pedidoPrevHacia][pedidoPostHacia] = TabuHorizon + getRandom(1,4);

            rutaDesde.splice(swapA,1);            

            if(swapRouteDesde == swapRouteHacia) {
                if(swapA < swapB) {
                    rutaDesde.splice(swapB,0, pedidoChange);
                }else {
                    rutaDesde.splice(swapB + 1,0, pedidoChange);
                }
            }else{
                rutaHacia.splice(swapB+1,0, pedidoChange);
            }


            this.vehiculos[swapRouteDesde].ruta = rutaDesde;
            this.vehiculos[swapRouteDesde].curRecor += currDesde;
            this.vehiculos[swapRouteDesde].carga -= currChange;

            this.vehiculos[swapRouteHacia].ruta = rutaHacia;
            this.vehiculos[swapRouteHacia].curRecor += currHacia;
            this.vehiculos[swapRouteHacia].carga += currChange;

            this.coste  += mejorCostoPedido;

            if(this.coste < this.mejorCoste){
                this.guardarSolucion();
            }
        }
    }

    guardarSolucion(){
        this.mejorCoste = this.coste;
        for (let i=0 ; i<this.numberVehicles ; i++){
            this.vehiculosSolucion[i].ruta = new Array();
            if (this.vehiculos[i].ruta.length != 0){
                let RoutSize = this.vehiculos[i].ruta.length;
                for (let j = 0; j < RoutSize ; j++){
                    this.vehiculosSolucion[i].ruta.push(this.vehiculos[i].ruta[j]);
                }
            }
            this.vehiculosSolucion[i].carga = this.vehiculos[i].carga
            this.vehiculosSolucion[i].curRecor = this.vehiculos[i].curRecor
        }     
    }

}

export default TabuSearch