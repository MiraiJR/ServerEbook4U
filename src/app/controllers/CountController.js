const AmountView = require("../models/AmoutView.js")
const User = require("../models/User.js")
const moment = require("moment")
const {
    getArrayDate
} = require("../../middleware/TimeHelper.js")
const Book = require("../models/Book.js")

class CountryController {
    async increaseView(req, res, next) {
        try {
            const curDate = moment().format("DD-MM-YYYY")

            const isExisted = await AmountView.findOne({
                date: curDate
            })

            if (!isExisted) {
                const newAmountView = new AmountView({
                    date: curDate,
                    view: 1
                })

                await newAmountView.save()
            }

            await AmountView.updateOne({
                date: curDate
            }, {
                $inc: {
                    view: 1
                }
            })

            return res.status(200).json({
                success: true,
                message: "Increasing view successfully!"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async filter(req, res, next) {
        try {
            const {
                type,
                number
            } = req.query

            const arrayDate = getArrayDate(number, type)

            let result = []

            for (let i of arrayDate) {
                const isExisted = await AmountView.findOne({
                    date: i
                })

                if (!isExisted) {
                    const newAmountView = new AmountView({
                        date: i,
                        view: 0
                    })

                    await newAmountView.save()

                    result.push(newAmountView)
                } else {
                    result.push(isExisted)
                }
            }

            return res.status(200).json({
                success: true,
                message: `Get data amount view everyday of ${type} successfully!`,
                data: result
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async summary(req, res, next) {
        try {
            const totalUser = await User.count()
            const totalBook = await Book.count()

            const start = moment().startOf('week').toDate()
            const end = moment().endOf('week').toDate()

            const totalNewUser = await User.find({
                createdAt: {
                    $gte: start,
                    $lt: end
                }
            })

            const totalNewBook = await Book.find({
                createdAt: {
                    $gte: start,
                    $lt: end
                }
            })

            return res.status(200).json({
                success: true,
                message: "Get summary successfully!",
                data: {
                    totalUser,
                    totalBook,
                    totalNewUser: totalNewUser.length,
                    totalNewBook: totalNewBook.length
                }
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