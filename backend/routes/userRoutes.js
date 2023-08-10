import express from 'express';
import { getAllUsers, login, signup } from '../controllers/userController.js';

 const router = express.Router();

router.get('/', getAllUsers);
router.post('/signup', signup);
router.post('/login', login);

//  EXPORT THE ROUTERS
const userRouter = router;
export default userRouter;  
