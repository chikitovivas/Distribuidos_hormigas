var hormiga = function(comid, pesoMaxim, itinerario,pendient,inventario,id) {
	this.comida = comid;  //tipo y peso
	this.pesoMaximo = pesoMaxim;
	this.pendiente = pendient;
	this.itinerario = itinerario;
	this.inventario = inventario;
	this.idPeticion = id;
}
hormiga.prototype.agarrarComida = function (almacen) {
	var flag = 0; var cantidad_peticion=0; var almacen_peticion=0;var tipocomida_peticion;

	for (var i = almacen.depositos.length - 1; i >= 0; i--) {
		if(almacen.depositos[i].comida.tipo === this.comida.tipo){
			if(almacen.depositos[i].cantidadActual >= this.pendiente){
				this.comida.peso += this.pendiente;
				almacen.depositos[i].cantidadActual -= this.pendiente;
				this.pendiente = 0;
				this.inventario[almacen.id] = almacen;
				this.itinerario.next = 3;
			}else{
				this.comida.peso += almacen.depositos[i].cantidadActual;
				this.pendiente -= almacen.depositos[i].cantidadActual;
				almacen.depositos[i].cantidadActual = 0
				this.inventario[almacen.id] = almacen;
				var that = this;
				this.itinerario.next = this.itinerario.recorrido[this.itinerario.recorrido.findIndex(function(id){return id == that.itinerario.next})+1];
			}
			if ((almacen.depositos[i].cantidadActual <= almacen.depositos[i].capacidadMinima)  && (almacen.depositos[i].esperando===0)){
				almacen_peticion=almacen.id;
				flag=1;
				almacen.depositos[i].esperando=1;
				cantidad_peticion = almacen.depositos[i].capacidadMaxima-almacen.depositos[i].cantidadActual;
				tipocomida_peticion=almacen.depositos[i].comida.tipo;
			}
		}
	}
	return {
			almacen:almacen,
			flag:flag, //para realizar la peticion de comida al generador
			almacen_peticion:almacen_peticion,
			cantidad_peticion:cantidad_peticion,
			tipocomida_peticion: tipocomida_peticion
		};
};

hormiga.prototype.dejaComida = function (almacen){
	for (var i = almacen.depositos.length - 1; i >= 0; i--) {
		if(almacen.depositos[i].comida.tipo === this.comida.tipo){
			if ((almacen.depositos[i].cantidadActual+this.comida.peso)<=almacen.depositos[i].capacidadMaxima){
				almacen.depositos[i].cantidadActual += this.comida.peso; 
				this.comida.peso=0;
				this.inventario[almacen.id] = almacen;
				that=this;
				this.itinerario.next = this.itinerario.recorrido[this.itinerario.recorrido.findIndex(function(id){return id == that.itinerario.next})+1];
			}
			else{
				if(almacen.depositos[i].cantidadActual!==almacen.depositos[i].capacidadMaxima){
					var resultado = almacen.depositos[i].capacidadMaxima-almacen.depositos[i].cantidadActual;

					almacen.depositos[i].cantidadActual += resultado; 
					this.comida.peso-=resultado;
					this.inventario[almacen.id] = almacen;
					that=this;
					this.itinerario.next = this.itinerario.recorrido[this.itinerario.recorrido.findIndex(function(id){return id == that.itinerario.next})+1];
				
				}
			}
		}
	}
	return almacen;
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
	this.esperando=0;
}

function itinerario(recorrido){
	this.recorrido = recorrido;
	this.next = recorrido[0];
}

function almacenes(id,puerto){
	this.id = id;
	this.puerto = puerto;
	this.depositos = null;
}

/*function peticiones(id,cantidadHormigas,comida,pendiente){
	this.id = id;
	this.cantidadHormigas = cantidadHormigas;
	this.comida = comida;
	this.pendiente = pendiente; //lo que falta por enviar
	this.pendienteEnviado = 0; //KG que se han enviado
}*/
function peticiones(id,cantidadHormigas,comidas){
	this.id = id;
	this.cantidadHormigas = cantidadHormigas;
	this.comidas = comidas;
	this.cantidadHormigasEnviadas = cantidadHormigas;
	this.cantidadComidaLlegando = 0;
}

function generadoresdecomida(id,puerto, tipo){
   	this.id = id;
	this.puerto = puerto;
	this.tipocomida = tipo;
}


var almaceness = [new almacenes(0,8300),new almacenes(1,8310),new almacenes(2,8320)];
var generadoresess = [new generadoresdecomida(10,8400, "Manzana"),new generadoresdecomida(11,8410,"Pera"),new generadoresdecomida(12,8420,"Naranja"),new generadoresdecomida(13,8430,"Patilla"),new generadoresdecomida(14,8440,"Banana")];

module.exports.generadoresdecomida = generadoresess; 
module.exports.almacenes = almaceness;
module.exports.hormiga = hormiga;
module.exports.deposito = deposito;
module.exports.comida = comida;
module.exports.itinerario = itinerario;
module.exports.peticiones = peticiones;