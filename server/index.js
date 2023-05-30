process.on( "uncaughtException", ( err ) => {
   console.log(
      `server error: ${err.message} ${err.stack}`
   )
} )

require( "dotenv" ).config()
const express = require( "express" )
const path = require( "path" )
const cors = require( "cors" )
const cookieParser = require( "cookie-parser" )
const compression = require( "compression" )

const app = express()
const connect = require( "./config/db" )
connect()

app.use( express.json() )
app.use( cookieParser() )
app.use( cors() );

const shouldCompress = ( req, res ) => {
   if ( req.headers["x-no-compression"] ) {
      return false
   }
   return compression.filter( req, res )
}
app.use(
   compression( {
      filter: shouldCompress,
      level: 6,
   } )
)

app.use( "/api/search", require( "./routes/search" ) )
app.use( "/api/todays-deal", require( "./routes/todays-deal" ) )
app.use( "/api/trending", require( "./routes/trending" ) )
app.use( "/api/bookfair", require( "./routes/bookfair" ) )

app.use( "/api/general", require( "./routes/general" ) )
app.use( "/api/academic", require( "./routes/academic" ) )
app.use( "/api/office-supplies", require( "./routes/office-supplies" ) )
app.use( "/api/stationary", require( "./routes/stationary" ) )

app.use( "/api/whocreated", ( req, res ) =>
   res.send( "Created by Abdur Rakib Rony" )
)
app.use( require( "./middleware/error" ) )

const dir = path.resolve()
if ( process.env.NODE_ENV === "production" ) {
   app.use( express.static( path.join( dir, "/server/build" ) ) )
   app.get( "*", ( req, res ) => {
      res.sendFile( path.resolve( dir, "server", "build", "index.html" ) )
   } )
} else {
   app.get( "/", ( req, res ) => {
      res.status( 200 ).send( `server is running` )
   } )
}

const PORT = process.env.PORT || 8080
const server = app.listen( PORT, () =>
   console.log( `backend connection port: ${PORT}` )
)

process.on( "unhandledRejection", ( err ) => {
   console.log(
      "server error: ",
      err.message
   )
   server.close( () => {
      process.exit( 1 )
   } )
} )
