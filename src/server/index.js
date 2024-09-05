import express from "express";
import ViteExpress from "vite-express";
import env from "dotenv";
import db from "./Models/index.js";
env.config();

const PORT= process.env.PORT || 3000;

const app= express();

//sync db
db.sequelize.sync({force:false})
.then(()=>{
    console.log("Database synced ...");
})
.catch((error)=>{
    console.log("Error syncing database ...", error);
});

ViteExpress.listen(app, PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
});