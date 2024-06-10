// pages/api/messages/index.js

import connect from "@/dbConfig/dbConfig";
import Message from "@/models/messageModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req, res) {
    try {
        await connect();

        const messages = await Message.find().populate('user', 'name').sort({ timestamp: -1 });

        return res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function POST(req, res) {
    try {
        await connect();

        const token = req.cookies.token;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, {status:401});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        const { content } = await req.json();

        const user = await User.findById(decoded.id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, {status:404});
        }
        
        const newMessage = new Message({
            user: user._id,
            content,
        });

        await newMessage.save();

        return NextResponse.json({ success: true, message: newMessage }, {status: 201});
    } catch (error) {
        console.error("Error posting message:", error);
        return NextResponse.json({ error: "Internal Server Error" }, {status: 500});
    }
}
