const express = require("express")
const router = express.Router()
const Bookfair = require("../controller/bookfair")

router.get("/all", Bookfair.getAll)

module.exports = router
