// models/messageModel.js

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
}, { timestamps: true });


const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
export default Message;
