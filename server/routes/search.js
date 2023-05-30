const express = require("express")
const router = express.Router()
const Search = require("../controller/search")

router.get("/:key", Search.search)
router.get("/:id", Search.getOne)

module.exports = router
