const NodeCache = require( "node-cache" )

const AsyncErrorHandler = require( "../middleware/catchAsyncError" )
const Books = require( "../model/general" )
const Academic = require( "../model/academic" )
const Stationary = require( "../model/stationary" )
const OfficeSupplies = require( "../model/office-supplies" )

const myCache = new NodeCache( {
   stdTTL: 15,
   checkperiod: 15 * 0.2,
   useClones: false,
} )

const Trending = {
   getAll: AsyncErrorHandler( async ( req, res, next ) => {
      try {
         if ( myCache.has( "Trending" ) ) {
            res.status( 200 ).send( myCache.get( "Trending" ) )
         } else {
            let stationaries = await Stationary.find({"trending":true})
               .select( {
                  totalWishlist: 0,
                  soldQuantity: 0,
                  updatedAt: 0,
                  newInStock: 0,
                  __v: 0,
                  createdAt: 0,
               } )
               .lean()
            let office_upplies = await OfficeSupplies.find({"trending":true})
               .select( {
                  totalWishlist: 0,
                  soldQuantity: 0,
                  updatedAt: 0,
                  newInStock: 0,
                  __v: 0,
                  createdAt: 0,
               } )
               .lean()
            let books = await Books.find({"trending":true})
               .select( {
                  totalWishlist: 0,
                  bookSize: 0,
                  soldQuantity: 0,
                  updatedAt: 0,
                  __v: 0,
                  createdAt: 0,
               } )
               .lean()
            let academic = await Academic.find({"trending":true})
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
            let result = [...books, ...stationaries,...office_upplies, ...academic]
            myCache.set( "Trending", result )
            res.status( 200 ).send( result )
         }
      } catch ( err ) {
         console.log( "Caught error", err )
      }
   } )
}
module.exports = Trending
