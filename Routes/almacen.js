/** 
	Paquetes y variables
**/
var express = require('express'), 
	fs = require('fs'),
	objetos = require('../Controllers/objetos.js'),
    app = express(),
    server = require('http').createServer(app),
    Eureca = require('eureca.io');
    //Hormiga = require('../Controllers/objetos.js');


var eurecaServer = new Eureca.Server();


/*
	Inicializando
*/
var almacenes = objetos.almacenes;
var comidas = [new objetos.comida("Manzana",0), new objetos.comida("Pera",0), new objetos.comida("Naranja",0)
, new objetos.comida("Patilla",0), new objetos.comida("Banana",0)];
var depositos = [new objetos.deposito(comidas[0],500,150,100), new objetos.deposito(comidas[1],500,150,100), new objetos.deposito(comidas[2],500,150,100)
, new objetos.deposito(comidas[3],500,150,100), new objetos.deposito(comidas[4],500,150,100)] 

var almacenActual = almacenes[0]; //AQUI
almacenActual.depositos = depositos;
var banderea = 0;
var hor = new Array();
var cantidadHormigas=0;
		/*client2.ready(function (serverProxy) {
					serverProxy.getPorfa().onReady(function(result){		
						console.log(result);				
				    });
				});
*/
/*
	RPC
*/
/*Servidor*/

eurecaServer.attach(server);
		

eurecaServer.exports.hormigaLlega = function(hormiga,nroAlmacen){

	console.log("Llega hormiga");

	var hor = new objetos.hormiga(hormiga.comida,hormiga.pesoMaximo,hormiga.itinerario,hormiga.pendiente,hormiga.inventario,hormiga.idPeticion);

	//console.log(hor);
	almacenActual = hor.agarrarComida(almacenActual);
	console.log(almacenActual);
	if(hor.pendiente === 0){
		enviarHormiga(hor,4);
	}else{
		enviarHormiga(hor,nroAlmacen+1);
	}

}

eurecaServer.exports.getDepositos = function(){
	console.log("llega depositos");
	return almacenActual.depositos;
};	

eurecaServer.exports.getPorfa = function(){
	console.log("llega otro almacen");
	return 1;
};	

server.listen(almacenActual.puerto);

function enviarHormiga(hormiga,idAlmacen){
	console.log(hormiga);
	if(idAlmacen === 4){
		var client = new Eureca.Client({ uri: 'http://localhost:8200/' });
		client.ready(function (serverProxy) {
			serverProxy.hormigaLlegaFull(hormiga);
	    });
	}else if(idAlmacen === 1){
		var client1 = new Eureca.Client({ uri: 'http://localhost:8010/' });
		client1.ready(function (serverProxy) {
			serverProxy.hormigaLlega(hormiga,1);
	    });
	}else if(idAlmacen === 2){	
		var client2 = new Eureca.Client({ uri: 'http://localhost:8020/' });
		client2.ready(function (serverProxy) {
			serverProxy.hormigaLlega(hormiga,2);
	    });
	}else if(idAlmacen === 3){	
		var client3 = new Eureca.Client({ uri: 'http://localhost:8030/' });
		client3.ready(function (serverProxy) {
			serverProxy.hormigaLlega(hormiga,3);
	    });
	}
}

