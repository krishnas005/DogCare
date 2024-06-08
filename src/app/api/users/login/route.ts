import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Pet from "@/models/petModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        await connect();

        const reqBody = await req.json();
        const { email, password } = reqBody;

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
            username: userExists.name,
            email: userExists.email,
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, { expiresIn: "1d" });

        console.log("Token generated:", token);

        // Fetch pet details for the user
        const pets = await Pet.find({ _id: { $in: userExists.pets } });
        console.log("Pets of user: ", pets)
        // Prepare response data with user and pet details
        const finalData = {
            tokenData,
            user: {
                email: userExists.email,
                name: userExists.name,
                _id: userExists._id,
                pets: pets,
            },
        };

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user: finalData,
        });

        response.cookies.set("token", token); // Set token as cookie

        console.log("Response prepared. Sending response...");
        return response;
    } catch (error: any) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
