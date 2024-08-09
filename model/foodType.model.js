import mongoose from "mongoose";
const foodTypeSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
}, { timestamps: true });

 const foodType = mongoose.model("food-type", foodTypeSchema);
export default foodType;
