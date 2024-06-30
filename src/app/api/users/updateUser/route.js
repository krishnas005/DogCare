import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Pet from "@/models/petModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PUT(req) {
    try {
        await connect();

        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded id: ", decoded.id);

        const body = await req.json();
        const { name, email, city, state, country, phone, petName, breed, age, gender } = body;

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(decoded.id, {
            name, email, city, state, country, phone
        }, { new: true });

        // Update pet details
        const updatedPet = await Pet.findOneAndUpdate({ owner: decoded.id }, {
            name: petName, breed, age, gender
        }, { new: true });

        return NextResponse.json({ success: true, user: updatedUser, pet: updatedPet }, { status: 200 });
    } catch (error) {
        console.error("Error updating user and pet details:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
