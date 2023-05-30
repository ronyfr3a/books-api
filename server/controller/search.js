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
      let academic = await Academic.findById( req.params.id ).lean()
      let office_supplies = await OfficeSupplies.findById( req.params.id ).lean()
      let stationaries = await Stationary.findById( req.params.id ).lean()

      res.status( 200 ).send( {
         books,
         academic,
         office_supplies,
         stationaries
      } )
   } ),
   search: AsyncErrorHandler( async ( req, res, next ) => {
      try {
         if ( myCache.has( "searchproducts" ) ) {
            res.status( 200 ).send( myCache.get( "searchproducts" ) )
         } else {
            let stationaries = await Stationary.find( {
               "$or": [
                  { title: { $regex: req.params.key, $options: "i" } },
               ]
            } )
               .select( {
                  title: 1,
               } )
               .lean()
            let office_supplies = await OfficeSupplies.find( {
               "$or": [
                  { title: { $regex: req.params.key, $options: "i" } },
               ]
            } )
               .select( {
                  title: 1,
               } )
               .lean()
            let books = await Books.find( {
               "$or": [
                  { title: { $regex: req.params.key, $options: "i" } },
               ]
            } )
               .select( {
                  title: 1,
               } )
               .lean()
            let academic = await Academic.find( {
               "$or": [
                  { title: { $regex: req.params.key, $options: "i" } },
               ]
            } )
               .select( {
                  title: 1,
               } )
               .lean()
            let result = [...books,
            ...academic,
            ...stationaries, ...office_supplies]
            myCache.set( "searchproducts", result )
            res.status( 200 ).send( result )
         }
      } catch ( err ) {
         console.log( "Caught error", err )
      }
   } ),
}
module.exports = SearchCtrl
