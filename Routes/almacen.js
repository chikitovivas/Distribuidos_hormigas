/** 
	Paquetes y variables
**/
var express = require('express'), 
	fs = require('fs'),
	objetos = require('../Controllers/objetos.js'),
    app = express(),
    server = require('http').createServer(app),
    Eureca = require('eureca.io');


var eurecaServer = new Eureca.Server();


/*
	Inicializando
*/
var almacenes = objetos.almacenes;
var comidas = [new objetos.comida("Manzana",0), new objetos.comida("Pera",0), new objetos.comida("Naranja",0)
, new objetos.comida("Patilla",0), new objetos.comida("Banana",0)];
var depositos = [new objetos.deposito(comidas[0],500,150,100), new objetos.deposito(comidas[1],500,150,100), new objetos.deposito(comidas[2],500,150,100)
, new objetos.deposito(comidas[3],500,150,100), new objetos.deposito(comidas[4],500,150,100)] 

var almacenActual = almacenes[process.argv[2]]; //AQUI
almacenActual.depositos = depositos;

var hor = new Array();
/*
	RPC
*/
var client = new Eureca.Client({ uri: 'http://localhost:8200/' });
var serverProxy;
client.ready(function (serverProx) {
	serverProxy = serverProx;
});
var client1 = new Eureca.Client({ uri: 'http://localhost:8010/' });
var serverProxy1;
client1.ready(function (serverProx) {
	serverProxy1 = serverProx;
});
var client2 = new Eureca.Client({ uri: 'http://localhost:8020/' });
var serverProxy2;
client2.ready(function (serverProx) {
	serverProxy2 = serverProx;
});
var client3 = new Eureca.Client({ uri: 'http://localhost:8030/' });
var serverProxy3;
client2.ready(function (serverProx) {
	serverProxy3 = serverProx;
});
/*Servidor*/

eurecaServer.attach(server);
		

eurecaServer.exports.hormigaLlega = function(hormiga,nroAlmacen){

	console.log("Llega hormiga");

	var hor = new objetos.hormiga(hormiga.comida,hormiga.pesoMaximo,hormiga.itinerario,hormiga.pendiente,hormiga.inventario,hormiga.idPeticion);

	//console.log(hor);
	almacenActual = hor.agarrarComida(almacenActual);
	console.log(almacenActual);
	if(hor.pendiente === 0){
		enviarHormiga(hor,4); //4 enviar la hormiga al servidor
	}else{
		enviarHormiga(hor,nroAlmacen+1); // Si no, envia la hormiga al otro almcen
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
	console.log(idAlmacen);
	if(idAlmacen === 4){ //servidor
			serverProxy.hormigaLlegaFull(hormiga);
	}else if(idAlmacen === 1){// almacen 1
			serverProxy1.hormigaLlega(hormiga,1);
	}else if(idAlmacen === 2){	// almacen 2
			serverProxy2.hormigaLlega(hormiga,2);
	}else if(idAlmacen === 3){	// almacen 3
			console.log("entro3");
			serverProxy3.hormigaLlega(hormiga,3);
	}
}

