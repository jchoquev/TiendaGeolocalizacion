const ahora = require('date-time');
const {Schema , model} = require("mongoose");

const TableUsuarios=new Schema({
    NDoc:{type:String,unique:true,require:true},
    Nombres:{type:String, require:true},
    Ape_Paterno:{type:String,require:true},
    Ape_Materno:{type:String,require:true},
    Direccion:{type:String,require:true},
    N_Celular:{type:String,require:true},
    FHRegistro:{type:Date,default:ahora()}
});

module.exports=model('Usuario',TableUsuarios);


//sockes mejorarbuscar por ID , y enviar peticiones a todo el servidor y enviar cruds