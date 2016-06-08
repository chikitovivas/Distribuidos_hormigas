/** 
	Paquetes y variables
**/
var express = require('express'), 
	fs = require('fs'),
	objetos = require('../Controllers/objetos.js'),
    app = express();

var hormiga = objetos.hormiga;

/*
	Rutas
*/
app.listen(8100,function(){



	/*
		index
	*/
	app.get('/generador',function(req,res){
	
		//hor = req.query.hormiga;		
		var hor = new hormiga(req.query.hormiga);

	});

	/*
		creador
	*/
	app.get('/creador/comida_reina', function(req,res){

		//res.writeHead(200, {'Content-Type': 'application/json'});
		var opciones = req.query;
		var comida = opciones.comida, 
			cantidad = opciones.cantidad;

		res.jsonp(opciones);
		res.end();

	})

});
