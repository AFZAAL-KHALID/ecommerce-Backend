import express from 'express'
import dotenv from "dotenv";
dotenv.config();

import cors from 'cors' // Importing CORS to allow requests from different origins 
import 'dotenv/config'
import connectDB from './Config/mongodb.js'
import connectCloudinary from './Config/cloudinary.js'
import userRouter from './Routes/userRoute.js'
import productRouter from './Routes/productRoute.js'
import CartRouter from './Routes/CartRout.js'
import OrderRouter from './Routes/OrderRoute.js'

// App config
 const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// ✅ Test route to confirm backend is working
app.post('/ping', (req, res) => {
  console.log('✅ /ping route was hit');
  res.send('pong');
});


//middlewares
app.use(express.json())
app.use(cors()) //cross origion api handler



// api endpoints - after /api/user -> what ever user enter (userRouter) will handle that.
app.use('/api/user', userRouter )
app.use('/api/product', productRouter )
app.use('/api/Cart', CartRouter )
app.use('/api/Order', OrderRouter )




//api end points
app.get('/', (req, res)=>(
    res.send('api working')
))










app.listen(port, ()=> console.log(`server started on port:` + port)
)
