import mongoose from "mongoose";

const restuarentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    resTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restuarantName"
    },
    foodTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food-type"
    }
}, { timestamps: true });

export const Restuarent = mongoose.model("restuarent", restuarentSchema);
