import mongoose from "mongoose";

//Structure of Our Messages
const MessageSchema = mongoose.Schema({
    message: {
        type: String
    },
    user: {
        type: String
    },
    respondent: {
        type: Boolean
    },
    createdAt: {
        type: 'Date'
    }
});

export default mongoose.model("MessageSchema", MessageSchema);