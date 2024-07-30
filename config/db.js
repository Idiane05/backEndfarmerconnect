import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://jmuhumuza:IA4xEbzkkb60N2Br@cluster0.0rfj17p.mongodb.net/").then(()=>console.log("Db Connected"))
}


// mongodb://localhost:27017/FarmerConnect