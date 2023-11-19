import OpenAI from "openai";
import config from '../config/config.json' assert { type: "json"};

//Setting Up Open AI
const openai = new OpenAI({
    apiKey: config.openAiApiKey
})

//Function to Recieve and Return Response
export const getResponse = async (text) => {
    try {
        //Using gpt-3.5-turbo model for our Open AI chat bot
        const chatbotResponse = await openai.chat.completions.create({
            messages: [{ role: 'user', content: text }],
            model: 'gpt-3.5-turbo'
        })

        return chatbotResponse.choices[0].message.content;
    } catch(error) {
        console.log(error);
        return "Sorry! An Error Occured Please Ask The Question Again in a while!!!!"
    }
}
