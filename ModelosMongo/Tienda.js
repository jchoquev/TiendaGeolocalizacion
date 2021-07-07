const ahora = require('date-time');
const {Schema , model} = require("mongoose");

const TableEmpresa=new Schema({
    RUC:{type:String,unique:true,require:true},
    RazonSocial:{type:String, require:true},
    Latitude:{type:String,require:true},
    Longitude:{type:String,require:true},
    CantidaDisponible:Number,
    FHModificacion:{type:Date,default:ahora()},
    Estado:Boolean //true:Activo false:Inactivo
});

module.exports=model('Empresa',TableEmpresa);