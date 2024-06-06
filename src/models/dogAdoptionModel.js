// models/DogForAdoption.js

import mongoose from 'mongoose';

const dogAdoptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    forSale: {
        type: Boolean,
        default: false,
    },
});

const DogForAdoption = mongoose.models.DogForAdoption || mongoose.model('DogForAdoption', dogAdoptionSchema);

export default DogForAdoption;
