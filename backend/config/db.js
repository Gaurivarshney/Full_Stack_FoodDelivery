import mongoose from "mongoose";

 export const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://gaurivarshney883:12344321@cluster0.lyfsp.mongodb.net/food-del').then(()=>{console.log('DB Connected');
    })
}