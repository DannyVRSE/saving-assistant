import express from "express";
import session from "express-session";
import passport from "passport";
import ViteExpress from "vite-express";
import env from "dotenv";
import db from "./Models/index.js";
import planRoutes from "./v1/Routes/planRoutes.js";
import userRoutes from "./v1/Routes/userRoutes.js";
import passportAuth from "./Config/passport.js";

env.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));//similar to body-parser

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//v1 routes
app.use("/api/v1/plans", planRoutes);
app.use("/api/v1/users", userRoutes);

passportAuth(passport);

//sync db
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Database synced ...");
    })
    .catch((error) => {
        console.log("Error syncing database ...", error);
    });

ViteExpress.listen(app, PORT, () => {
    console.log(`server listening on port ${PORT}`)
});