
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone"],
    },
    city: {
        type: String,
        required: [true, "Please provide a city"],
    },
    state: {
        type: String,
        required: [true, "Please provide a state"],
    },
    country: {
        type: String,
        required: [true, "Please provide a country"],
    },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
    verifyToken: String,
    verifyTokenExpiry: Date
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;