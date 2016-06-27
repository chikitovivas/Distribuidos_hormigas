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
var generadoresdecomida = objetos.generadoresdecomida;

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
var client3 = new Eureca.Client({ uri: 'http://localhost:'+generadoresdecomida[0].puerto+'/' });
var almacenProxy3;
client3.ready(function (serverProx) {
	almacenProxy3 = serverProx;
	
});
var client4 = new Eureca.Client({ uri: 'http://localhost:'+generadoresdecomida[1].puerto+'/' });
var almacenProxy4;
client4.ready(function (serverProx) {
	almacenProxy4 = serverProx;
	
});
var client5 = new Eureca.Client({ uri: 'http://localhost:'+generadoresdecomida[2].puerto+'/' });
var almacenProxy5;
client5.ready(function (serverProx) {
	almacenProxy5 = serverProx;
	
});
var client6 = new Eureca.Client({ uri: 'http://localhost:'+generadoresdecomida[3].puerto+'/' });
var almacenProxy6;
client6.ready(function (serverProx) {
	almacenProxy6 = serverProx;
	
});
var client7 = new Eureca.Client({ uri: 'http://localhost:'+generadoresdecomida[4].puerto+'/' });
var almacenProxy7;
client7.ready(function (serverProx) {
	almacenProxy7 = serverProx;
	
});


inicializarAlmacenes();

app.use(express.static('C:/Users/Usuario/Desktop/Distribuidos_node/public'));

//app.use(express.static('C:/Users/Administrador/Documents/NetBeansProjects/Distribuidos_hormigas/public'));

var peticionesReina = new Array();
var cantidadPeticiones = 0;


/*
	Rutas
*/
app.listen(8100,function(){
	//app.use(express.static('public'));

	app.get('/',function(req,res){
		res.send(html.toString());
	});
		
	app.get('/creador/comida_reina', function(req,res){
		var opciones = req.query;
		var comidas = opciones.comidas, flag = 1;

		var peticionActual = cantidadPeticiones;	

		peticionesReina[peticionActual] = new objetos.peticiones(opciones.id, 1, comidas);	
		cantidadPeticiones++;
		
		console.log(peticionesReina[peticionActual]);			

		for (var i = comidas.length - 1; i >= 0; i--) {
			var flag = 1;
			var pesoHormiga = 0;
			var faltante = comidas[i].cantidad;
			while(flag){
				var pedir0 = Math.floor(Math.random() * (1 - 1) + 1);
				var pedir1 = Math.floor(Math.random() * (cantidadHormigasActivas - 1) + 1);
				if(cantidadHormigasActivas === 0)
					pesoHormiga = pedir0;
				else
					pesoHormiga = pedir1;

				if(faltante < pesoHormiga){
					pesoHormiga = faltante;
					faltante = 0;
				}
				else
					faltante -= pesoHormiga;

				cantidadHormigasActivas++;//aumenta la cantidad de hormigas activas
				peticionesReina[peticionActual].cantidadHormigas++;//auumenta cantidad de hormigas que se enviaron en la peticion
				peticionesReina[peticionActual].cantidadHormigasEnviadas++;
				/* hormiga
			   comida: tipo y peso
			   pediente: peso maximo 
			   objeto ininerario
			   pendiente: es lo que va a pedir
			   null 1,2,3: inventarios de los almacenes
			   opciones.id: id de la peticion
				*/
				var hormiga = new objetos.hormiga(new objetos.comida(comidas[i].tipo+"",0), pesoHormiga, funciones.crearItinerario2(almacenes,pesoHormiga,comidas[i].tipo,0,0), pesoHormiga, [null,null,null],opciones.id);	
				enviarHormiga(hormiga);//envia la hormiga al respectivo almacen
				console.log(hormiga.itinerario);//se imprime el itinerario de la homiga
				if(faltante === 0){
					flag = 0;
				}
			}
		}
		res.jsonp(1);
		res.end();
	});


});

/*
	RPC
*/
/***********/
/*SERVIDOR*/
/***********/
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
 	peticionesReina = new Array();
	cantidadPeticiones = 0;
});

var sumar = 0;
//functions under "exports" namespace will be exposed to client side
eurecaServer.exports.hormigaLlegaFull = function (hormiga) {
	actualizarAlmacenes(hormiga);
	buscarPeticion(hormiga,eventoLlegaHormiga);
};

eurecaServer.exports.hormigaGeneradores = function (almacen_peticion,cantidad_peticion,tipocomida_peticion) {
	generarPeticion(almacen_peticion,cantidad_peticion,tipocomida_peticion);
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
	}else if(hormiga.itinerario.next === 10){	// generador manzana
			almacenProxy3.llegageneradores(hormiga);
	}
	else if(hormiga.itinerario.next === 11){	// generador pera
			almacenProxy4.llegageneradores(hormiga);
	}
	else if(hormiga.itinerario.next === 12){	// generador naranja
			almacenProxy5.llegageneradores(hormiga);
	}
	else if(hormiga.itinerario.next === 13){	// generador patilla
			almacenProxy6.llegageneradores(hormiga);
	}
	else if(hormiga.itinerario.next === 14){	// generador banana
			almacenProxy7.llegageneradores(hormiga);
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

function buscarPeticion(hormiga,callback){
	for (var i = peticionesReina.length - 1; i >= 0; i--) {
		if(peticionesReina[i].id === hormiga.idPeticion){
			callback(i,hormiga);
		}
	}
}
function restaurarAlmacen(almacen,deposito){
	if(almacen === 0){// almacen 0
			almacenProxy0.restaurarDeposito(deposito);
	}else if(almacen === 1){	// almacen 1
			almacenProxy1.restaurarDeposito(deposito);
	}else if(almacen === 2){	// almacen 2
			almacenProxy2.restaurarDeposito(deposito);
	}
}


function eventoLlegaHormiga(i,hormiga){
	for (var j = peticionesReina[i].comidas.length - 1; j >= 0; j--) {
		if(peticionesReina[i].comidas[j].tipo === hormiga.comida.tipo)
			peticionesReina[i].comidas[j].pendiente -= hormiga.comida.peso;	
	}	
	peticionesReina[i].cantidadHormigas--;
	cantidadHormigasActivas--;
	peticionesReina[i].cantidadComidaLlegando += hormiga.comida.peso;
	console.log(peticionesReina[i].cantidadHormigas + "i");
	console.log(hormiga);
	console.log(sumar);
	if(peticionesReina[i].cantidadHormigas === 1  ){
		console.log("Ya llegaron todas las hormigas con carga");
		cantidadHormigasActivas++;
		var hormigaEspecial = new objetos.hormiga(new objetos.comida(hormiga.comida.tipo+"",0), 0, new objetos.itinerario([0,1,2,3]) , 0, [null,null,null],hormiga.idPeticion);	
		enviarHormiga(hormigaEspecial);
		if(hormiga.idPeticion >= 10000){
			console.log(hormiga.idPeticion);
			console.log(hormiga.itinerario.recorrido[1]);
			restaurarAlmacen(hormiga.itinerario.recorrido[1],hormiga.comida.tipo);
		}
	}
	if(peticionesReina[i].cantidadHormigas === 0){
		console.log("Ya llego hormiga especial");
		connections[browser].client.tchat.peticionlista(hormiga.inventario, peticionesReina[i]);
		console.log(JSON.stringify(peticionesReina[i]));
	}
}


var num_peticiones =10000;
function generarPeticion(almacen_peticion,cantidad_peticion,tipocomida_peticion){
		var objetoComida = {tipo:tipocomida_peticion,cantidad:cantidad_peticion,pendiente:cantidad_peticion};
		var flag = 1;

		var peticionActual = cantidadPeticiones;	
		var pendiente = 0; //Inicializacion del peso maximo de la hormiga y lo que va a pedir
		var faltante = cantidad_peticion; //disminuye cada vez que se manda una hormiga
		var suma = 0

		peticionesReina[peticionActual] = new objetos.peticiones(num_peticiones, 1, objetoComida);	
		cantidadPeticiones++;
		console.log(cantidad_peticion);
		console.log(peticionesReina[peticionActual]);

		while(flag){
			var pedir0 = Math.floor(Math.random() * (1 - 1) + 1);
			var pedir1 = Math.floor(Math.random() * (cantidadHormigasActivas - 1) + 1);
			if(cantidadHormigasActivas === 0)
				pendiente = pedir0;
			else
				pendiente = pedir1;

			if(faltante < pendiente){
				pendiente = faltante;
				faltante = 0;
			}else
				faltante -= pendiente;

			cantidadHormigasActivas++; //aumenta la cantidad e hormigas activas
			peticionesReina[peticionActual].cantidadHormigas++; //auumenta cantidad de hormigas que se enviaron en la peticion
			peticionesReina[peticionActual].cantidadHormigasEnviadas++;
			/* hormiga
			   comida: tipo y peso
			   pediente: peso maximo 
			   objeto ininerario
			   pendiente: es lo que va a pedir
			   null 1,2,3: inventarios de los almacenes
			   opciones.id: id de la peticion
			*/
			var hormiga = new objetos.hormiga(new objetos.comida(tipocomida_peticion+"",0), pendiente, funciones.crearItinerario2(generadoresdecomida,pendiente,tipocomida_peticion,1,almacen_peticion), pendiente, [null,null,null],peticionesReina[peticionActual].id);	
			//var hormiga = new objetos.hormiga(comida, pendiente, funciones.crearItinerario(almacenes,pendiente,opciones.comida), pendiente, [null,null,null],opciones.id);	
			enviarHormiga(hormiga); //envia la hormiga a la respectiva ruta
			console.log(hormiga.itinerario); //se imprime el itinerario de la homiga
			suma += pendiente;
			console.log(faltante);
			console.log(suma);
			if(faltante === 0)
				flag = 0;
			
		}
	num_peticiones++;
}