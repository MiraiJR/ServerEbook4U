const Report = require("../models/Report.js")
const {
    pushNotificationToAdmin
} = require("../../middleware/helper.js")

class ReportController {
    async getAllReport(req, res, next) {
        try {
            const reports = await Report.find({
                type: "users"
            }).populate("reporter").populate("object")

            return res.status(200).json({
                success: true,
                message: "get all report successfully!",
                data: reports
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
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

            const content = `Người dùng có id "${newReport.reporter}" vừa báo cáo ${newReport.type} có id: "${newReport.object}"`

            await pushNotificationToAdmin(content, "reports", newReport._id)

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