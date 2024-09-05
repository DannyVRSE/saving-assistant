import express from 'express';
import userController from '../../Controllers/userController.js';
import authenticate from '../../Middleware/passport.js';
const router = express.Router();

const { signUp, getAuth } = userController;

router.post('/signup', signUp);
router.post("/login", authenticate);
router.get("/auth", getAuth);

export default router;