

function agregarfila(){
    var table = document.getElementById("tablapedidos");
    {
        var row = table.insertRow(table.rows.length);
        var cell = row.insertCell(0); //n
        var cell1 = row.insertCell(1);//fruta
        var cell2 = row.insertCell(2);//kg
        var cell3 = row.insertCell(3);//status
        var cell4 = row.insertCell(4); //KG entregados
        cell.innerHTML = table.rows.length-1;
        cell1.innerHTML = radiobutton();
        cell2.innerHTML = document.getElementById("cantidadkg").value;
        cell3.innerHTML = "Procesando";
        cell4.innerHTML = "0";
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



/****************************************************************/
/****************************************************************/

function actualizar_tablapedidos(peticion){//,peticion
var x= parseInt(peticion.id); 
var valor= parseInt(peticion.pendienteEnviado)-parseInt(peticion.pendiente);

  var table = document.getElementById("tablapedidos");
  var rowCount = table.rows.length;
  console.log("tengo: "+ rowCount+ " filas"); 

   for(var i=1; i<=rowCount; i++) {//|| i===rowCount
        if(i===x) {
            var row = table.rows[i]; 
            row.cells[3].innerHTML = "Listo"; /**/
            row.cells[4].innerHTML = valor;
        } 
  }  
}


/****************************************************************/
/****************************************************************/



/****************************************************************/
//********************IDIOTA DE MIERDA***************************
//********************"bahh"*************************************
//*********************"no me importa"***************************
//*********************IMBECIL DE MIERDA*************************
//*********************ojala te coma el tigre******************** 
//*********************ojala no haya almuerzo hoy en tu casa ****
//*********************ojala se te vaya la luz a la hora de GOT**
//********************* 8-)  **************************************** 
/**********************************************************************/


var almacenes_tabla = new Array();

function actualizar_tablalmacenes(almacenes){
    
    var nodo = document.getElementById("man");
    var elemento = document.getElementById("m1").value;
    
    var nodoTd = nodo.parentNode; //Nodo TD
    var nodoTr = nodoTd.parentNode; //Nodo TR
    var nodosEnTr = nodoTr.getElementsByTagName('td');
 

    //console.log(" Hola soy almacenes_tabla[] antes de la arrechera: ", almacenes_tabla);
    if (almacenes[0] !== null) 
        almacenes_tabla[0]= almacenes[0];
    if (almacenes[1] !== null) 
        almacenes_tabla[1]= almacenes[1];
    if (almacenes[2] !== null)
        almacenes_tabla[2]= almacenes[2];
 
var nuevoCodigoHtml2 =
   '<div class="col-md-5" id="divtablapedidos"><TABLE border="1" id="tablalmacenes">'+
   '<TR><TD width=100 VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"> <h4> - </h4>'+
       '</TD><TD width=300 VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"><h4> Almacén 1(KG) </h4></TD>'+
       '<TD width=300 VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"><h4> Almacén 2(KG) </h4></TD>'+
       '<TD width=300 VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"><h4> Almacén 3(KG) </h4></TD>'+
   '</TR><TR id="man">'+
       '<TD width=100 VALIGN=MIDDLE ALIGN=CENTER>Manzana</TD>'+
       '<TD id ="m1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[0].depositos[0].cantidadActual+'" disabled> </TD>'+
       '<TD id ="m2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[1].depositos[0].cantidadActual+'" disabled> </TD>'+
       '<TD id ="m3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[2].depositos[0].cantidadActual+'" disabled> </TD>'+
   '</TR><TR><TD  width=100 VALIGN=MIDDLE ALIGN=CENTER> Pera</TD>'+
       '<TD id ="p1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[0].depositos[1].cantidadActual+'" disabled></TD>'+
       '<TD id ="p2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[1].depositos[1].cantidadActual+'" disabled></TD>'+
       '<TD id ="p3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[2].depositos[1].cantidadActual+'" disabled></TD>'+
   '</TR><TR><TD width=100 VALIGN=MIDDLE ALIGN=CENTER>Naranja</TD>'+
       '<TD id ="n1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[0].depositos[2].cantidadActual+'" disabled></TD>'+
       '<TD id ="n2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[1].depositos[2].cantidadActual+'" disabled></TD>'+
       '<TD id ="n3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[2].depositos[2].cantidadActual+'" disabled></TD>'+
   '</TR><TR><TD width=100 VALIGN=MIDDLE ALIGN=CENTER>Patilla</TD>'+
       '<TD id ="pa1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[0].depositos[3].cantidadActual+'" disabled> </TD>'+
       '<TD id ="pa2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[1].depositos[3].cantidadActual+'" disabled> </TD>'+
       '<TD id ="pa3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[2].depositos[3].cantidadActual+'" disabled> </TD>'+
   '</TR> <TR> <TD width=100 VALIGN=MIDDLE ALIGN=CENTER>Banana</TD>'+
       '<TD id ="b1" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[0].depositos[4].cantidadActual+'" disabled></TD>'+
       '<TD id ="b2" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[1].depositos[4].cantidadActual+'" disabled></TD>'+
       '<TD id ="b3" width=100 VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[2].depositos[4].cantidadActual+'" disabled></TD></TR>'+
   '</TABLE></div>';

    nodoTr.innerHTML = nuevoCodigoHtml2;
}




$(document).ready(function () {
    $('#solicitar').click( function () {
        $.ajax({
            method : "GET",
            url: "/creador/comida_reina",
            //dataType: "json",
            data : {comida : radiobutton(), cantidad:document.getElementById("cantidadkg").value, id:document.getElementById("tablapedidos").rows.length},
            
            success : function(respuesta){
              if (respuesta===1)
                agregarfila();
           /* actualizar_tablalmacenes(json);*/
                        
            },error:function(){ 
                //alert("error!!!!");
            },
                async:   true
            });
  } );
});


/***********/
/*SERVIDOR*/
/***********/

var client = new Eureca.Client({ uri: 'http://localhost:8200/' });
  var server;

client.ready(function (proxy) {
  server = proxy;

  server.tchatServer.browser().onReady(function(result){ 
      //console.log("Soy result de almacenes_tabla y estoy triplemente arrecho: ",result);
      //almacenes_tabla=result;
      actualizar_tablalmacenes(result);
      //console.log(" Hola soy almacenes_tabla[1].depositos[0].cantidadActual: ", almacenes_tabla[1].depositos[0].cantidadActual);

  });
});


var tchat = client.exports.tchat = {};
 
   tchat.peticionlista = function(almacenes, peticion)
   {  //respuesta
      //almacenes:  arreglo de almacenes
      //peticion: funcion completa de la peticion respondida
        actualizar_tablapedidos(peticion);console.log("soy la peticion que esta lista:", peticion.id);
        actualizar_tablalmacenes(almacenes);
   }
