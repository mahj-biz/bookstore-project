import app from "./app.js";
import config from "./config.js";
import mongoose from "mongoose";


mongoose
    .connect(config.mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(config.port, () => {
            console.log(`🚀 ${config.name} ${config.version} 🚀`)
            console.log(`🚀 Listening on ${config.port} with NODE_ENV=${config.nodeEnv} 🚀`)
        });
    })
    .catch((error) => {
        console.log(error);
    });


