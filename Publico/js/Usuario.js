const mapa= L.map('Mapa').setView([-15.84, -70.02], 13);
L.tileLayer('http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(mapa);

$(document).ready(function(){
    let socket=io();
    $( "form#NuevoUsuario" ).submit(function( event ) {
        event.preventDefault();
        let data={
            "NDoc":$("#NDoc").val(),
            "Nombres":$("#Nombres").val(),
            "Ape_Paterno":$("#Ape_Paterno").val(),
            "Ape_Materno":$("#Ape_Materno").val(),
            "Direccion":$("#Direccion").val(),
            "N_Celular":$("#N_Celular").val()
        }
        let url=$(this).attr("action");
        let method=$(this).attr("method");

        $.ajax({
            url : url,
            method : method, 
            contentType: 'application/json',
            data : JSON.stringify(data), 
            dataType : 'json',
            success : function(response){
                $("#NDoc").val(response.NDoc);
                $("#Nombres").val(response.Nombres);
                $("#Ape_Paterno").val(response.Ape_Paterno);
                $("#Ape_Materno").val(response.Ape_Materno);
                $("#Ape_Materno").val(response.Ape_Materno);
                $("#N_Celular").val(response.N_Celular);
                if(response) $( "form#NuevoUsuario" ).find("input,button").prop("disabled", true);
            },
            error: function(error){
                   console.log(error);
            }
        });
        
    });
    $("input#NumHamburguesas").keyup(function() {
        let valor=$(this).val()
        mapa.locate({enableHighAccuracy:true});
        mapa.on('locationfound',async e=>{
            await BuscarTiendaUsuario(e.latitude,e.longitude,valor);
        });

    });
    $("form#NuevoPedido").submit(function( event ) {
        event.preventDefault();
        let data={
            _idEmpresa:$("#_idEmpresa").val(),
            _idNDoc:$("#NDoc").val(),
            NumHamburguesas:Number($("#NumHamburguesas").val()),
            latitude:JSON.parse($("form#NuevoPedido").attr("name")).latitude+'',
            longitude:JSON.parse($("form#NuevoPedido").attr("name")).longitude+''
        }
        let url=$(this).attr("action")+'api/pedido/nuevo';
        let method=$(this).attr("method");

        $.ajax({
            url : url,
            method : method, 
            contentType: 'application/json',
            data : JSON.stringify(data), 
            dataType : 'json',
            success : function(response){
                console.log(response);
                socket.emit('NuevPedido',{
                    RUC:data._idEmpresa
                });
                if(response) $( "form#NuevoPedido" ).find("input,button").prop("disabled", true);
            },
            error: function(error){
                   console.log(error);
            }
        });
    });
 }); 

 function BuscarTiendaUsuario(latitude,longitude,Nham){
    let url=$("form#NuevoPedido").attr("action")+`api/tienda/BuscDisponible/${latitude}/${longitude}/${Nham}`;
    let method='GET';
    let data={latitude:latitude,longitude:longitude,NumHamburguesas:Nham};
    $("form#NuevoPedido").attr("name",JSON.stringify({latitude:latitude,longitude:longitude}));
    L.marker([latitude,longitude]).addTo(mapa).bindPopup('Estoy aqui!..').openPopup();
    $.ajax({
        url : url,
        method : method, 
        contentType: 'application/json',
        data : JSON.stringify(data), 
        dataType : 'json',
        success : function(response){
            let html='';
            response.forEach(elem => {
                L.marker([elem.Latitude,elem.Longitude]).addTo(mapa).bindPopup(elem.RazonSocial);
                html+=`<option value="${elem.RUC}">${elem.RazonSocial}}</option>`;
            });
            $("select#_idEmpresa").html(html);
        },
        error: function(error){
               console.log(error);
        }
    });
 }