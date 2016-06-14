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
var depositos = [new objetos.deposito(comidas[0],500,150,500), new objetos.deposito(comidas[1],500,150,500), new objetos.deposito(comidas[2],500,150,500)
, new objetos.deposito(comidas[3],500,150,500), new objetos.deposito(comidas[4],500,150,500)] 

var almacenActual = almacenes[0];

var banderea = 0;
/*
	RPC
*/
/*Servidor*/


eurecaServer.attach(server);

eurecaServer.exports.hormigaLlega = function (hormiga,restante,nroAlmacen) {
	console.log("Llega hormiga");
	for (var i = depositos.length - 1; i >= 0; i--) 
	{
		if(depositos[i].comida.tipo === hormiga.comida.tipo)
		{
			/*
				Ya se consiguio la comida, se ve si es suficiente
			*/
			if(depositos[i].cantidadActual >= restante)
			{
				hormiga.comida.peso = restante;
	    		depositos[i].cantidadActual -= restante; 
	    		hormiga.inventario[almacenActual.id-1] = depositos;
	    		console.log(restante);
	    		console.log(depositos);
	    		return {
						res:1,
						hormiga:hormiga
			   			};	
			}else if(queda = depositos[i].cantidadActual - restante === 0){
				//mandar hormigas a buscar comida, if bandera 0
				//mandar a Hormiga al otro almacen, sino es el ultimo
			}else{
				hormiga.comida.peso = depositos[i].cantidadActual;
				//mandar hormigas a buscar comida, if bandera 0
				//mandar a Hormiga al otro almacen, sino es el ultimo
			}

		}	
	}
    
};

eurecaServer.exports.getDepositos = function(){
	console.log("llega depositos");
	return depositos;
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
