const express = require( "express" )
const router = express.Router()
const Products = require( "../controller/general" )

router.get( "/all", Products.getAll )

module.exports = router
