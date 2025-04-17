const generateAiReply = require("../utils/ai/generateAiReply");
const { commentCollection } = require("../utils/connectDB");

const postUserComment = async (req, res) => {
  const { imageId, prompt, email, comment } = req.body;
  if (!imageId || !prompt || !email) {
    res.status(400).send({
      status: 400,
      message: "please provide imageId, prompt, email",
    });
    return;
  }
  const reply = await generateAiReply(prompt, comment);
  const document = {
    prompt,
    imageId,
    email,
    comment,
    createdAt: new Date().toISOString(),
    reply,
  };
  const result = await commentCollection.insertOne(document);
  res.send({ ...result, reply });
};

module.exports = { postUserComment };
