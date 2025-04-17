require("dotenv").config()
const generateImageUrl = async (buffer, prompt) => {
    const imgBBApi = `https://api.imgbb.com/1/upload?key=${process.env.IMG_BB_KEY
        }`;
    const formData = new FormData();
    formData.append(
        "image",
        new Blob([buffer], { type: "image/jpeg" }),
        `${prompt}.jpg`
    );
    const response = await fetch(imgBBApi, {
        method: "POST",
        body: formData,
    });
    const data = await response.json();
    return data;
};

module.exports= generateImageUrl