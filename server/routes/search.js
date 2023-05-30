const express = require("express")
const router = express.Router()
const Search = require("../controller/search")

router.get("/", Search.search)
router.get("/one/:id", Search.getOne)

module.exports = router
