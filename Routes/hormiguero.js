/** 
	Paquetes y variables
**/
var express = require('express'), 
	fs = require('fs'),
	objetos = require('../Controllers/objetos.js'),
	funciones = require('../Controllers/funciones.js'),
    app = express(), 
    server = require('http').createServer(app),
    Eureca = require('eureca.io');

var events = require('events');
var path = require("path");

var eventEmitter = new events.EventEmitter();



var pesoMaximo = 10, 
	cantidadHormigas = 0;

var html = fs.readFileSync("../public/index.html");
/*
		Inicializacion de los depositos
*/
var almacenes = funciones.inicializarAlmacenes();


var itinerarios = [new objetos.itinerario(almacenes[0].puerto,'localhost','/',almacenes[0].id),
			 new objetos.itinerario(almacenes[1].puerto,'localhost','/',almacenes[1].id), 
			 new objetos.itinerario(almacenes[2].puerto,'localhost','/',almacenes[2].id)];

app.use(express.static('C:/Users/Usuario/Desktop/Distribuidos_node/public'));
/*
	Rutas
*/
app.listen(8100,function(){
	//app.use(express.static('public'));

	app.get('/',function(req,res){
		res.send(html.toString());
		//res.end();
	});

	/*
		creador
	*/
	app.get('/creador/comida_reina', function(req,res){
		var client = new Eureca.Client({ uri: 'http://localhost:8010/' });
		var opciones = req.query;
		var comida = new objetos.comida(opciones.comida+"",0), 
			cantidad = opciones.cantidad;

		if(cantidad <= pesoMaximo){
			hor = new objetos.hormiga(comida, pesoMaximo, itinerarios);
			/*
				Hormiga doing
			*/
			client.ready(function (serverProxy) {
				serverProxy.hormigaLlega(hor,cantidad,almacenes[0].id).onReady(function(result){		
		    			res.jsonp({
							respuesta:result.res,
							almacenes:funciones.actualizarAlmacenes(result.hormiga,almacenes),
							id:opciones.id
						});
						res.end();	
			    });
			});
		}else{
			var cantidad_hormigas = cantidad / pesoMaximo; 
			var todoBien = 1;
			var cantidadComida = 0;
			for (var i = cantidad_hormigas - 1; i >= 0; i--) {
				hor = new objetos.hormiga(comida, pesoMaximo, itinerarios);
				cantidadHormigas++;
				client.ready(function (serverProxy) {
					serverProxy.hormigaLlega(hor,pesoMaximo,almacenes[0].id).onReady(function(result){		
						if(result.res === 0 || result.res === -1)
							todoBien = result.res;
				    	cantidadHormigas--;
				    	cantidadComida += result.hormiga.comida.peso;
				    });
				});
			}
			console.log(cantidad + "");
			console.log(cantidad % pesoMaximo + "");
			if((resto = cantidad % pesoMaximo) !== 0){
				hor = new objetos.hormiga(comida, pesoMaximo, itinerarios);
				cantidadHormigas++;
				client.ready(function (serverProxy) {
					console.log(resto);
					serverProxy.hormigaLlega(hor,resto,almacenes[0].id).onReady(function(result){		
						if(result.res === 0 || result.res === -1)
							todoBien = result.res;
				    	cantidadHormigas--;
				    	cantidadComida += result.hormiga.comida.peso;
				    	res.jsonp({
							respuesta:result.res,
							almacenes:funciones.actualizarAlmacenes(result.hormiga,almacenes),
							id:opciones.id
						});
						res.end();	
				    });
				});
			}else{
				hor = new objetos.hormiga(comida, pesoMaximo, itinerarios);
				cantidadHormigas++;
				client.ready(function (serverProxy) {
					serverProxy.hormigaLlega(hor,0,almacenes[0].id).onReady(function(result){		
						if(result.res === 0 || result.res === -1)
							todoBien = result.res;
				    	cantidadHormigas--;
				    	cantidadComida += result.hormiga.comida.peso;
				    	res.jsonp({
							respuesta:result.res,
							almacenes:funciones.actualizarAlmacenes(result.hormiga,almacenes),
							id:opciones.id
						});
						res.end();	
				    });
				});
			}
		}
	})
});

/*
	RPC
*/
/*Servidor*/
/*var eurecaServer = new Eureca.Server();

eurecaServer.attach(server);


//functions under "exports" namespace will be exposed to client side
eurecaServer.exports.hello = function () {
    console.log('Hello from client');
    this.mensaje = "Hola mensaje del servidor";

    return this.mensaje;
};

server.listen(8000);
/*Cliente*/





 