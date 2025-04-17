// Definitions
require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const logger = require("./middleware/logger")
const imgRouter = require("./routes/image.routes")
const commentRouter = require("./routes/comment.route")
const sslRouter = require("./routes/ssl.route")

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(logger)

// Router

app.use("/api/v1/image", imgRouter)
app.use("/comment", commentRouter)
app.use("/payment", sslRouter)



// Playground


app.get("/", (req, res) => {
    res.send("Good morning")
})

module.exports = app