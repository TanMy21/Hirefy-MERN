module.exports  = function errorHandlerMiddleware(err,req,res,next) {
    console.log(err);
    res.status(500).json({msg: 'there was an error'})
}

