const express = require("express")
const { postUserComment } = require("../controllers/comment.controller")
const commentRouter = express.Router()


// commentRouter.get("/image/:imageId",)
commentRouter.post("/create", postUserComment)
// commentRouter.post("/create",)


module.exports = commentRouter