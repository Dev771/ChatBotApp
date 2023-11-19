import OpenAI from "openai";
import config from '../config/config.json' assert { type: "json"};

const openai = new OpenAI({
    apiKey: config.openAiApiKey
})

export const getResponse = async (text) => {
    try {
        const chatbotResponse = await openai.chat.completions.create({
            messages: [{ role: 'user', content: text }],
            model: 'gpt-3.5-turbo'
        })

        return chatbotResponse.choices[0].message.content;
    } catch(error) {
        return "Sorry! An Error Occured Please Ask The Question Again in a while!!!!"
    }
}
