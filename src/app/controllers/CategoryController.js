const Category = require("../models/Category.js")
const Book = require("../models/Book.js")

class CategoryController {
    async createCategory(req, res, next) {
        const {
            nameCategory
        } = req.body

        try {
            const newCategory = new Category({
                name: nameCategory
            })

            await newCategory.save()

            return res.status(200).json({
                success: true,
                message: "Create category successfully!",
                data: newCategory
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }

    }

    async deleteCategory(req, res, next) {
        const {
            idCategory
        } = req.body

        try {
            await Category.deleteOne({
                _id: idCategory
            })

            return res.status(200).json({
                success: true,
                message: "Delete category successfully!"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async getAllCategory(req, res, next) {
        try {
            const categories = await Category.find()

            return res.status(200).json({
                success: true,
                message: "Get all category successfully!",
                data: categories
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }
}

module.exports = new CategoryController()