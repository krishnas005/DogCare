import mongoose from "mongoose";

export default function connect() {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.log("Failed to connect to MongoDB", error);
        });
};