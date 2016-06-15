function hormiga(comida, pesoMaximo, itinerario,pendiente,inventario) {
	this.comida = comida;  
	this.pesoMaximo = pesoMaximo;
	this.pendiente = pendiente;
	this.itinerario = itinerario;
	this.inventario = inventario;

	var h = this;

	this.agarrarComida = function (almacen){
		for (var i = almacen.depositos.length - 1; i >= 0; i--) {
			if(almacen.depositos[i].comida.tipo === h.comida.tipo){
				if(almacen.depositos[i].cantidadActual >= h.pendiente){
					h.comida.peso = h.pendiente;
					almacen.depositos[i].cantidadActual -= h.pendiente;
					h.pendiente = 0;
					h.inventario[almacen.id-1] = almacen;
				}else{
					h.comida.peso = almacen.depositos[i].cantidadActual;
					almacen.depositos[i].cantidadActual = 0
					h.pendiente -= almacen.depositos[i].cantidadActual;
					h.inventario[almacen.id-1] = almacen;
				}
			}
		}
		return almacen;
	};
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