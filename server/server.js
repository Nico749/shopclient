const express = require ('express')
const app = express()
const mongoose = require ('mongoose')
const dotenv = require('dotenv')
const userRoute = require ('./routes/user')
const authRoute = require ('./routes/auth')
const productRoute = require ('./routes/product')
const orderRoute = require ('./routes/order')
const cartRoute = require ('./routes/cart')

const cors = require ('cors')

dotenv.config({ path: '.dotenv' })

mongoose
.connect(
process.env.MONGODB_URI || 'mongodb://localhost:3000/nicoshop',
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{console.log("Db connection successfull")})
.catch((err)=>{console.log(err)})
//prevent errors with CORS
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  }))
app.use(express.json())
app.use('/api/users',userRoute)
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('/api/carts', cartRoute)


app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server running `)
})