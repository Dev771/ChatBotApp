import MessageSchema from '../Model/MessageSchema.js';
import UserSchema from '../Model/UserSchema.js';
import { getResponse } from '../OpenAI/openai-connection.js';


export const getAllChats = async (req, res) => {
    const user = await UserSchema.findOne({ email: req.params.id });

    if(user) {
        const userConversation = await MessageSchema.find({ user: req.params.id }).sort({ createdAt: 1 });

        return res.status(200).json({ status: "success", msg: "Conversation Extracted SuccessFully!!", data: userConversation });
    } else {
        return res.status(400).json({ status: "error", msg: "UnAuthorized Access!!!!" });
    }
}

export const chat = async ({message, email}) => {

    const user = await UserSchema.findOne({ email: email });

    if(!user) {
        return { status: "error", msg: "UnAuthorized Access!!!" };
    } else {

        const userSavedMessage = await MessageSchema.create({ message, user: email, respondent: 0, createdAt: Date.now() });
        if(userSavedMessage) {
            const botResponse = await getResponse(message);
    
            console.log(botResponse);

            const response = await MessageSchema.create({ message: botResponse, user: email, respondent: 1, createdAt: Date.now() })

            return { status: 'success', msg: botResponse };
        } else {
            return { status: "error", msg: "Error Occured While Storing Resources Please Try Again!!!" };
        }
    }



}