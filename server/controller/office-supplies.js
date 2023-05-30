const NodeCache = require( "node-cache" )

const AsyncErrorHandler = require( "../middleware/catchAsyncError" )
const APIfeatures = require( "../utils/query" )
const Office = require( "../model/office-supplies" )


const myCache = new NodeCache( {
   stdTTL: 15,
   checkperiod: 15 * 0.2,
   useClones: false,
} )

const Products = {
   getAll: AsyncErrorHandler( async ( req, res, next ) => {
      let apiFeature = new APIfeatures( Office.find().lean(), req.query )
         .search()
         .sorting()
         .filtering()
         .pagination(100)
      const products = await apiFeature.query
      const uniquePublisher = await Office.distinct( "publisher" )
      const uniqueAuthor = await Office.distinct( "author.name" )

      if ( products.length === 0 ) {
         res.status( 200 ).json( { products: [], msg: "Empty Items list" } )
      } else {
         if ( myCache.has( "OfficeCtrl" ) ) {
            res.status( 200 ).send( myCache.get( "OfficeCtrl" ) )
         } else {
            myCache.set( "OfficeCtrl", {
                uniquePublisher, uniqueAuthor, products
            } )
            res.status( 200 ).send( { uniquePublisher, uniqueAuthor, products } )
         }
      }
   } ),
}
module.exports = Products