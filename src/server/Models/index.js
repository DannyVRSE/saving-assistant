import { Sequelize, DataTypes } from "sequelize";
import env from "dotenv";
import userModel from "./UserModel.js";
import financialPlanModel from "./FinancialPlanModel.js";

env.config();

//connect
const sequelize = new Sequelize(process.env.DATABASE_URL ,{
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    }}
);
//test
const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to database successful");
    } catch (error) {
        console.log("Error connecting to the database", error);
    }
}

connect();
//db object
const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;
//connect models to db
db.User=userModel(sequelize,DataTypes);
db.FinancialPlan=financialPlanModel(sequelize,DataTypes);
//association
//one to many association berween user and financial plan
db.User.hasMany(db.FinancialPlan, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
    onDelete: 'CASCADE',
});
db.FinancialPlan.belongsTo(db.User);

export default {db, sequelize};