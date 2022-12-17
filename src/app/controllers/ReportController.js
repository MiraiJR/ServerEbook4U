const Report = require("../models/Report.js")

class ReportController {
    async getAllReport(req, res, next) {
        try {
            let reports = []

            const reportBooks = await Report.aggregate([{
                    $match: {
                        type: "book"
                    }
                }, {
                    "$lookup": {
                        "from": "users",
                        "localField": "reporter",
                        "foreignField": "_id",
                        "as": "reporter"
                    }
                },
                {
                    "$lookup": {
                        "from": "books",
                        "localField": "object",
                        "foreignField": "_id",
                        "as": "object"
                    }
                }
            ])

            const reportUsers = await Report.aggregate([{
                    $match: {
                        type: "user"
                    }
                }, {
                    "$lookup": {
                        "from": "users",
                        "localField": "reporter",
                        "foreignField": "_id",
                        "as": "reporter"
                    }
                },
                {
                    "$lookup": {
                        "from": "books",
                        "localField": "object",
                        "foreignField": "_id",
                        "as": "object"
                    }
                }
            ])

            const reportComments = await Report.aggregate([{
                    $match: {
                        type: "comment"
                    }
                }, {
                    "$lookup": {
                        "from": "users",
                        "localField": "reporter",
                        "foreignField": "_id",
                        "as": "reporter"
                    }
                },
                {
                    "$lookup": {
                        "from": "comments",
                        "localField": "object",
                        "foreignField": "_id",
                        "as": "object"
                    }
                }
            ])

            reports = reports.concat(reportBooks)
            reports = reports.concat(reportUsers)
            reports = reports.concat(reportComments)

            return res.status(200).json({
                success: true,
                message: "get all report successfully!",
                data: reports
            })
        } catch (error) {

        }
    }

    async createReport(req, res, next) {
        try {
            const idUser = req.userID
            const {
                type,
                object
            } = req.params
            const {
                reason
            } = req.body

            const newReport = new Report({
                reporter: idUser,
                type,
                object,
                reason
            })

            await newReport.save()

            return res.status(200).json({
                success: true,
                message: "report successfully!"
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

module.exports = new ReportController()