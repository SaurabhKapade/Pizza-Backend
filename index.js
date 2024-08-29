const express = require('express');
const cookierparser = require('cookie-parser')


const connectDB=require('./src/config/dbconfig')
const serverConfig = require('./src/config/serverConfig')
const userRouter = require('./src/routes/userRoute');
const authRouter = require('./src/routes/authRoute');
const {isLoggedIn} = require('./src/validation/authValidator');
const { uploader } = require('./src/middlewares/multerMiddleware');
const { cloudinary } = require('./src/config/cloudinaryConfig');
const fs = require('fs/promises');
const { productRouter } = require('./src/routes/productRoute');
const cartRouter = require('./src/routes/cartRoute');
const { orderRouter } = require('./src/routes/orderRoute');
const cors = require('cors')

const app = express();

app.use(cookierparser())
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))


app.use('/users',userRouter);
app.use('/auth',authRouter);
app.use('/product',productRouter);
app.use('/carts',cartRouter)
app.use('/orders',orderRouter)

app.listen(serverConfig.PORT,async()=>{
    await connectDB();
    console.log(`server got started at port : ${serverConfig.PORT}`)
})

app.get('*',(req,res)=>{res.status(200) , res.json({massage :`server started at ${process.env.PORT}`})})

app.get('/ping',isLoggedIn, (req, res) => {
    return res.json({message: "pong"});
});

app.post('/photo',uploader.single('incommingFile'),async (req,res)=>{
    const result = await cloudinary.uploader.upload(req.file.path)
    console.log(result)
    fs.unlink(req.file.path)
    return res.json({
        message:'ok',
    })
})


