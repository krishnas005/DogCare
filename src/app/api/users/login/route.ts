import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest) {
    try {
        await connect();
        const reqBody = await req.json();

        const { email, password } = reqBody;
        console.log(reqBody);

        const userExists = await User.findOne({ email });
        if (!userExists) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        const validPassword = await bcryptjs.compare(password, userExists.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        console.log(userExists);
        const tokenData = {
            id: userExists._id,
            username: userExists.username,
            email: userExists.email
        }

        const token = await jwt.sign(tokenData, "abc123", { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}