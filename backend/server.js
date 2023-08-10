import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";


const app = express();

const PORT = process.env.PORT || 5000

// ACCEPT THE DATA IN JSON
    app.use(express.json());

// CORS USED
    app.use(cors());
    dotenv.config();

// MONGODB CONNECT
    connectDB();

// API ENDPOINT HOME PAGE
    app.get('/', (req, res) => {
        res.send("API IS RUNNING SUCCESSFULLY");
    }); 

// USE ALL ROUTERS
    app.use("/api/user", userRouter);
    app.use("/api/blog", blogRouter);

// APP LISTEN THE WITH PORT NUMBER
app.listen(PORT, (req, res) => {
    console.log(`SERVER STARTED: ${PORT}`.yellow.bold);
});