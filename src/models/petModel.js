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
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    // photoUrl:
});

const Pet = mongoose.models.pets || mongoose.model("pets", petSchema);
export default Pet;