const {Schema , model} = require("mongoose");
const ahora = require('date-time');

const TablaChat=new Schema({
    _idEmpresa:{type:String,require:true},
    _idNDoc:{type:String,require:true},
    Mensaje:{type:String,default:null},
    FHRegistro:{type:Date, default:ahora() }
});

module.exports=model('Chat',TablaChat);