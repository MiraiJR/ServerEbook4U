const Notification = require("../models/Notification.js")

class NotifyController {
    async getNotificationOfUser(req, res, next) {
        try {
            const idUser = req.userID

            const notifications = await Notification.find({
                receiver: idUser
            }).populate("object").sort({
                createdAt: 1
            })

            return res.status(200).json({
                success: true,
                message: "Get notification successfully!",
                data: notifications
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async changeStatus(req, res, next) {
        try {
            const idNotify = req.params.id

            await Notification.updateOne({
                _id: idNotify
            }, {
                $set: {
                    status: true
                }
            })

            return res.status(200).json({
                success: true,
                message: "Change status successfully!"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async countNotificationWithStatusFalse(req, res, next) {
        try {
            const idUser = req.userID

            const countNotifications = await Notification.countDocuments({
                receiver: idUser,
                status: false
            })

            return res.status(200).json({
                success: true,
                message: "Get notification successfully!",
                data: countNotifications
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

module.exports = new NotifyController()