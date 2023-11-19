import MessageSchema from '../Model/MessageSchema.js';
import UserSchema from '../Model/UserSchema.js';
import { getResponse } from '../OpenAI/openai-connection.js';

//Function Which returns all the messages of a particular User
export const getAllChats = async (req, res) => {
    let user;
    try {
        user = await UserSchema.findOne({ email: req.params.id });
    } catch(err) {
        return res.status(400).json({ status: "error", msg: "An UnExpected Error Occured Please Try Agian" })
    }

    if(user) {
        try {
            const userConversation = await MessageSchema.find({ user: req.params.id }).sort({ createdAt: 1 });
            return res.status(200).json({ status: "success", msg: "Conversation Extracted SuccessFully!!", data: userConversation });
        } catch(err) {
            return res.status(400).json({ status: "error", msg: "An UnExpected Error Occured Please Try Agian" })
        }

    } else {
        return res.status(400).json({ status: "error", msg: "UnAuthorized Access!!!!" });
    }
}

//Takes User Query and Processes it with Open AI bot and Provides a response to the client back
// and stores the messages in mongodb server
export const chat = async ({message, email}) => {

    let user;
    try {
        user = await UserSchema.findOne({ email: email });
    } catch(err) {
        return res.status(400).json({ status: "error", msg: "An UnExpected Error Occured Please Try Agian" })
    }

    if(!user) {
        return { status: "error", msg: "UnAuthorized Access!!!" };
    } else {
        try {
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
        catch(err) {
            return { status: "error", msg: "An UnExpected Error Occured Please Try Agian" }
        }

    }


}