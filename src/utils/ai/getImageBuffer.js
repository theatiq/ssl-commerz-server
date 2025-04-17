require("dotenv").config()
const getImageBuffer = async (prompt, category) => {
    const finalPrompt = `imagine a ${category} : ${prompt}`;
    console.log(finalPrompt);
    const form = new FormData();
    form.append("prompt", finalPrompt);
    const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
        method: "POST",
        headers: {
            "x-api-key": process.env.CD_KEY,
        },
        body: form,
    });
    const buffer = await response.arrayBuffer();
    return buffer;
};

module.exports = getImageBuffer