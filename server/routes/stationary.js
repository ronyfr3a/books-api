const express = require( "express" )
const router = express.Router()
const Products = require( "../controller/stationary" )

router.get( "/all", Products.getAll )


module.exports = router
