import express from 'express';
import cors from 'cors';
import { connectDB } from '../backend/config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import contactRouter from './routes/ContactRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World");
});

// Connect DB
connectDB();

// API endpoint
app.use("/", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/", userRouter);
app.use("/", cartRouter);
app.use("/", contactRouter);
app.use("/", orderRouter)








app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
