import database from '../Models/index.js';
import Joi from 'joi';
const { db } = database;
const FinancialPlan = db.FinancialPlan;
//create financial plan
const createPlan = async (req, res) => {
    const { goals, startDate, endDate, targetAmount } = req.body;
    const userId = req.user.id;
    const planInfo = {
        goals,
        startDate,
        endDate,
        targetAmount,
        userId
    };

    console.log(planInfo, "planInfo");

    //validation
    const schema = Joi.object({
        goals: Joi.array().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        targetAmount: Joi.number().required(),
        userId: Joi.number().required()
    });
    
    try {
        await schema.validateAsync(planInfo);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
    //save plan
    try {
        FinancialPlan.create(planInfo);
        return res.status(201).json({ message: 'Plan created successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getPlans = async (req, res) => {
    if(!req.isAuthenticated()){
        res.status(401).send({message:"Not authorized"});
        return
    }
    const userId = req.user.id;
    try {
        const plans = await FinancialPlan.findAll({ where: { userId } });
        return res.status(200).json({ plans });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export default { createPlan, getPlans };