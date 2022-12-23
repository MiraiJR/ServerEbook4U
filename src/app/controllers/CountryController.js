const Category = require("../models/Category.js")
const Book = require("../models/Book.js")
const Country = require("../models/Country.js")
const fs = require("fs")

class CountryController {
    async createCountry(req, res, next) {
        const {
            nameCountry
        } = req.body

        try {
            const newCountry = new Country({
                name: nameCountry
            })

            await newCountry.save()

            return res.status(200).json({
                success: true,
                message: "Create new country successfully!",
                data: newCountry
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }

    }

    // async createCountry(req, res, next) {
    //     try {
    //         await fs.readFile("test.json", "utf8", async (err, data) => {
    //             const obj = JSON.parse(data);
    //             for (let country of obj) {
    //                 const newCountry = new Country({
    //                     name: country.name.common
    //                 })

    //                 await newCountry.save()
    //             }
    //         })

    //         return res.status(200).json({
    //             success: true,
    //             message: "create country successfully!"
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({
    //             success: false,
    //             message: "Internal server error!"
    //         })
    //     }
    // }

    async deleteCountry(req, res, next) {
        const idCountry = req.params.id

        try {
            await Country.deleteOne({
                _id: idCountry
            })

            return res.status(200).json({
                success: true,
                message: "Delete country successfully!"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async getAllCountry(req, res, next) {
        try {
            const countries = await Country.find()

            return res.status(200).json({
                success: true,
                message: "Get all country successfully!",
                data: countries
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

module.exports = new CountryController()