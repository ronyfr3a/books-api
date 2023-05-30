const NodeCache = require( "node-cache" )

const AsyncErrorHandler = require( "../middleware/catchAsyncError" )
const Books = require( "../model/general" )
const Academic = require( "../model/academic" )
const Stationary = require( "../model/stationary" )

const myCache = new NodeCache( {
   stdTTL: 15,
   checkperiod: 15 * 0.2,
   useClones: false,
} )

const Bookfair = {
   getAll: AsyncErrorHandler( async ( req, res, next ) => {
      try {
         if ( myCache.has( "Bookfair" ) ) {
            res.status( 200 ).send( myCache.get( "Bookfair" ) )
         } else {
            let stationaries = await Stationary.find({"bookfair":true})
               .select( {
                  totalWishlist: 0,
                  soldQuantity: 0,
                  updatedAt: 0,
                  newInStock: 0,
                  __v: 0,
                  createdAt: 0,
               } )
               .lean()
            let books = await Books.find({"bookfair":true})
               .select( {
                  totalWishlist: 0,
                  bookSize: 0,
                  soldQuantity: 0,
                  updatedAt: 0,
                  __v: 0,
                  createdAt: 0,
               } )
               .lean()
            let academic = await Academic.find({"bookfair":true})
               .select( {
                  totalWishlist: 0,
                  soldQuantity: 0,
                  updatedAt: 0,
                  bookSize: 0,
                  newInStock: 0,
                  __v: 0,
                  createdAt: 0,
               } )
               .lean()
            let result = [...books, ...stationaries, ...academic]
            myCache.set( "Bookfair", result )
            res.status( 200 ).send( result )
         }
      } catch ( err ) {
         console.log( "Caught error", err )
      }
   } )
}
module.exports = Bookfair
