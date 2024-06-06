import connect from "@/dbConfig/dbConfig";
import DogForAdoption from "@/models/dogAdoptionModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({
            success: false,
            message: "Dog ID is required",
        }, { status: 400 });
    }

    try {
        const dog = await DogForAdoption.findById(id);
        if (!dog) {
            return NextResponse.json({ error: 'Dog not found' }, { status: 404 });
        }
        if (!dog.forSale) {
            return NextResponse.json({ error: 'Dog is not for sale' }, { status: 400 });
        }
        dog.forSale = false;
        await dog.save();
        return NextResponse.json({ message: 'Dog bought successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error buying dog:', error);
        return NextResponse.json({ error: 'Error buying dog' }, { status: 500 });
    }
}
