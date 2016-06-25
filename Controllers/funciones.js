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


module.exports.actualizarAlmacenes = actualizarAlmacenes;

module.exports.crearItinerario = crearItinerario;
