

function agregarfila(){
    var table = document.getElementById("tablapedidos");
    {
        comidas = radiobutton();
        escrito = Array();
        escritoVal = Array();
        for (var i = comidas.length - 1, j=0; i >= 0; i--,j++) {
          escrito[j] = comidas[i].tipo;
          escritoVal[j] = comidas[i].cantidad;
        }

        var row = table.insertRow(table.rows.length);
        var cell = row.insertCell(0); //n
        var cell1 = row.insertCell(1);//fruta
        var cell2 = row.insertCell(2);//kg
        var cell3 = row.insertCell(3);//status
        var cell4 = row.insertCell(4); //KG entregados
        cell.innerHTML = table.rows.length-1;
        cell1.innerHTML = escrito;
        cell2.innerHTML = escritoVal;
        cell3.innerHTML = "Procesando";
        cell4.innerHTML = "0";
    }
    
}    

function radiobutton(){
        var resultado="null";
        var porNombre=document.getElementsByName("fruta");

        var cantidadporNombre = Array();
        
        for (var i = 0; i < 5; i++) {
          cantidadporNombre[i] = document.getElementById("cantidadkg"+i).value;
        }
        var i;
        var comidas = Array(); 
        var cont = 0;
        for(i=0;i<porNombre.length; i++){
            if(porNombre[i].checked) {
                if(cantidadporNombre[i] === null){
                   return false;
                }else{
                  comidas[cont] = {tipo:porNombre[i].value,cantidad:cantidadporNombre[i],pendiente:cantidadporNombre[i]}
                  //comidas[cont] = {tipo:porNombre[i].value,cantidad:document.getElementById("cantidadkg").value,pendiente:document.getElementById("cantidadkg").value}
                  cont++;
                }
            }
          }
         return comidas;
}
       




/****************************************************************/
/****************************************************************/

function actualizar_tablapedidos(peticion){//,peticion
  var x= parseInt(peticion.id); 
  var valor = Array();
  for (var i = peticion.comidas.length - 1,j=0; i >= 0; i--,j++) {
    valor[j] = parseInt(peticion.comidas[i].cantidad) - parseInt(peticion.comidas[i].pendiente);
  }

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

/*
  var table = document.getElementById("tablalmacenes");
  var rowCount = table.rows.length;
   //row = table.rows;

  for(var j=0; j<5; j++){
      for(var i=1; i<rowCount; i++) {//|| i===rowCount
            var row = table.rows[i]; 
            
            row.cells[1].innerHTML = almacenes_tabla[0].depositos[j].cantidadActual; 
            row.cells[2].innerHTML = almacenes_tabla[1].depositos[j].cantidadActual; 
            row.cells[3].innerHTML = almacenes_tabla[2].depositos[j].cantidadActual;
      }  
      
  }*/
  

var nuevoCodigoHtml2 =
   '<div class="col-md-5" id="divtablapedidos"><TABLE border="1" id="tablalmacenes">'+
   '<TR><TD  VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"> <h4> - </h4>'+
       '</TD><TD  VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"><h4> Almacén 1(KG) </h4></TD>'+
       '<TD  VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"><h4> Almacén 2(KG) </h4></TD>'+
       '<TD  VALIGN=MIDDLE ALIGN=CENTER BGCOLOR="#145A32"><h4> Almacén 3(KG) </h4></TD>'+
   '</TR><TR id="man">'+
       '<TD  VALIGN=MIDDLE ALIGN=CENTER>Manzana</TD>'+
       '<TD id ="m1"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[0].depositos[0].cantidadActual+'" disabled> </TD>'+
       '<TD id ="m2"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[1].depositos[0].cantidadActual+'" disabled> </TD>'+
       '<TD id ="m3"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[2].depositos[0].cantidadActual+'" disabled> </TD>'+
   '</TR><TR><TD   VALIGN=MIDDLE ALIGN=CENTER> Pera</TD>'+
       '<TD id ="p1"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[0].depositos[1].cantidadActual+'" disabled></TD>'+
       '<TD id ="p2"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[1].depositos[1].cantidadActual+'" disabled></TD>'+
       '<TD id ="p3"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[2].depositos[1].cantidadActual+'" disabled></TD>'+
   '</TR><TR><TD  VALIGN=MIDDLE ALIGN=CENTER>Naranja</TD>'+
       '<TD id ="n1"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[0].depositos[2].cantidadActual+'" disabled></TD>'+
       '<TD id ="n2"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[1].depositos[2].cantidadActual+'" disabled></TD>'+
       '<TD id ="n3"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[2].depositos[2].cantidadActual+'" disabled></TD>'+
   '</TR><TR><TD  VALIGN=MIDDLE ALIGN=CENTER>Patilla</TD>'+
       '<TD id ="pa1"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[0].depositos[3].cantidadActual+'" disabled> </TD>'+
       '<TD id ="pa2"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[1].depositos[3].cantidadActual+'" disabled> </TD>'+
       '<TD id ="pa3"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[2].depositos[3].cantidadActual+'" disabled> </TD>'+
   '</TR> <TR> <TD  VALIGN=MIDDLE ALIGN=CENTER>Banana</TD>'+
       '<TD id ="b1"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[0].depositos[4].cantidadActual+'" disabled></TD>'+
       '<TD id ="b2"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[1].depositos[4].cantidadActual+'" disabled></TD>'+
       '<TD id ="b3"  VALIGN=MIDDLE ALIGN=CENTER><input type="text" style="text-align:center" value="'+almacenes_tabla[2].depositos[4].cantidadActual+'" disabled></TD></TR>'+
   '</TABLE></div>';

    nodoTr.innerHTML = nuevoCodigoHtml2;
}




$(document).ready(function () {
      $('#solicitar').click( function () {
          if(radiobutton() === false){
            alert("Introduzca cantidad de comida");
          }else{
          var comidas = radiobutton();
          console.log(JSON.stringify(comidas));
          $.ajax({
              method : "GET",
              url: "/creador/comida_reina",
              //dataType: "json",
              data : {comidas : comidas, id:document.getElementById("tablapedidos").rows.length},
              
              success : function(respuesta){
                if (respuesta===1)
                  agregarfila();
             /* actualizar_tablalmacenes(json);*/
                          
              },error:function(){ 
                  //alert("error!!!!");
              },
                  async:   true
              });
          }
      });
     

});


/***********/
/*SERVIDOR*/
/***********/
var client = new Eureca.Client({ uri: 'http://localhost:8200/' });
//var client = new Eureca.Client({ uri: 'http://192.168.110.106:8200/' });
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
