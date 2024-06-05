import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        console.log("Connecting to the database...");
        await connect();
        console.log("Connected to the database.");

        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log("Request body:", reqBody);

        // Check if email and password are provided
        if (!email || !password) {
            console.log("Email or password missing");
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        console.log("Finding user with email:", email);
        const userExists = await User.findOne({ email });
        if (!userExists) {
            console.log("User does not exist");
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        console.log("Checking password...");
        const validPassword = await bcryptjs.compare(password, userExists.password);
        if (!validPassword) {
            console.log("Invalid password");
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        console.log("Password is valid. Generating token...");
        const tokenData = {
            id: userExists._id,
            username: userExists.username,
            email: userExists.email,
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, { expiresIn: "1d" });

        console.log("Token generated:", token);
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensure cookie is secure in production
            sameSite: "strict",
            path: "/",
        });

        console.log("Response prepared. Sending response...");
        return response;
    } catch (error: any) {
        console.error("Error during login:", error); // Detailed error logging
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
