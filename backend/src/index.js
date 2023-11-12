import express from "express";
import config from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";

const app = express();

// Apply most middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (request, response) => {
    //console.log(request);
    return response.status(200).send('Server Running');
});

app.use('/books', bookRoute);

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


