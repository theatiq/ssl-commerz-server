const { ObjectId } = require("mongodb")
const generateImageUrl = require("../utils/ai/generateImageURL")
const getImageBuffer = require("../utils/ai/getImageBuffer")
const { imageCollection } = require("../utils/connectDB")

const insertAiImage = async (req, res) => {
    const { email, prompt, category, username, userImg } = req.body
    if (!email || !prompt || !category || !username || !userImg) {
        res.status(400).send({
            status: 400,
            message: "Please provide email, prompt, category, username, userImg"
        })
    }
    // res.send({})
    try {
        const buffer = await getImageBuffer(prompt, category)
        console.log(buffer)
        const data = await generateImageUrl(buffer, prompt)
        console.log(data)
        const document = {
            email,
            username,
            userImg,
            prompt,
            category,
            thumbImg: data.data.thumb.url,
            mediumImg: data.data.medium.url,
            originalImg: data.data.url,
            createdAt: new Date().toISOString()
        }
        const result = await imageCollection.insertOne(document)
        console.log(document)
        res.send({ ...result, url: data.originalImg })

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const getAllImage = async (req, res) => {
    try {
        const result = await imageCollection.find().project({ _id: 1, userImg: 1, username: 1, thumbImg: 1 }).toArray()
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)

    }
}

const getSingleImage = async (req, res) => {
    try {
        const { id } = req.params
        if (id.length != 24) {
            res.status(400).send({
                status: 400,
                message: "Please provide Valid Id"
            })
            return
        }
        const result = await imageCollection.findOne({ _id: new ObjectId(id) })
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)

    }
}


module.exports = { insertAiImage, getAllImage, getSingleImage }