/*var express = require('express')
  , app = express(app)
  , server = require('http').createServer(app);
var Eureca = require('eureca.io');*/


function agregarfila(){
    var table = document.getElementById("tablapedidos");
    {
        var row = table.insertRow(table.rows.length);
        var cell = row.insertCell(0); //n
        var cell1 = row.insertCell(1);//fruta
        var cell2 = row.insertCell(2);//kg
        var cell3 = row.insertCell(3);//status
        
        cell.innerHTML = table.rows.length-1;
        cell1.innerHTML = radiobutton();
        cell2.innerHTML = document.getElementById("cantidadkg").value;
        cell3.innerHTML = "Procesando";
    }
    
}    

function radiobutton(){
        var resultado="null";
        var porNombre=document.getElementsByName("fruta");
        var i;
        
        for(i=0;i<porNombre.length; i++){
                if(porNombre[i].checked) {
                    resultado=porNombre[i].value;
                }
        }
        return resultado;
}


function actualizar_tablapedidos(peticion){
    var actualizado;
    
    var tabla = document.getElementById("tablapedidos");  

}

function actualizar_tablalmacenes(almacenes){
    
   /* document.getElementById("m1").value = json.almacenes[0].depositos[0].cantidadActual;
    document.getElementById("m2").value = json.almacenes[1].depositos[0].cantidadActual;
    document.getElementById("m3").value = json.almacenes[2].depositos[0].cantidadActual;
    document.getElementById("p1").value = json.almacenes[0].depositos[1].cantidadActual;
    document.getElementById("p2").value = json.almacenes[1].depositos[1].cantidadActual;
    document.getElementById("p3").value = json.almacenes[2].depositos[1].cantidadActual;
    document.getElementById("n1").value = json.almacenes[0].depositos[1].cantidadActual;
    document.getElementById("n2").value = json.almacenes[1].depositos[2].cantidadActual;
    document.getElementById("n3").value = json.almacenes[2].depositos[2].cantidadActual;
    document.getElementById("pa1").value = json.almacenes[0].depositos[2].cantidadActual;
    document.getElementById("pa2").value = json.almacenes[1].depositos[3].cantidadActual;
    document.getElementById("pa3").value = json.almacenes[2].depositos[3].cantidadActual;
    document.getElementById("b1").value = json.almacenes[0].depositos[4].cantidadActual;
    document.getElementById("b2").value = json.almacenes[1].depositos[4].cantidadActual;
    document.getElementById("b3").value = json.almacenes[2].depositos[4].cantidadActual;*/
    
    
    var nodo = document.getElementById("man");
    //El nodo recibido es SPAN
    var elemento = document.getElementById("m1").value;
   // elemento.innerHTML = 5;
    
    var nodoTd = nodo.parentNode; //Nodo TD
    var nodoTr = nodoTd.parentNode; //Nodo TR
    //var nodoContenedorForm = document.getElementById('contenedorForm'); //Nodo DIV
    var nodosEnTr = nodoTr.getElementsByTagName('td');
   /* var alimento = nodosEnTr[0].textContent; 
    var calorias = nodosEnTr[1].textContent;
    var grasas = nodosEnTr[2].textContent; 
    var proteina = nodosEnTr[3].textContent;
    var carbohidratos = nodosEnTr[4].textContent; 
    var opciones = nodosEnTr[5].textContent;*/
    /*
    var nuevoCodigoHtml = '<td><input type="text" name="alimento" id="alimento" value="'+alimento+'" size="10"></td>'+
    '<td><input type="text" name="calorias" id="calorias" value="'+calorias+'" size="5"</td>'+
    '<td><input type="text" name="grasas" id="grasas" value="'+grasas+'" size="5"</td>'+
    '<td><input type="text" name="proteina" id="proteina" value="'+proteina+'" size="5"</td>'+
    '<td><input type="text" name="carbohidratos" id="carbohidratos" value="'+carbohidratos+'" size="5"</td> <td>En edición</td>';
*/

 
    /*var nuevoCodigoHtml2 ='<TD width=100 VALIGN=MIDDLE ALIGN=CENTER> Manzana</TD>'+
                    '<TD id ="m1" width=100 VALIGN=MIDDLE ALIGN=CENTER ><input type="text" value="'+json.almacenes[0].depositos[0].cantidadActual+'"></TD>'+
                    '<TD id ="m2" width=100 VALIGN=MIDDLE ALIGN=CENTER ><input type="text" value="'+json.almacenes[1].depositos[0].cantidadActual+'"></TD>'+
                    '<TD id ="m3" width=100 VALIGN=MIDDLE ALIGN=CENTER ><input type="text" value="'+json.almacenes[2].depositos[0].cantidadActual+'"></TD>';
   */
   
  var nuevoCodigoHtml2 =
   '<div class="col-md-5" id="divtablapedidos"><TABLE border="1" id="tablalmacenes">'+
   '<TR><TD width=100 VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"> <h4> - </h4>'+
       '</TD><TD width=300 VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"><h4> Almacén 1(KG) </h4></TD>'+
       '<TD width=300 VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"><h4> Almacén 2(KG) </h4></TD>'+
       '<TD width=300 VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"><h4> Almacén 3(KG) </h4></TD>'+
   '</TR><TR id="man">'+
       '<TD width=100 VALIGN=MIDDLE ALIGN=CENTER>Manzana</TD>'+
       '<TD id ="m1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[0].depositos[0].cantidadActual+'"> </TD>'+
       '<TD id ="m2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[1].depositos[0].cantidadActual+'"> </TD>'+
       '<TD id ="m3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[2].depositos[0].cantidadActual+'"> </TD>'+
   '</TR><TR><TD  width=100 VALIGN=MIDDLE ALIGN=CENTER> Pera</TD>'+
       '<TD id ="p1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[0].depositos[1].cantidadActual+'"></TD>'+
       '<TD id ="p2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[1].depositos[1].cantidadActual+'"></TD>'+
       '<TD id ="p3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[2].depositos[1].cantidadActual+'"></TD>'+
   '</TR><TR><TD width=100 VALIGN=MIDDLE ALIGN=CENTER>Naranja</TD>'+
       '<TD id ="n1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[0].depositos[2].cantidadActual+'"></TD>'+
       '<TD id ="n2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[1].depositos[2].cantidadActual+'"></TD>'+
       '<TD id ="n3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[2].depositos[2].cantidadActual+'"></TD>'+
   '</TR><TR><TD width=100 VALIGN=MIDDLE ALIGN=CENTER>Patilla</TD>'+
       '<TD id ="pa1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[0].depositos[3].cantidadActual+'"> </TD>'+
       '<TD id ="pa2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[1].depositos[3].cantidadActual+'"> </TD>'+
       '<TD id ="pa3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[2].depositos[3].cantidadActual+'"> </TD>'+
   '</TR> <TR> <TD width=100 VALIGN=MIDDLE ALIGN=CENTER>Banana</TD>'+
       '<TD id ="b1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[0].depositos[4].cantidadActual+'"></TD>'+
       '<TD id ="b2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[1].depositos[4].cantidadActual+'"></TD>'+
       '<TD id ="b3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes[2].depositos[4].cantidadActual+'"></TD></TR>'+
   '</TABLE></div>';



   /*var nuevoCodigoHtml2 =
   '<div class="col-md-5" id="divtablapedidos"><TABLE border="1" id="tablalmacenes">'+
   '<TR><TD width=100 VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"> <h4> - </h4>'+
       '</TD><TD width=300 VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"><h4> Almacén 1(KG) </h4></TD>'+
       '<TD width=300 VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"><h4> Almacén 2(KG) </h4></TD>'+
       '<TD width=300 VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"><h4> Almacén 3(KG) </h4></TD>'+
   '</TR><TR id="man">'+
       '<TD width=100 VALIGN=MIDDLE ALIGN=CENTER>Manzana</TD>'+
       '<TD id ="m1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[0].cantidadActual+'"> </TD>'+
       '<TD id ="m2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[0].cantidadActual+'"> </TD>'+
       '<TD id ="m3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[0].cantidadActual+'"> </TD>'+
   '</TR><TR><TD  width=100 VALIGN=MIDDLE ALIGN=CENTER> Pera</TD>'+
       '<TD id ="p1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[1].cantidadActual+'"></TD>'+
       '<TD id ="p2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[1].cantidadActual+'"></TD>'+
       '<TD id ="p3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[1].cantidadActual+'"></TD>'+
   '</TR><TR><TD width=100 VALIGN=MIDDLE ALIGN=CENTER>Naranja</TD>'+
       '<TD id ="n1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[2].cantidadActual+'"></TD>'+
       '<TD id ="n2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[2].cantidadActual+'"></TD>'+
       '<TD id ="n3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[2].cantidadActual+'"></TD>'+
   '</TR><TR><TD width=100 VALIGN=MIDDLE ALIGN=CENTER>Patilla</TD>'+
       '<TD id ="pa1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[3].cantidadActual+'"> </TD>'+
       '<TD id ="pa2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[3].cantidadActual+'"> </TD>'+
       '<TD id ="pa3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[3].cantidadActual+'"> </TD>'+
   '</TR> <TR> <TD width=100 VALIGN=MIDDLE ALIGN=CENTER>Banana</TD>'+
       '<TD id ="b1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[4].cantidadActual+'"></TD>'+
       '<TD id ="b2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[4].cantidadActual+'"></TD>'+
       '<TD id ="b3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+json.almacenes[0].depositos[4].cantidadActual+'"></TD></TR>'+
   '</TABLE></div>';
   
   */
   
   
 /*   var nuevoCodigoHtml2 ='<TD width=100 VALIGN=MIDDLE ALIGN=CENTER> Manzana</TD>'+
                    '<TD id ="m1" width=100 VALIGN=MIDDLE ALIGN=CENTER > hfhfthftght </TD>'+
                    '<TD id ="m2" width=100 VALIGN=MIDDLE ALIGN=CENTER value="6"> gdrhgdrhth </TD>'+
                    '<TD id ="m3" width=100 VALIGN=MIDDLE ALIGN=CENTER value="4"> hfhfhfhfg </TD>';
      
     */ 
    nodoTr.innerHTML = nuevoCodigoHtml2;
}




$(document).ready(function () {
    $('#solicitar').click( function () {
        $.ajax({
            method : "GET",
            url: "/creador/comida_reina",
            //dataType: "json",
            data : {comida : radiobutton(), cantidad:document.getElementById("cantidadkg").value, id:document.getElementById("tablapedidos").rows.length-1},
            
            success : function(respuesta){
              agregarfila();
           /* actualizar_tablalmacenes(json);*/
                        
            },error:function(){ 
                //alert("error!!!!");
            },
                async:   true
            });
  } );
});


var Eureca = require('eureca.io');
var client = new Eureca.Client({  uri :  'http: // localhost: 8000 /'  });


    client.exports.peticionlista = function (almacenes, peticion){ 
      //respuesta
      //almacenes:  arreglo de almacenes
      //peticion: funcion completa de la peticion respondida
        actualizar_tablapedidos(peticion);
        actualizar_tablalmacenes(almacenes);
    }

    




/*Servidor*/
var eurecaServer = new Eureca.Server();

eurecaServer.attach(server);

eurecaServer.exports.peticionlista = function (almacenes, peticion){
   //respuesta
      //almacenes:  arreglo de almacenes
      //peticion: funcion completa de la peticion respondida
        actualizar_tablapedidos(peticion);
        actualizar_tablalmacenes(almacenes);
    };
server.listen(8201);