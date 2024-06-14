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
        const { alertType, alertDate, alertDescription } = body;

        const updatedPet = await Pet.findByIdAndUpdate(
            petId,
            { $push: { healthAlerts: { type: alertType, date: alertDate, description: alertDescription } } },
            { new: true }
        );

        return NextResponse.json({ success: true, pet: updatedPet }, { status: 200 });
    } catch (error) {
        console.error("Error updating health alerts:", error);
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

        return NextResponse.json({ success: true, healthAlerts: pet.healthAlerts }, { status: 200 });
    } catch (error) {
        console.error("Error fetching health alerts:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connect();

        const url = new URL(req.url);
        const petId = url.searchParams.get('id');
        const alertId = url.searchParams.get('alertId');
        if (!petId || !alertId) {
            return NextResponse.json({ error: "Pet ID and Alert ID are required" }, { status: 400 });
        }

        const updatedPet = await Pet.findByIdAndUpdate(
            petId,
            { $pull: { healthAlerts: { _id: alertId } } },
            { new: true }
        );

        return NextResponse.json({ success: true, pet: updatedPet }, { status: 200 });
    } catch (error) {
        console.error("Error deleting health alert:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
