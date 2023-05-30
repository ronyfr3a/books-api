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

const SearchCtrl = {
   getOne: AsyncErrorHandler( async ( req, res, next ) => {
      let books = await Books.findById( req.params.id ).lean()

      res.status( 200 ).send( books )
   } ),

   search: AsyncErrorHandler( async ( req, res, next ) => {
      try {
         if ( myCache.has( "books" ) ) {
            res.status( 200 ).send( myCache.get( "books" ) )
         } else {

            let books = await Books.find(
               { title: req.params.key }
            )
               .select( {
                  title: 1,
               } )
               .lean()
            myCache.set( "books", books )
            res.status( 200 ).send( books )
         }
      } catch ( err ) {
         console.log( "Caught error", err )
      }
   } ),
}
module.exports = SearchCtrl
