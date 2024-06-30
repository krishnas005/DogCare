import connect from "@/dbConfig/dbConfig";
import DogForAdoption from "@/models/dogAdoptionModel"
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest, res: NextResponse) {
    try {
        await connect();
        const reqBody = await req.json()
        const { name, breed, age, price } = reqBody;
        const newDog = new DogForAdoption({
            name,
            breed,
            age,
            price,
            forSale: true,
        });
        const savedDog = await newDog.save();
        return NextResponse.json(
            { message: "Pet stored successfully" },
            { status: 201 }
        )
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
        
    }
};