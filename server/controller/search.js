const AsyncErrorHandler = require( "../middleware/catchAsyncError" )
const Books = require( "../model/general" )
const APIfeatures = require( "../utils/query" )

const SearchCtrl = {
   getOne: AsyncErrorHandler( async ( req, res, next ) => {
      let books = await Books.findById( req.params.id ).lean()
      res.status( 200 ).send( books )
   } ),

   search: AsyncErrorHandler( async ( req, res, next ) => {
      let apiFeature = new APIfeatures( Books.find().lean(), req.query )
         .search()
      const products = await apiFeature.query
      res.status( 200 ).send( products )


   } ),
}
module.exports = SearchCtrl
