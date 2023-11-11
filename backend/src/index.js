import express from "express";
import config from "./config.js";
import mongoose from "mongoose";

const app = express();


app.get("/",(request,response)=>{
   //console.log(request);
   return response.status(200).send('Welcome to MERN Stack tutorial');
});





mongoose
.connect(config.mongoDBURL)
.then(() => {
    console.log('App connected to database');
    app.listen(config.port,() => {
        console.log(`🚀 ${config.name} ${config.version} 🚀`)
        console.log(`🚀 Listening on ${config.port} with NODE_ENV=${config.nodeEnv} 🚀`)
    });
})
.catch((error) => {
    console.log(error);
});


