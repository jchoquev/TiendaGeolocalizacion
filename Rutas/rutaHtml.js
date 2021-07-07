const {Router}=require("express");
const html=Router();

html.get("/tienda",(req,res)=>{
    res.render("Tienda.ejs");
});

html.get("/usuario",(req,res)=>{
    res.render("Usuario.ejs");
});

module.exports=html;