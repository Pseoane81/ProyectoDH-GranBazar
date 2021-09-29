const { dir } = require('console');
const express=require('express');
const path=require('path');
const app =express();


app.use(express.static(path.resolve(__dirname,"public")));


app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/home.html"))
});
app.get("/cart",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/cart.html"))
});
app.get("/empty-cart",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/empty-cart.html"))
});

app.get("/login",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/login.html"))
});

app.get("/register",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/register.html"))
});

app.listen(3000,()=>console.log("server corriendo en el puerto 3000"));
