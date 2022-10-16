class AppError extends Error{
  constructor(statusCode, message){
    super(message)
    this.statusCode = statusCode
    this.status = statusCode >= 500 ? 'error' : 'fail' 
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError