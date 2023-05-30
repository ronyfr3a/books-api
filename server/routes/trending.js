const express = require("express")
const router = express.Router()
const Trending = require("../controller/trending")

router.get("/all", Trending.getAll)

module.exports = router
