import { register, login, updateUser } from '../controllers/authController.js';
import express from 'express';
//import auth from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/update').patch(updateUser);

export default router;
