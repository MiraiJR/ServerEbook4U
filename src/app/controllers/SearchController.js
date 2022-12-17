const Book = require("../models/Book.js")
const Category = require("../models/Category.js")
const slugify = require("slugify")

class SearchController {
    async filter(req, res, next) {
        try {
            let {
                q,
                category,
                country
            } = req.query

            let query = [{
                "$lookup": {
                    "from": "countries",
                    "localField": "country",
                    "foreignField": "_id",
                    "as": "country"
                }
            }, {
                "$lookup": {
                    "from": "categories",
                    "localField": "category",
                    "foreignField": "_id",
                    "as": "category"
                }
            }]

            if (q) {
                q = slugify(q, {
                    replacement: "-",
                    lower: true,
                    trim: true
                })

                query.push({
                    $match: {
                        slug: {
                            $regex: q,
                            $options: "i"
                        }
                    }
                })
            }

            if (category) {
                let categories = []
                category = category.split(",")
                category.map(item => {
                    item = slugify(item, {
                        replacement: "-",
                        lower: true,
                        trim: true
                    })
                    categories.push(item)
                })

                query.push({
                    "$match": {
                        "category.slug": {
                            "$in": categories
                        }
                    }
                })
            }

            if (country) {
                country = slugify(country, {
                    replacement: "-",
                    lower: true,
                    trim: true
                })

                query.push({
                    "$match": {
                        "country.slug": {
                            "$in": [`${country}`]
                        }
                    }
                })
            }

            const books = await Book.aggregate(query)

            return res.status(200).json({
                success: true,
                message: "Internal server error!",
                data: books
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

module.exports = new SearchController()