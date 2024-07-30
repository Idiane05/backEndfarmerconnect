import mongoose from "mongoose";

 const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://jmuhumuza:50Iyz2y1K8JIziTK@cluster0.1aiv6ye.mongodb.net/').then(()=>console.log("Db Connected"))
}

export default connectDB;


// mongodb://localhost:27017/FarmerConnect