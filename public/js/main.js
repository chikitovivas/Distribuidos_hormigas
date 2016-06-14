

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

$(document).ready(function () {
  	$('#solicitar').click( function () {
        $.ajax({
            method : "GET",
            url: "/creador/comida_reina",
            //dataType: "json",
            data : {comida : radiobutton(), cantidad:document.getElementById("cantidadkg").value, id:document.getElementById("tablapedidos").rows.length-1},
            
            success : function(json){
                        alert(JSON.stringify(json));
                        console.log(JSON.stringify(json.almacenes[0].depositos[0].capacidadActual));	
            
            agregarfila();
                        
            },error:function(){ 
                alert("error!!!!");
            },
                async:   false
            });
	} );
});



function actualizar(){
    
}