const express = require("express")
const { insertAiImage, getAllImage, getSingleImage } = require("../controllers/image.controller")


const imgRouter = express.Router()


imgRouter.post("/create", insertAiImage)
imgRouter.get("/all", getAllImage)
imgRouter.get("/single/:id", getSingleImage)

module.exports = imgRouter