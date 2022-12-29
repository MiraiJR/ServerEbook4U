const express =require("express")
const router = express.Router()

const searchController = require("../app/controllers/SearchController.js")

router.get("/", searchController.filter)
router.get("/user", searchController.searchUser)

module.exports = router