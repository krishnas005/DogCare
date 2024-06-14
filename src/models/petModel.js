import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    breed: {
        type: String,
        required: [true, "Please provide breed"],
    },
    age: {
        type: Number,
        required: [true, "Please provide age"],
    },
    gender: {
        type: String,
        required: [true, "Please provide gender"],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // photoUrl: String
    healthRecords: [{
        date: { type: Date, required: true },
        type: { type: String, required: true },
        description: { type: String, required: true },
        vet: { type: String },
    }],
    healthAlerts: [{
        type: { type: String, required: true },
        date: { type: Date, required: true },
        description: { type: String },
    }],
}, { timestamps: true });

const Pet = mongoose.models.pets || mongoose.model("pets", petSchema);
export default Pet;


