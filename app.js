import express from "express";
import tourRouter from './routes/tourRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express();

// MIDDLEWARES
app.use(express.json()); // adds body objet to request



app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);


export default app

