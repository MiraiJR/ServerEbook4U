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

            q = slugify(q, {
                replacement: "-",
                lower: true,
                trim: true
            })

            if (category && country) {
                let categories = []

                country = slugify(country, {
                    replacement: "-",
                    lower: true,
                    trim: true
                })

                category = category.split(",")
                category.map(item => {
                    item = slugify(item, {
                        replacement: "-",
                        lower: true,
                        trim: true
                    })
                    categories.push(item)
                })

                let books = await Book.aggregate([
                    {
                        $match: {
                            slug: {
                                $regex: q,
                                $options: "i"
                            }
                        }
                    }, {
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
                    },
                    {
                        "$match": {
                            "country.slug": {
                                "$in": [`${country}`]
                            }
                        }
                    },
                    {
                        "$match": {
                            "category.slug": {
                                "$in": categories
                            }
                        }
                    },
                ])

                return res.status(200).json({
                    success: true,
                    message: "Search successfully!",
                    data: books
                })
            }

            if (category && !country) {
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

                let books = await Book.aggregate([{
                        $match: {
                            slug: {
                                $regex: q,
                                $options: "i"
                            }
                        }
                    }, {
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
                    },
                    {
                        "$match": {
                            "category.slug": {
                                "$in": categories
                            }
                        }
                    },
                ])

                return res.status(200).json({
                    success: true,
                    message: "Search successfully!",
                    data: books
                })
            }

            if (!category && country) {
                country = slugify(country, {
                    replacement: "-",
                    lower: true,
                    trim: true
                })

                let books = await Book.aggregate([{
                        $match: {
                            slug: {
                                $regex: q,
                                $options: "i"
                            }
                        }
                    }, {
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
                    },
                    {
                        "$match": {
                            "country.slug": {
                                "$in": [`${country}`]
                            }
                        }
                    }
                ])

                return res.status(200).json({
                    success: true,
                    message: "Search successfully!",
                    data: books
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server handle!"
            })
        }
    }

    async searchByNameBook(req, res, next) {
        try {
            let {
                q
            } = req.query

            q = slugify(q, {
                replacement: "-",
                lower: true,
                trim: true
            })

            const books = await Book.aggregate([{
                $match: {
                    slug: {
                        $regex: q,
                        $options: "i"
                    }
                }
            }, {
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
            }])

            return res.status(200).json({
                success: true,
                message: "Search successfully!",
                data: books
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server handle!"
            })
        }
    }
}

module.exports = new SearchController()