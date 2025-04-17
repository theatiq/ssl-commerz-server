require("dotenv").config()
const app = require("./src/app")
const { connectDB } = require("./src/utils/connectDB")
const port = process.env.PORT || 5000

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`🚩Server is running at Port⚡: ${port}`)
        console.log(`💖MongoDB Connected Successfully`)
    })
}).catch((err) => {
    console.log(err)
})


