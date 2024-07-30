import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';
const cartRouter = express.Router();

//means user can firstly be authorized that's the reason why we experienced that error during adding new product in product
cartRouter.post("/cart/add", authMiddleware ,addToCart);
cartRouter.post("/cart/remove", authMiddleware,removeFromCart);
cartRouter.post("/cart/get", authMiddleware, getCart);

export default cartRouter;
