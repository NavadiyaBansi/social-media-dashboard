import mongoose, {Schema} from "mongoose";
const restaurantTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

export const restaurentType = mongoose.model("restuarantName", restaurantTypeSchema);
