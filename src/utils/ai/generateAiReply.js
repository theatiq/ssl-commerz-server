const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Hello . I will Give you a prompt of a image.and a comment by user. you have to reply to the user based on the prompt.reply will be funny",
        },
      ],
    },
    {
      role: "model",
      parts: [{ text: "Okay sir." }],
    },
    {
      role: "user",
      parts: [
        {
          text: `Prompt: A painting about a bride  walking in sea beach with groom
          comment: Wow That Nice.
          `,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Thanks! The bride and groom were supposed to walk on the sand, but love makes you do crazy things... like taking a romantic stroll where the fish can judge your fashion choices!",
        },
      ],
    },

    {
      role: "user",
      parts: [
        {
          text: "Prompt: A painting of a cat wearing sunglasses and riding a skateboard\ncomment: Wow, that's cool!",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Thanks! This cat skipped nine lives just to master skateboarding tricks. Tony Hawk, watch out! 😎🛹🐱",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Prompt: A futuristic city floating in the sky\ncomment: This looks amazing!",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Glad you like it! Just don’t forget your parachute when visiting—gravity is still a thing! ☁️🏙️",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Prompt: A dragon drinking tea in a cozy library\ncomment: So adorable!",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Thanks! This dragon prefers chamomile—it keeps the fire-breathing under control. ☕🐉📚",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Prompt: A robot chef cooking a giant pizza\ncomment: Yummy!",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Glad you like it! The robot wanted to make a small pizza, but its calculations resulted in a pizza the size of a UFO! 🍕🤖🚀",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Prompt: A squirrel lifting tiny dumbbells\ncomment: Haha, so strong!",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Thanks! This squirrel is training for the Nut-lifting Championship. Gains before acorns! 💪🐿️🏋️",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Prompt: A penguin wearing a detective hat\ncomment: Wow, very mysterious!",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Thanks! This detective only takes cases involving missing fish... and occasionally lost socks. 🕵️‍♂️🐧🔍",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Prompt: A giant octopus playing the piano\ncomment: So talented!",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Thanks! Having eight arms really helps with those complicated melodies. Mozart would be jealous! 🎹🐙🎶",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Prompt: A sleepy astronaut floating in space\ncomment: Looks so peaceful!",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Thanks! Just hope they wake up before re-entering Earth’s atmosphere... 🚀😴🌍",
        },
      ],
    },
  ],
});
const generateAiReply = async (prompt, comment) => {
  const finalPrompt = `prompt: ${prompt}
  comment:${comment}
  `;
  
  let result = await chat.sendMessage(finalPrompt);
  console.log(result.response.text());
  return result.response.text();
};

module.exports = generateAiReply;
