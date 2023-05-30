const express = require( "express" )
const router = express.Router()
const Academic = require( "../controller/academic" )

router.get( "/all", Academic.getAll )


module.exports = router
