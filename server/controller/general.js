const NodeCache = require( "node-cache" )

const AsyncErrorHandler = require( "../middleware/catchAsyncError" )
const APIfeatures = require( "../utils/query" )
const General = require( "../model/general" )


const myCache = new NodeCache( {
   stdTTL: 15,
   checkperiod: 15 * 0.2,
   useClones: false,
} )

const Products = {
   getAll: AsyncErrorHandler( async ( req, res, next ) => {
      let apiFeature = new APIfeatures( General.find().lean(), req.query )
         .search()
         .sorting()
         .filtering()
         .pagination(100)
      const products = await apiFeature.query
      const uniquePublisher = await General.distinct( "publisher" )
      const uniqueAuthor = await General.distinct( "author.name" )

      if ( products.length === 0 ) {
         res.status( 200 ).json( { products: [], msg: "Empty Items list" } )
      } else {
         if ( myCache.has( "GeneralCtrl" ) ) {
            res.status( 200 ).send( myCache.get( "GeneralCtrl" ) )
         } else {
            myCache.set( "GeneralCtrl", {
                uniquePublisher, uniqueAuthor, products
            } )
            res.status( 200 ).send( { uniquePublisher, uniqueAuthor, products } )
         }
      }
   } ),
}
module.exports = Products