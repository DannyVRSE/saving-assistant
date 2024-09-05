import express from "express";
import ViteExpress from "vite-express";
import env from "dotenv";
env.config();

const PORT= process.env.PORT || 3000;

const app= express();

ViteExpress.listen(app, PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
})