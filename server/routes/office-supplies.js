const express = require( "express" )
const router = express.Router()
const Products = require( "../controller/office-supplies" )


router.get( "/all", Products.getAll )


module.exports = router
