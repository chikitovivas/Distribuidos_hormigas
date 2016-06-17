var objetos = require('./objetos.js'),
	Eureca = require('eureca.io');

function inicializarAlmacenes(){

	var almacenes = objetos.almacenes;

	var client_depositos = new Eureca.Client({ uri: 'http://localhost:8010/' });
	var client_depositos2 = new Eureca.Client({ uri: 'http://localhost:8020/' });
	var client_depositos3 = new Eureca.Client({ uri: 'http://localhost:8030/' });
	client_depositos.ready(function (serverProxy) {
		serverProxy.getDepositos().onReady(function(result){
	    		almacenes[0].depositos = result;
	    });
	});
	client_depositos2.ready(function (serverProxy) {
		serverProxy.getDepositos().onReady(function(result){
	    		almacenes[1].depositos = result;
	    });
	});
	client_depositos3.ready(function (serverProxy) {
		serverProxy.getDepositos().onReady(function(result){
	    		almacenes[2].depositos = result;
	    });
	});

	return almacenes;
}


function actualizarAlmacenes(hormiga,almacenes){

	if(hormiga.inventario[0] !== null)
		almacenes[0].depositos = hormiga.inventario[0]
	if(hormiga.inventario[1] !== null)
		almacenes[1].depositos = hormiga.inventario[1]
	if(hormiga.inventario[2] !== null)
		almacenes[2].depositos = hormiga.inventario[2]	

	return almacenes;
}


module.exports.inicializarAlmacenes = inicializarAlmacenes;

module.exports.actualizarAlmacenes = actualizarAlmacenes;


