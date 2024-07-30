import express from "express";
import multer from "multer";
import { listFood, addFood, removeFood, getFoodById } from "../controllers/foodController.js";

const foodRouter = express.Router();

// Image storage engine configuration
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });


foodRouter.post("/food/add", upload.single("image"), addFood);
foodRouter.get("/food/list", listFood);
foodRouter.get("/food/list/:id", getFoodById)

foodRouter.delete("/food/delete/:id", removeFood);

export default foodRouter;
