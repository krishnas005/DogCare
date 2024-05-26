import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Pet from "@/models/petModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


export async function POST(req: NextRequest) {
    await connect();
    try {
        const reqBody = await req.json()
        const { userName, petName, breed, state, gender, age, email, password, phone, city, country } = reqBody;
        console.log(reqBody);

        if (!userName || !petName || !breed || !gender || !age || !email || !password || !phone || !city || !country || !state) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name: userName,
            email,
            password: hashedPassword,
            phone,
            city,
            state,
            country
        });

        const newPet = new Pet({
            name: petName,
            breed,
            age,
            gender,
            owner: newUser._id
        })

        await newPet.save()
        newUser.pets.push(newPet._id);
        await newUser.save()

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        )

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}