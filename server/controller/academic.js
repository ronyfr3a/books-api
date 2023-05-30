const _ = require( "lodash" )
const NodeCache = require( "node-cache" )

const AsyncErrorHandler = require( "../middleware/catchAsyncError" )
const APIfeatures = require( "../utils/query" )
const Academic = require( "../model/academic" )


const myCache = new NodeCache( {
   stdTTL: 15,
   checkperiod: 15 * 0.2,
   useClones: false,
} )

const Products = {
   getAll: AsyncErrorHandler( async ( req, res, next ) => {
      let apiFeature = new APIfeatures( Academic.find().lean(), req.query )
         .search()
         .sorting()
         .filtering()
         .paginating(100)
      const products = await apiFeature.query
      const uniquePublisher = await Academic.distinct( "publisher" )
      const uniqueAuthor = await Academic.distinct( "author.name" )

      if ( products.length === 0 ) {
         res.status( 200 ).json( { products: [], msg: "Empty Items list" } )
      } else {
         if ( myCache.has( "academicCtrl" ) ) {
            res.status( 200 ).send( myCache.get( "academicCtrl" ) )
         } else {
            myCache.set( "academicCtrl", {
                uniquePublisher, uniqueAuthor, products
            } )
            res.status( 200 ).send( { uniquePublisher, uniqueAuthor, products } )
         }
      }
   } ),
}
module.exports = Products