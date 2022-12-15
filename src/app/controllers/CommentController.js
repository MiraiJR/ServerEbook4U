const Comment = require("../models/Comment.js")

class CommentController {
    async addNewComment(req, res, next) {
        const user = req.userID

        const {
            idBook,
            contentComment
        } = req.body

        try {
            const newComment = new Comment({
                user,
                book: idBook,
                content: contentComment
            })

            if (!newComment) {
                return res.status(400).json({
                    success: false,
                    message: "Can't add new comment for this book!"
                })
            }

            //all good 
            await newComment.save()
            return res.status(200).json({
                success: true,
                message: "Add new comment for this book successfully!",
                data: newComment
            })
        } catch (error) {
            console.log("Error in CommentController: " + error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async deleteComment(req, res, next) {
        const user = req.userID
        const idComment = req.params.id

        try {
            const comment = await Comment.findOne({
                _id: idComment
            })

            if (!comment) {
                return res.status(400).json({
                    success: false,
                    message: "Can't find this comment!"
                })
            }

            if (comment.user != user) {
                return res.status(400).json({
                    success: false,
                    message: "You don't have permission to take action with this comment!"
                })
            }

            // all good
            await Comment.deleteOne({
                _id: idComment
            })

            return res.status(200).josn({
                success: true,
                message: "This comment is deleted successfully!"
            })
        } catch (error) {
            console.log("Error in CommentController: " + error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }

    async addAnswerForComment(req, res, next) {
        const user = req.userID
        
        const {
            idComment,
            contentComment
        } = req.body

        try {
            const comment = await Comment.findOne({
                _id: idComment
            }).populate("users")

            comment.answer.push({
                user,
                content: contentComment
            })

            await comment.save()

            return res.status(200).json({success: true, message: "Add answer for this comment successfully!", data: comment})
        } catch (error) {
            console.log("Error in CommentController: " + error)
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            })
        }
    }
}

module.exports = new CommentController()