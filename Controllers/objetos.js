function hormiga(comida, pesoMaximo, itinerario) {
	this.comida = comida;  
	this.pesoMaximo = pesoMaximo;
	this.itinerario = itinerario;
	this.inventario = [null,null,null];

	function agarrarComida(){

	}
}

function comida(tipo,peso){
	this.tipo = tipo;
	this.peso = peso;
}

function deposito(comida, capacidadMax, capacidadMin, cantidadAct){
	this.comida = comida;
	this.capacidadMaxima = capacidadMax;
	this.capacidadMinima = capacidadMin;
	this.cantidadActual = cantidadAct;
}

function itinerario(port,ip,ruta,id){
	this.port = port;
	this.ip = ip;
	this.ruta = ruta;
	this.enviar = 'http://'+this.ip+':'+this.port+this.ruta;
	this.id = id;
}

function almacenes(id,puerto){
	this.id = id;
	this.puerto = puerto;
	this.depositos = null;
}

var almaceness = [new almacenes(1,8010),new almacenes(2,8020),new almacenes(3,8030)];

module.exports.almacenes = almaceness;
module.exports.hormiga = hormiga;
module.exports.deposito = deposito;
module.exports.comida = comida;
module.exports.itinerario = itinerario;