require('../conexionBD.js');
const TableTienda=require("../ModelosMongo/Tienda.js");
const OrdenarArray = require('array-sort');

const NewTienda = async (RUC,RazonSocial,Latitude,Longitude,CantidaDisponible,Estado)=>{
    const Nuevo=new TableTienda({
        RUC:RUC,
        RazonSocial:RazonSocial,
        Latitude:Latitude,
        Longitude:Longitude,
        CantidaDisponible:CantidaDisponible,
        Estado:Estado
    });
    let res=TableTienda.findOne({RUC:RUC});
    if(!res){
        res=await Nuevo.save();
    }
    return res;
}
//TRUE : ACTIVOS -> FALSE:INCATIVOS
const FindTiendaUsuario=async (Latitude,Longitude,NumHamburguesas)=>{
    const Find=await TableTienda.find({"$and":[{"Estado":true},{'CantidaDisponible':{"$gte":NumHamburguesas}}]});
    let Lista=[];
    await Find.forEach((arr,i)=>{
        let distancia=Math.sqrt(Math.pow(arr.Latitude-Latitude,2)+Math.pow(arr.Longitude-Longitude,2));
        Lista.push({RUC:arr.RUC,RazonSocial:arr.RazonSocial,Latitude:arr.Latitude,Longitude:arr.Longitude,Distancia:distancia,});
    });
    //if(Lista.length>3){
        //return OrdenarArray(Lista,'Distancia')
    //}else{
        return OrdenarArray(Lista,'Distancia').slice(0,3);
    //}
}

module.exports={NewTienda,FindTiendaUsuario};