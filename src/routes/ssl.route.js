const express = require("express")
const { postPayment, successPayment } = require("../controllers/payment.controller")
const sslRouter = express.Router()

sslRouter.post("/pay", postPayment)
sslRouter.post("/success", successPayment)

module.exports = sslRouter