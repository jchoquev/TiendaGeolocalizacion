const morgan=require("morgan");
const express = require('express');
const engine=require("ejs-mate");
const path=require("path");
const app=express();

app.engine("ejs",engine);
app.set("view engine",'ejs');
app.set("views",path.join(__dirname,'Vistas'));

app.set("port",process.env.PORT || 3000);
app.set("json spaces",2);

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'Publico')));

app.use(require("./Rutas/rutaHtml.js"));
app.use('/api',require("./Rutas/api.js"));

const servidor=app.listen(app.get("port"),()=>{
    console.log("Se ha conectado al puerto ",app.get("port"));
});

const socketio=require("socket.io");
const io=socketio.listen(servidor);

io.on('connection',(data)=>{
    data.on('NuevPedido',(str)=>{
        data.broadcast.emit('NuevPedido',str);
    });
});