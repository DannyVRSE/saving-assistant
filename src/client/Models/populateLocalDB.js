import { db } from "./db";
import axios from "axios";

const populateLocalDB = async () => {
    let plans = [];

    //fetch plans from api
    const fetchPlans = async () => {
        try {
            const response = await axios.get("/api/v1/plans/");
            plans = response.data.plans;
        } catch (err) {
            console.log(err);
        }
    };

    await fetchPlans();

    //add to indexedDB
    for (const plan of plans) {
        try {
            await db.synced.add({
                id: plan.id,
                goals: plan.goals,
                startDate: plan.startDate,
                endDate: plan.endDate,
                targetAmount: plan.targetAmount
            })
        }
        catch (err) {
            console.log(err);
        };
    }
};

export default populateLocalDB;
