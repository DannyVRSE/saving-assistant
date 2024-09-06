import { db } from "../Models/db";
import axios from "axios";

const plans = await db.unSynced.toArray();

const syncPlans = async () => {
    for (const plan of plans) {
        try {
            await axios.post("/api/v1/plans/", {
                goals: plan.goals,
                startDate: plan.startDate,
                endDate: plan.endDate,
                targetAmount: plan.targetAmount
            });
            //delete from local
            await db.unSynced.delete(plan.id);
            return(`Success!`);
        } catch (err) {
            console.log(err);
            return(`Error! Details: ${err}`);
        }
    }
}

export default syncPlans;