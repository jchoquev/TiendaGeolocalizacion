$(document).ready(function(){
    let socket=io();
    $( "form#NuevoTienda" ).submit(function( event ) {
        event.preventDefault();
        let data={
            "RUC":$("#RUC").val(),
            "RazonSocial":$("#RazonSocial").val(),
            "Latitude":'-15.832103',
            "Longitude":'-70.023820',
            "CantidaDisponible":Number($("#CantidaDisponible").val()),
            "Estado":true
        }
        //console.log(data);
        let url=$(this).attr("action");
        let method=$(this).attr("method");

        $.ajax({
            url : url,
            method : method, 
            contentType: 'application/json',
            data : JSON.stringify(data), 
            dataType : 'json',
            success : function(response){
                if(response) $( "form#NuevoTienda" ).find("input,button").prop("disabled", true);
                $("#RUC").val(response.RUC);
                $("#RazonSocial").val(response.RazonSocial);
                $("#CantidaDisponible").val(response.CantidaDisponible);
                BuscarPedido(response.RUC);
            },
            error: function(error){
                   console.log(error);
            }
        });
        
    });
    socket.on("NuevPedido",(res)=>{
        if(res.RUC==$("#RUC").val()){
            BuscarPedido(res.RUC);
        }
    });
 }); 


 function BuscarPedido(RUC){
    let url='http://localhost:3000/api/pedido/portienda/'+RUC;
    let method='GET';

    $.ajax({
        url : url,
        method : method, 
        contentType: 'application/json',
        data : JSON.stringify({"_idEmpresa":RUC}), 
        dataType : 'json',
        success : function(response){
            let html='';
            response.forEach((elem,i) => {
                html+=`<tr>
                <th scope="row">${i+1}</th>
                <td>${elem._idNDoc}</td>
                <td>${elem.NumHamburguesas}</td>
                </tr>`;
            });
            $("table.table tbody").html(html);
        },
        error: function(error){
               console.log(error);
        }
    });
 }