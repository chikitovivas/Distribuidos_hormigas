var objetos = require('./objetos.js'),
	Eureca = require('eureca.io');


function actualizarAlmacenes(hormiga,almacenes){

	if(hormiga.inventario[0] !== null)
		almacenes[0].depositos = hormiga.inventario[0]
	if(hormiga.inventario[1] !== null)
		almacenes[1].depositos = hormiga.inventario[1]
	if(hormiga.inventario[2] !== null)
		almacenes[2].depositos = hormiga.inventario[2]	

	return almacenes;
}

function crearItinerario(almacenes,pendiente,tipo){
	var arreglo = Array();
	var cont = 0;
	for (var i = 0; i < almacenes.length ; i++) {
		for (var j = 0; j < almacenes[i].depositos.length ; j++) {
			if(almacenes[i].depositos[j].comida.tipo === tipo && almacenes[i].depositos[j].cantidadActual >= pendiente){
				arreglo[cont] = almacenes[i].id;
				cont++;
				j = 5;
			}
		}
	}
	arreglo[cont] = 3;
	return new objetos.itinerario(arreglo);
}
                          //provision: almacen o generadores
function crearItinerario2(provision,pendiente,tipo, flag,quienpide){
	var arreglo = Array();
	var cont = 0;

	if (flag===0){
		for (var i = 0; i < provision.length ; i++) {
			for (var j = 0; j < provision[i].depositos.length ; j++) {
				if(provision[i].depositos[j].comida.tipo === tipo && provision[i].depositos[j].cantidadActual >= pendiente){
					arreglo[cont] = provision[i].id;
					cont++;
					j = 5;
				}
			}
		}
		arreglo[cont] = 3;
		return new objetos.itinerario(arreglo);
	}else if(flag===1){//console.log("console.log", JSON.stringify(provision)); console.log("Hola, soy el tipo guapo ",tipo);
		for (var i = 0; i < provision.length ; i++) {
			if(provision[i].tipocomida === tipo){
				arreglo[cont] = provision[i].id;
				cont++;
				i = 6;
			}
		}//console.log("soy Luis Jose el ladilloso que pide:",quienpide);
		arreglo[cont] = quienpide; //console.log("soy elñ arreglo: ",arreglo[cont]);
		cont++;
		arreglo[cont]=3;
		return new objetos.itinerario(arreglo);
	}
	
}

module.exports.actualizarAlmacenes = actualizarAlmacenes;

module.exports.crearItinerario = crearItinerario;
module.exports.crearItinerario2 = crearItinerario2;
