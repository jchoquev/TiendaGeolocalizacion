const mongoose=require("mongoose");
const url='mongodb://127.0.0.1:27017/Cangreburguer';

const BD=mongoose.connection;

    mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false
    }).catch(err=>console.log("Ocurrio un Error ConexionBD.js"));

    BD.once('open',()=>{
        console.log("LA CONEXION HA SIDO EXITOSA...");
    });

    BD.on('error',(err)=>{
        console.log(err);
    });