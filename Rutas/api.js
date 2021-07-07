const {Router}=require("express");
const api=Router();

//TRAER Controladores
const {NewPedido,FindTiendaPedido}=require("../ControladorBD/Pedido.js");
const {NewTienda,FindTiendaUsuario}=require("../ControladorBD/Tienda.js");
const {NewUsuario}=require("../ControladorBD/Usuario.js");
const {addChat,FindChatUsuarioTienda}=require("../ControladorBD/Chat.js");
//end
//TIENDA
api.post("/tienda/nuevo",async (req,res)=>{
    try {
        let {RUC,RazonSocial,Latitude,Longitude,CantidaDisponible,Estado}=req.body;
        let q= await NewTienda(
               RUC,
               RazonSocial,
               Latitude,
               Longitude,
               CantidaDisponible,
               Estado
        );
        res.status(200).json(q);
    } catch (err) {
        res.status(500).json({"Estado":'Ocurrio un Error'});
    }
});

api.get("/tienda/BuscDisponible/:Latitude/:Longitud/:NumHamburguesas",async (req,res)=>{
    try {
        const {Latitude,Longitude,NumHamburguesas}=req.params;
        let q=await FindTiendaUsuario(Latitude,Longitude,NumHamburguesas);
        res.status(200).json(q);
    } catch (error) {
        res.status(500).json({"Estado":'Ocurrio un Error'});
    }
});
//PEDIDOS
api.post("/pedido/nuevo",async (req,res)=>{
    try {
        let {_idEmpresa,_idNDoc,NumHamburguesas,Latitude,Longitude}=req.body;
        let q=await NewPedido(
                _idEmpresa,
                _idNDoc,
                NumHamburguesas,
                Latitude,
                Longitude
            );
        res.status(200).json(q);
    } catch (err) {
        res.status(500).json({"Estado":'Ocurrio un Error'});
    }
});
api.get("/pedido/portienda/:_idEmpresa",async (req,res)=>{
    try {
        let {_idEmpresa}=req.params;
        let q=await FindTiendaPedido(_idEmpresa);
        res.status(200).json(q);
    } catch (error) {
        res.status(500).json({"Estado":'Ocurrio un Error'});
    }
});
//USUARIO
api.post("/usuario/nuevo",async (req,res)=>{
    try {
        let {NDoc,Nombres,Ape_Paterno,Ape_Materno,Direccion,N_Celular}=req.body;
        let q= await NewUsuario(
            NDoc,
            Nombres,
            Ape_Paterno,
            Ape_Materno,
            Direccion,
            N_Celular
        );
        res.status(200).json(q);
    } catch (err) {
        res.status(500).json({"Estado":'Ocurrio un Error'});
    }
});
//CHAT
api.post("/Chat",async (req,res)=>{
    try {
        let {_idEmpresa,_idNDoc,Mensaje}=req.body;
        let q=await addChat(
                _idEmpresa,
                _idNDoc,
                Mensaje
            );
        res.status(200).json(q);
    } catch (err) {
        res.status(500).json({"Estado":'Ocurrio un Error'});
    }
});
api.get("/Chat/Buscar",async (req,res)=>{
    try {
        let {_idEmpresa,_idNDoc}=req.body;
        let q=await FindChatUsuarioTienda(_idEmpresa,_idNDoc);
        res.status(200).json(q);
    } catch (error) {
        res.status(500).json({"Estado":'Ocurrio un Error'});
    }
});
module.exports=api;