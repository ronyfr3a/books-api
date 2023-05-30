const express = require("express")
const router = express.Router()
const TodaysDeal = require("../controller/todays-deal")

router.get("/all", TodaysDeal.getAll)

module.exports = router
