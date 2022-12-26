const Book = require("../app/models/Book.js")
const slugify = require("slugify")

const getBooks = async () => {
    const books = await Book.aggregate([{
        "$lookup": {
            "from": "categories",
            "localField": "category",
            "foreignField": "_id",
            "as": "category"
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
            "from": "chapters",
            "localField": "_id",
            "foreignField": "book",
            "as": "numberChapter"
        }
    }, {
        "$set": {
            "numberChapter": {
                "$size": "$numberChapter"
            }
        }
    }])

    return books
}

const searchBooks = async (q, category, country) => {
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

    return books
}

const getPer = async (books, per, page) => {
    let result = []

    for (let i = per; i >= 1; i--) {
        if (books[page * per - i]) {
            result.push(books[page * per - i])
        }
    }

    return result
}

module.exports = {
    getBooks,
    searchBooks,
    getPer
}