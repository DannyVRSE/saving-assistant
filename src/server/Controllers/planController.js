import database from '../Models/index.js';
const {db} = database;
const FinancialPlan=db.FinancialPlan;
//create financial plan
const createPlan = async (req, res) => {
    const { goals, startDate, endDate, targetAmount} = req.body;
    const userId = req.user.id;
    const planInfo = {
        goals,
        startDate,
        endDate,
        targetAmount,
        userId
    };
    //🚩 validation needed
    //save plan
    try{
        FinancialPlan.create(planInfo);
        return res.status(201).json({message: 'Plan created successfully'});
    }catch(err){
        return res.status(400).json({error: err.message});
    }
};

const getPlans=async(req,res)=>{
    const userId=req.user.id;
    try{
        const plans=await FinancialPlan.findAll({where:{userId}});
        return res.status(200).json({plans});
    }catch(err){
        return res.status(400).json({error: err.message});
    }
}

export default { createPlan, getPlans };