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
	cantidadHormigas = 0,
	cantidadHormigasActivas = 0;

var html = fs.readFileSync("../public/index.html");
/*
		Inicializacion de los depositos
*/
var almacenes = funciones.inicializarAlmacenes();


var itinerarios = [new objetos.itinerario(almacenes[0].puerto,'localhost','/',almacenes[0].id),
			 new objetos.itinerario(almacenes[1].puerto,'localhost','/',almacenes[1].id), 
			 new objetos.itinerario(almacenes[2].puerto,'localhost','/',almacenes[2].id)];

//app.use(express.static('C:/Users/Usuario/Desktop/Distribuidos_node/public'));
app.use(express.static('C:/Users/Administrador/Documents/NetBeansProjects/Distribuidos_hormigas/public'));

var peticionesReina = new Array();
var cantidadPeticiones = 0;

/*
	Rutas
*/
app.listen(8100,function(){
	//app.use(express.static('public'));

	app.get('/',function(req,res){
		res.send(html.toString());
		//res.end();
	});
		
	app.get('/creador/comida_reina', function(req,res){
		var client = new Eureca.Client({ uri: 'http://localhost:8010/' });
		var opciones = req.query;
		var comida = new objetos.comida(opciones.comida+"",0), 
			cantidad = opciones.cantidad, flag = 1;

		var peticionActual = cantidadPeticiones;	
		var i=0;
		var pendiente = 0;
		var faltante = cantidad;

		peticionesReina[peticionActual] = new objetos.peticiones(opciones.id, 1, comida, cantidad);	
		cantidadPeticiones++;
		
		console.log(peticionesReina[peticionActual]);

		client.ready(function (serverProxy) {
			while(flag){
				console.log("i: "+i);
				var pedir0 = Math.floor(Math.random() * (1 - 1) + 1);
				var pedir1 = Math.floor(Math.random() * (cantidadHormigasActivas - 1) + 1);
				if(cantidadHormigasActivas === 0)
					pendiente = pedir0;
				else
					pendiente = pedir1;

				if(faltante < pendiente)
					pendiente = faltante;
				else
					faltante -= pendiente;

				cantidadHormigasActivas++;
				peticionesReina[peticionActual].cantidadHormigas++;
					
				serverProxy.hormigaLlega(new objetos.hormiga(comida, pendiente, itinerarios, pendiente, [null,null,null],peticionActual),1);
			
				peticionesReina[peticionActual].pendienteEnviado += pendiente;

				if(peticionesReina[peticionActual].pendienteEnviado >= cantidad){
					flag = 0;
				}	
				i++;	
			}
		});
		return 1;
	});


});

/*
	RPC
*/
/*Servidor*/
var eurecaServer = new Eureca.Server();

eurecaServer.attach(server);

var sumar = 0;
//functions under "exports" namespace will be exposed to client side
eurecaServer.exports.hormigaLlegaFull = function (hormiga) {
	var client = new Eureca.Client({ uri: 'http://localhost:8201/' });
	peticionesReina[hormiga.idPeticion].pendiente -= hormiga.comida.peso;
	peticionesReina[hormiga.idPeticion].cantidadHormigas--;
	cantidadHormigasActivas--;
	sumar += hormiga.comida.peso;
	console.log(peticionesReina[hormiga.idPeticion].cantidadHormigas + "i");
	
	if(peticionesReina[hormiga.idPeticion].pendiente <= 0){
		console.log("Ya hormiga reina obtuvo: "+ peticionesReina[hormiga.idPeticion].id);
		client.ready(function (serverProxy) {
			serverProxy.peticionlista(hormiga.inventario,peticionesReina[hormiga.idPeticion]);
		});
	}	

	if(peticionesReina[hormiga.idPeticion].cantidadHormigas === 1){
		console.log("Ya llegaron todas las hormigas");
		client.ready(function (serverProxy) {
			serverProxy.peticionlista(hormiga.inventario,peticionesReina[hormiga.idPeticion]);
		});
	}
};

server.listen(8200);
/*Cliente*/


 