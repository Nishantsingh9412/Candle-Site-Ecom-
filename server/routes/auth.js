import express from 'express';
import {
    SignupController,
    loginController
} from '../controller/authController.js';

const router = express.Router();

router.post('/signup', SignupController)
router.post('/login', loginController)



export default router;  