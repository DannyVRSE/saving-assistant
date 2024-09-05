import express from 'express';
import planController from "../../Controllers/planController.js";
const {createPlan, getPlans} = planController;
const router = express.Router();

router.post('/', createPlan);
router.get('/', getPlans);

export default router;