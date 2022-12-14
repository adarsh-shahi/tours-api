import express from "express";
import tourRouter from './routes/tourRoutes.js'
import userRouter from './routes/userRoutes.js'
import AppError from "./utils/appError.js";
import { errorHandler } from "./controllers/errorController.js";


const app = express();

// MIDDLEWARES
app.use(express.json()); // adds body objet to request

app.use((req, res, next) => {

  next()
})

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all('*',(req, res, next) => {

  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`
  // })

  // const err = new Error(`Can't find ${req.originalUrl} on this server`)
  // err.status = 'fail'
  // err.statusCode = 404

  const error = new AppError(404, `Can't find ${req.originalUrl} on this server`)
  next(error);  // if next receives an argument no matter what it is, automatically knows it was an error
              // will also skip all other middlewares in the stack and go to global error handling middleware
})


app.use(errorHandler)

export default app

