var hormiga = function(comid, pesoMaxim, itinerario,pendient,inventario,id) {
	this.comida = comid;  
	this.pesoMaximo = pesoMaxim;
	this.pendiente = pendient;
	this.itinerario = itinerario;
	this.inventario = inventario;
	this.idPeticion = id;
}
hormiga.prototype.agarrarComida = function (almacen) {
	for (var i = almacen.depositos.length - 1; i >= 0; i--) {
		if(almacen.depositos[i].comida.tipo === this.comida.tipo){
			if(almacen.depositos[i].cantidadActual >= this.pendiente){
				this.comida.peso = this.pendiente;
				almacen.depositos[i].cantidadActual -= this.pendiente;
				this.pendiente = 0;
				this.inventario[almacen.id-1] = almacen;
			}else{
				this.comida.peso = almacen.depositos[i].cantidadActual;
				almacen.depositos[i].cantidadActual = 0
				this.pendiente -= almacen.depositos[i].cantidadActual;
				this.inventario[almacen.id-1] = almacen;
			}
		}
	}
	return almacen;
};


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

function peticiones(id,cantidadHormigas,comida,pendiente){
	this.id = id;
	this.cantidadHormigas = cantidadHormigas;
	this.comida = comida;
	this.pendiente = pendiente; //lo que falta por enviar
	this.pendienteEnviado = 0; //KG que se han enviado
}

var almaceness = [new almacenes(1,8010),new almacenes(2,8020),new almacenes(3,8030)];

module.exports.almacenes = almaceness;
module.exports.hormiga = hormiga;
module.exports.deposito = deposito;
module.exports.comida = comida;
module.exports.itinerario = itinerario;
module.exports.peticiones = peticiones;