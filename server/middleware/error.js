const ErrorHandler = require( "./errorHandler" );

module.exports = ( err, req, res, next ) => {
  let error = { ...err };
  error.message = err.message;

  //mongodb bad objectId
  if ( err.name === "CastError" ) {
    let message = "Resource not found";
    error = new ErrorHandler( message, 404 );
  }
  //mongodb duplicate field error
  if ( err.code === 11000 ) {
    let message = "duplicate field value entered";
    error = new ErrorHandler( message, 404 );
  }
  //mongodb validation error
  if ( err.name === "ValidationError" ) {
    let message = Object.values( err.errors ).map( ( value ) => value.message );
    error = new ErrorHandler( message, 404 );
  }

  res.status( error.statusCode || 500 ).json( {
    success: false,
    message: error.message || "server error",
  } );
};
