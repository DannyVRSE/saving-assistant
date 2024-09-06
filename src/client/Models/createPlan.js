import { db } from "./db";

const createPlan = async (plan) => {
    try {
        await db.unSynced.add({
            goals: plan.goals,
            startDate: plan.startDate,
            endDate: plan.endDate,
            targetAmount: plan.targetAmount
        });
        return(`Success!`);
    }
    catch (err) {
        return(`Error! Details: ${err}`);
    };
}

export default createPlan;
