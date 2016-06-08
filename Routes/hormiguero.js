/** 
	Paquetes y variables
**/
var express = require('express'), 
	fs = require('fs'),
	objetos = require('../Controllers/objetos.js'),
    app = express();

/*var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded*/

var hormiga = objetos.hormiga;
var pesoMaximo = 10;

var html = fs.readFileSync("../index.html");


/*
	Rutas
*/
app.listen(8000,function(){

	/*
		index
	*/
	app.get('/',function(req,res){

		//hor = new hormiga(100,5);
		res.write(html);
		res.end();

	});

	/*
		creador
	*/
	app.get('/creador/comida_reina', function(req,res){

		//res.writeHead(200, {'Content-Type': 'application/json'});
		var opciones = req.query;
		var comida = opciones.comida, 
			cantidad = opciones.cantidad;

		if(cantidad < pesoMaximo){
			hor = new hormiga(comida, pesoMaximo, null);
			//do Something
		}else{
			var cantidad_hormigas = cantidad / pesoMaximo; 
			for (var i = cantidad_hormigas - 1; i >= 0; i--) {
				hor = new hormiga(comida, pesoMaximo, null);
				//do Something
			}
			if(resto = cantidad % pesoMaximo !== 0){
				hor = new hormiga(comida, resto, null);
				//do Something
			}
		}

		res.jsonp(opciones);
		res.end();

	})


});

