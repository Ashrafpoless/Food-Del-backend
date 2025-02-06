import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// import routes
import foodRouter from "./routes/foodRoute.js";


// app config, initialize express
const app = express();


// set port
dotenv.config()
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,  // Allow this specific origin
    methods: 'GET,POST,PUT,DELETE',   // Specify allowed HTTP methods
    credentials: true                // Enable sending cookies with requests
}))

// dc connection
connectDB();

//  use routes
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))

app.get("/", (req, res) => {
    res.send("Hello from the backend!");
})



// listen
app.listen(PORT, () =>{
    console.log(`Server is up and running on http://localhost:${PORT}`);  
})

