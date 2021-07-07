require('../conexionBD.js');
const TableChat=require("../ModelosMongo/Chat.js");

const addChat = async (_idEmpresa,_idNDoc,Mensaje)=>{
    const Nuevo=new TableChat({
        _idEmpresa:_idEmpresa,
        _idNDoc:_idNDoc,
        Mensaje:Mensaje
    });
    res=await Nuevo.save();
    return res;
}

const FindChatUsuarioTienda=async (_idEmpresa,_idNDoc)=>{
    let res=await TableChat.find({"$and":[{_idEmpresa:_idEmpresa},{_idNDoc:_idNDoc}]});
    return res;
}


module.exports={addChat,FindChatUsuarioTienda};