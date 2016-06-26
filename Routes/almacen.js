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

/*
	RPC
*/
var hormiguero = new Eureca.Client({ uri: 'http://localhost:8200/' });
var serverProxy;
hormiguero.ready(function (serverProx) {
	serverProxy = serverProx;
});
var client0 = new Eureca.Client({ uri: 'http://localhost:'+almacenes[0].puerto+'/' });
var clientProxy0;
client0.ready(function (serverProx) {
	clientProxy0 = serverProx;
});
var client1 = new Eureca.Client({ uri: 'http://localhost:'+almacenes[1].puerto+'/' });
var clientProxy1;
client1.ready(function (serverProx) {
	clientProxy1 = serverProx;
});
var client2 = new Eureca.Client({ uri: 'http://localhost:'+almacenes[2].puerto+'/' });
var clientProxy2;
client2.ready(function (serverProx) {
	clientProxy2 = serverProx;
});

/***********/
/*SERVIDOR*/
/***********/

eurecaServer.attach(server);
		

eurecaServer.exports.hormigaLlega = function(hormiga){

	console.log("Llega hormiga");

	var hor = new objetos.hormiga(hormiga.comida,hormiga.pesoMaximo,hormiga.itinerario,hormiga.pendiente,hormiga.inventario,hormiga.idPeticion);

	//console.log(hor);
	var respuesta = hor.agarrarComida(almacenActual);
	almacenActual = respuesta.almacen;
	console.log(almacenActual);
	enviarHormiga(hor);
	/*console.log("*********************************");console.log("Llegue de agarrar comida");
	console.log("almacen",respuesta.almacen);console.log("flag:",respuesta.flag);
	console.log("Almacen que pide: ",respuesta.almacen_peticion);console.log("cantidad que pide: ",respuesta.cantidad_peticion);console.log("tipo comida:", respuesta.tipocomida_peticion);
	*/if(respuesta.flag === 1){
		//mandar a buscar comida a los generadores
	//	console.log("*********************************");console.log("Entre al if del flag===1");
		serverProxy.hormigaGeneradores(respuesta.almacen_peticion,respuesta.cantidad_peticion,respuesta.tipocomida_peticion);
	}

}

eurecaServer.exports.hormigaSuma = function(hormiga){
	
	console.log("Llega hormiga");
	
	var hor = new objetos.hormiga(hormiga.comida,hormiga.pesoMaximo,hormiga.itinerario,hormiga.pendiente,hormiga.inventario,hormiga.idPeticion);

	
	almacenActual = hor.dejaComida(almacenActual);console.log(almacenActual);
	//console.log("hormigaSuma, almacenActual", almacenActual); 
	enviarHormiga(hor);

}


eurecaServer.exports.getDepositos = function(){
	console.log("llega depositos");
	return almacenActual.depositos;
};	


server.listen(almacenActual.puerto);

/*
	Funciones no Migrables
*/
function enviarHormiga(hormiga){

	if(hormiga.itinerario.next === 3){ //servidor
			serverProxy.hormigaLlegaFull(hormiga);
	}else if(hormiga.itinerario.next === 0){// almacen 0
			clientProxy0.hormigaLlega(hormiga);
	}else if(hormiga.itinerario.next === 1){	// almacen 1
			clientProxy1.hormigaLlega(hormiga);
	}else if(hormiga.itinerario.next === 2){	// almacen 2
			clientProxy2.hormigaLlega(hormiga);
	}
}

