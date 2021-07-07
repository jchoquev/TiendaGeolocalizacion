require('../conexionBD.js');
const TablePedido=require("../ModelosMongo/Pedido.js");
const TableTienda=require("../ModelosMongo/Tienda.js");

const NewPedido = async (_idEmpresa,_idNDoc,NumHamburguesas,Latitude,Longitude)=>{
    const Nuevo=new TablePedido({
        _idEmpresa:_idEmpresa,
        _idNDoc:_idNDoc,
        NumHamburguesas:NumHamburguesas,
        Latitude:Latitude,
        Longitude:Longitude
    });
    let res=await TableTienda.findOne({RUC:_idEmpresa});
    let cnt=res.CantidaDisponible-NumHamburguesas;
    if(cnt>0){
        res=await TableTienda.updateOne({RUC:res.RUC},{CantidaDisponible:cnt,Estado:true});
    }else{
        res=await TableTienda.updateOne({RUC:res.RUC},{CantidaDisponible:cnt,Estado:false});
    }
    res=await Nuevo.save();
    return res;
}

const FindTiendaPedido=async (_idEmpresa)=>{
    let res=await TablePedido.find({"$and":[{_idEmpresa:_idEmpresa},{Estado:'No entregado'},{FHEntrega:null}]});
    return res;
}


module.exports={NewPedido,FindTiendaPedido};