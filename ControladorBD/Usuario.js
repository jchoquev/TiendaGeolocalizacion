require('../conexionBD.js');
const TableUsuario=require("../ModelosMongo/Usuario.js");

const NewUsuario = async (NDoc,Nombres,Ape_Paterno,Ape_Materno,Direccion,N_Celular)=>{
    const Nuevo=new TableUsuario({
        NDoc:NDoc,
        Nombres:Nombres,
        Ape_Paterno:Ape_Paterno,
        Ape_Materno:Ape_Materno,
        Direccion:Direccion,
        N_Celular:N_Celular
    });
    let res =await TableUsuario.findOne({NDoc:NDoc});
    if(!res){
        res=await Nuevo.save();
    }
    return res;
}

const FindUsuario=async (NDoc)=>{
    return 0;
}

module.exports={NewUsuario,FindUsuario};