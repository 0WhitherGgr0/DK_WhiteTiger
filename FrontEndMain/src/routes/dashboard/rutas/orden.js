class Orden{
    constructor(id,posx,posy,demand, pedido_id){
        this.id = id
        this.pedido_id = pedido_id
        this.posx = posx
        this.posy = posy
        this.demand = demand
        this.conRuta = false
        if(id == 0){
            this.origen = true;
        }else{
            this.origen = false;
        }
    }
}

export default Orden;