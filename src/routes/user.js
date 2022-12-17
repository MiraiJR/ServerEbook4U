const express = require("express")
const router = express.Router()

const userController = require("../app/controllers/UserController.js")
const favoriteController = require("../app/controllers/FavoriteController.js")

const { verifyToken } = require("../middleware/Auth.js")

// interact with profile
router.get("/me", verifyToken, userController.getProfile)
router.put("/me", verifyToken, userController.editProfile)

// interact with favoritebook
router.get("/me/favorite-book", verifyToken, favoriteController.getFavoriteList)
router.post("/me/favorite-book", verifyToken, favoriteController.addBookToFavoriteList)
router.delete("/me/favorite-book", verifyToken, favoriteController.removeBookFromFavoriteList)

module.exports = router