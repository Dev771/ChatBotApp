import mongoose from "mongoose";

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