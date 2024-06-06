import connect from "@/dbConfig/dbConfig";
import DogForAdoption from "@/models/dogAdoptionModel"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        await connect();
        const dogs = await DogForAdoption.find({ forSale: true });
        return NextResponse.json(dogs);
    } catch (error) {
        console.error('Error fetching dogs for adoption(route):', error);
        return NextResponse.json({ error: "Error fetching dogs for adoption(route)" }, { status: 500 });
    }
}
