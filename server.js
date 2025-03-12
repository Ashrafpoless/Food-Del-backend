import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Database
import { connectDB } from './config/db.js';

// import routes
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRoute.js';

// app config, initialize express
const app = express();

//config file
dotenv.config();

// set port
const PORT = process.env.PORT || 5000;

// middleware,, parse body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL];

app.use(
    cors({
        // Allow this specific origin
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.error("Blocked by CORS: ", origin);
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
        credentials: true // Enable sending cookies with requests
    })
);

// dc connection
connectDB();

//  api endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// handle 404
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page is not found' });
});

// listen
app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
});
