const jwt = require( "jsonwebtoken" )
const AsyncErrorHandler = require( "../middleware/catchAsyncError" )
const User = require( "../model/user" )

const protect = AsyncErrorHandler( async ( req, res, next ) => {
  try {
    let token = req.header( "Authorization" )
    if ( !token ) return res.status( 401 ).json( { message: "you are not authorized" } )

    let decoded = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET )

    req.user = await User.findById( decoded.id ).select( "-password" )
  
    next()
  } catch ( error ) {
    return res
      .status( 401 )
      .json( { message: "you are not authorized", error: error.message } )
  }
} )

const admin = ( req, res, next ) => {
  if ( req.user && req.user.role === "admin" ) {
    next()
  } else {
    return res.status( 401 ).json( { message: "Not authorized as an admin" } )
  }
}

module.exports = { protect, admin }
