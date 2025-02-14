import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

//app config
const app = express()
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//DB Connection
connectDB()

//api endpoints
app.use('/api/food', foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use("/api/order",orderRouter)

app.get('/', (req,res)=>{
    res.send("ApI working")
})

//run the express server
app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`);
})

// mongodb+srv://gaurivarshney883:<db_password>@cluster0.lyfsp.mongodb.net/?
