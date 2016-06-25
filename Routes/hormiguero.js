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



var cantidadHormigas = 0,
	cantidadHormigasActivas = 0;
var almacenes = objetos.almacenes;

var html = fs.readFileSync("../public/index.html");
/*
		Inicializacion de los depositos
*/
var hormiguero = new Eureca.Client({ uri: 'http://localhost:8200/' });
var serverProxy;
hormiguero.ready(function (serverProx) {
	serverProxy = serverProx;
});
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

inicializarAlmacenes();


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

			while(flag){
				//console.log("i: "+i);
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
				var hormiga = new objetos.hormiga(comida, pendiente, funciones.crearItinerario(almacenes,pendiente,opciones.comida), pendiente, [null,null,null],peticionActual);	
				enviarHormiga(hormiga);
				console.log(hormiga.itinerario);
				peticionesReina[peticionActual].pendienteEnviado += pendiente;

				if(peticionesReina[peticionActual].pendienteEnviado >= cantidad){
					flag = 0;
				}	
				i++;	
			}
		
		res.jsonp(1);
		res.end();
	});


});

/*
	RPC
*/
/*Servidor*/
var eurecaServer = new Eureca.Server({allow : ['tchat.peticionlista']});
var connections = {};
var browser;

eurecaServer.attach(server);

eurecaServer.onConnect(function (connection) {
    //console.log('New client ', connection.id, connection.eureca.remoteAddress);
 	connections[connection.id] = {nick:null, client:eurecaServer.getClient(connection.id)};
});

eurecaServer.onDisconnect(function (connection) {    
    //console.log('Client quit', connection.id);
 delete connections[connection.id];
});

var sumar = 0;
//functions under "exports" namespace will be exposed to client side
eurecaServer.exports.hormigaLlegaFull = function (hormiga) {
	//var client = new Eureca.Client({ uri: 'http://localhost:8201/' });
	actualizarAlmacenes(hormiga);
	peticionesReina[hormiga.idPeticion].pendiente -= hormiga.comida.peso;
	peticionesReina[hormiga.idPeticion].cantidadHormigas--;
	cantidadHormigasActivas--;
	sumar += hormiga.comida.peso;
	console.log(peticionesReina[hormiga.idPeticion].cantidadHormigas + "i");
	
	if(peticionesReina[hormiga.idPeticion].pendiente <= 0){
		console.log("Ya hormiga reina obtuvo: "+ peticionesReina[hormiga.idPeticion].id);
		connections[browser].client.tchat.peticionlista(hormiga.inventario, peticionesReina[hormiga.idPeticion]);
		console.log(JSON.stringify(hormiga.inventario));
	}	

	if(peticionesReina[hormiga.idPeticion].cantidadHormigas === 1){
		console.log("Ya llegaron todas las hormigas");
		connections[browser].client.tchat.peticionlista(hormiga.inventario, peticionesReina[hormiga.idPeticion]);
		console.log(JSON.stringify(hormiga.inventario));
	}
};

var tchatServer = eurecaServer.exports.tchatServer = {};

tchatServer.browser = function () {
	console.log('Client %s auth with %s', this.connection.id);
	var id = this.connection.id;

	browser = id;
	console.log(almacenes);
	return almacenes;
};

server.listen(8200);

 

 /*
	Funciones no Migrables
 */

 function inicializarAlmacenes(){

	client.ready(function (serverProx) {
		serverProx.getDepositos().onReady(function(result){
    		almacenes[0].depositos = result;
    	});
	});
	client1.ready(function (serverProx) {
		serverProx.getDepositos().onReady(function(result){
    		almacenes[1].depositos = result;
    	});
	});
	client2.ready(function (serverProx) {
		serverProx.getDepositos().onReady(function(result){
    		almacenes[2].depositos = result;
    	});
	});		

}

function enviarHormiga(hormiga){

	if(hormiga.itinerario.next === 3){ //servidor
			serverProxy.hormigaLlegaFull(hormiga);
	}else if(hormiga.itinerario.next === 0){// almacen 0
			almacenProxy0.hormigaLlega(hormiga);
	}else if(hormiga.itinerario.next === 1){	// almacen 1
			almacenProxy1.hormigaLlega(hormiga);
	}else if(hormiga.itinerario.next === 2){	// almacen 2
			almacenProxy2.hormigaLlega(hormiga);
	}
}

function actualizarAlmacenes(hormiga){
	if(hormiga.inventario[0] !== null)
		almacenes[0] = hormiga.inventario[0];
	if(hormiga.inventario[1] !== null)
		almacenes[1] = hormiga.inventario[1];
	if(hormiga.inventario[2] !== null)
		almacenes[2] = hormiga.inventario[2];				 
}