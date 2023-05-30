const NodeCache = require( "node-cache" )

const AsyncErrorHandler = require( "../middleware/catchAsyncError" )
const APIfeatures = require( "../utils/query" )
const Stationary = require( "../model/stationary" )


const myCache = new NodeCache( {
   stdTTL: 15,
   checkperiod: 15 * 0.2,
   useClones: false,
} )

const Products = {
   getAll: AsyncErrorHandler( async ( req, res, next ) => {
      let apiFeature = new APIfeatures( Stationary.find().lean(), req.query )
         .search()
         .sorting()
         .filtering()
      const products = await apiFeature.query
      const uniquePublisher = await Stationary.distinct( "publisher" )
      const uniqueAuthor = await Stationary.distinct( "author.name" )

      if ( products.length === 0 ) {
         res.status( 200 ).json( { products: [], msg: "Empty Items list" } )
      } else {
         if ( myCache.has( "StationaryCtrl" ) ) {
            res.status( 200 ).send( myCache.get( "StationaryCtrl" ) )
         } else {
            myCache.set( "StationaryCtrl", {
                uniquePublisher, uniqueAuthor, products
            } )
            res.status( 200 ).send( { uniquePublisher, uniqueAuthor, products } )
         }
      }
   } ),
}
module.exports = Products