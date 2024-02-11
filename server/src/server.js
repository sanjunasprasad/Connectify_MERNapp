import express from 'express';
import connectDB from './config/mongo.js';
import cors from 'cors'
import userRoute from './interfaces/routes/userRoutes.js';
import adminRoute from './interfaces/routes/adminRoutes.js';
import {configDotenv} from "dotenv"




const PORT = 8000;
const app = express();
app.use(cors());
configDotenv()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use('/public/images',express.static('public/images'));


const allowedOrigins = ['http://localhost:3000'];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

connectDB();
app.use('/', userRoute);
app.use('/admin', adminRoute);



app.listen(PORT, () => {
    console.log(`server started at PORT ${PORT}`)
});

