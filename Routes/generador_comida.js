/** 
	Paquetes y variables
**/
var express = require('express'), 
	fs = require('fs'),
	objetos = require('../Controllers/objetos.js'),
    app = express();
    server = require('http').createServer(app),
    Eureca = require('eureca.io');

var eurecaServer = new Eureca.Server();

var generadoresdecomida = objetos.generadoresdecomida;
var generadordecomidaActual = generadoresdecomida[process.argv[2]]; 

var almacenes = objetos.almacenes;
/*
	RPC
*/
var client = new Eureca.Client({ uri: 'http://localhost:'+almacenes[0].puerto+'/' });
var almacenProxy0;
client.ready(function (serverProx) {
	almacenProxy0 = serverProx;
});
var client1 = new Eureca.Client({ uri: 'http://localhost:'+almacenes[1].puerto+'/' });
var almacenProxy1;
client1.ready(function (serverProx) {
	almacenProxy1 = serverProx;
});
var client2 = new Eureca.Client({ uri: 'http://localhost:'+almacenes[2].puerto+'/' });
var almacenProxy2;
client2.ready(function (serverProx) {
	almacenProxy2 = serverProx;
	
});



/************/
/**SERVIDOR**/
/************/

eurecaServer.attach(server);
		

eurecaServer.exports.llegageneradores = function(hormiga){

	console.log("Llega hormiga");
	var hor = new objetos.hormiga(hormiga.comida,hormiga.pesoMaximo,hormiga.itinerario,hormiga.pendiente,hormiga.inventario,hormiga.idPeticion);
	hor.comida.peso = hor.pendiente;
	//console.log("soy el peso del fucking gordo",hor.comida.peso);
	//console.log("soy el pencil",hor.pendiente);
	hor.itinerario.next = hor.itinerario.recorrido[hor.itinerario.recorrido.findIndex(function(id){return id == hor.itinerario.next})+1];
	enviarHormiga(hor);
}

server.listen(generadordecomidaActual.puerto);

/*
	Funciones no Migrables
*/

function enviarHormiga(hormiga){

	if(hormiga.itinerario.next === 0){// almacen 0
			almacenProxy0.hormigaSuma(hormiga);
	}else if(hormiga.itinerario.next === 1){	// almacen 1
			almacenProxy1.hormigaSuma(hormiga);
	}else if(hormiga.itinerario.next === 2){	// almacen 2
			almacenProxy2.hormigaSuma(hormiga);

	}
}