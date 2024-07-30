import express from 'express';
import  {register, login, deleteUser, getAllUsers} from '../controllers/userController.js'; // Ensure you import 'login' when implemented
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.get('/getAllUsers', getAllUsers);
userRouter.delete('/deleteUser/:id', deleteUser);



export default userRouter;
