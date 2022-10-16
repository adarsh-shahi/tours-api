import express from "express";
import tourRouter from './routes/tourRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express();

// MIDDLEWARES
app.use(express.json()); // adds body objet to request


app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all('*',(req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`
  })
})
export default app

