/** 
	Paquetes y variables
**/
var express = require('express'), 
	fs = require('fs'),
	objetos = require('../Controllers/objetos.js'),
    app = express(),
    server = require('http').createServer(app),
    Eureca = require('eureca.io');

var co = require('co');

var eurecaServer = new Eureca.Server();


/*
	Inicializando
*/
var almacenes = objetos.almacenes;
var comidas = [new objetos.comida("Manzana",0), new objetos.comida("Pera",0), new objetos.comida("Naranja",0)
, new objetos.comida("Patilla",0), new objetos.comida("Banana",0)];
var depositos = [new objetos.deposito(comidas[0],500,150,500), new objetos.deposito(comidas[1],500,150,500), new objetos.deposito(comidas[2],500,150,500)
, new objetos.deposito(comidas[3],500,150,500), new objetos.deposito(comidas[4],500,150,500)] 

var almacenActual = almacenes[0]; //AQUI
almacenActual.depositos = depositos;

var client2 = new Eureca.Client({ uri: 'http://localhost:8020/' });
var client3 = new Eureca.Client({ uri: 'http://localhost:8030/' });
var banderea = 0;
/*
	RPC
*/
/*Servidor*/

eurecaServer.attach(server);

eurecaServer.exports.hormigaLlega = function (hormiga,nroAlmacen) {
	console.log("Llega hormiga");
	hor = new objetos.hormiga(hormiga.comida,hormiga.pesoMaximo,hormiga.itinerario,hormiga.pendiente,hormiga.inventario);

	//co(hor.agarrarComida(almacenActual)).then(function (value) {
		//almacenActual = value;
		console.log(hor);
		almacenActual = hor.agarrarComida(almacenActual);
		//this.setTimeout(function(){console.log(esperando)},1000);
		if(hor.pendiente === 0){
			return {res:1, hormiga:hor}
		}else{
			if(nroAlmacen === 1){	
			 	client2.ready(function (serverProxy) {
					serverProxy.hormigaLlega(hor,2).onReady(function(result){		
		    			return{
							res:result.res,
							hormiga:result.hormiga
						};					
				    });
				});
			}else if(nroAlmacen === 2){
				client3.ready(function (serverProxy) {
					serverProxy.hormigaLlega(hor,3).onReady(function(result){		
		    			return{
							res:result.res,
							hormiga:result.hormiga
						};					
				    });
				});
			}else{	//Es porque estoy en el almacen 3 y lo que pidio la hormiga no esta disponible
			    return{
					res:0,
					hormiga:hor
				};	
			}
		}   
	/*}, function (err) {
	  console.error(err.stack);
	});*/
//do buscar comida if() 
};

eurecaServer.exports.getDepositos = function(){
	console.log("llega depositos");
	return almacenActual.depositos;
};	

server.listen(almacenActual.puerto);

/*Cliente*/
/*var client = new Eureca.Client({ uri: 'http://localhost:8000/' });
 
client.ready(function (serverProxy) {
	serverProxy.hello().onReady(function(result){
    		console.log(result);	
    	});
});
/*
	Sockets
*/
/*var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write(JSON.stringify({ a: 5 }));
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {

    console.log('DATA: ' + data);
    // Close the client socket completely
    client.destroy();

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});*/
