const {Schema , model} = require("mongoose");
const ahora = require('date-time');

const TablePedidos=new Schema({
    _idEmpresa:{type:String,require:true},
    _idNDoc:{type:String,require:true},
    FHPedido:{type:Date, default:ahora() },
    FHEntrega:{type:Date,default:null},
    Latitude:{type:String,require:true},
    Longitude:{type:String,require:true},
    NumHamburguesas:{type:Number,require:true},
    Estado:{type:String,default:'No entregado'}
});

module.exports=model('Pedido',TablePedidos);