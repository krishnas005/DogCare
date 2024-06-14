import connect from "@/dbConfig/dbConfig";
import Pet from "@/models/petModel";
import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        await connect();

        const url = new URL(req.url);
        const petId = url.searchParams.get('id');
        if (!petId) {
            return NextResponse.json({ error: "Pet ID is required" }, { status: 400 });
        }

        const body = await req.json();
        const { type, date, description, vet } = body;

        const updatedPet = await Pet.findByIdAndUpdate(
            petId,
            { $push: { healthRecords: { type, date, description, vet } } },
            { new: true }
        );

        return NextResponse.json({ success: true, pet: updatedPet }, { status: 200 });
    } catch (error) {
        console.error("Error updating health records:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connect();

        const url = new URL(req.url);
        const petId = url.searchParams.get('id');
        if (!petId) {
            return NextResponse.json({ error: "Pet ID is required" }, { status: 400 });
        }

        const pet = await Pet.findById(petId);

        return NextResponse.json({ success: true, healthRecords: pet.healthRecords }, { status: 200 });
    } catch (error) {
        console.error("Error fetching health records:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}