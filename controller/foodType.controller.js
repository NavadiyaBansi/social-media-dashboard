import foodType from "../model/foodType.model.js";


//creat Food Type
const creatFoodType = async (req, res) => {
    try {
        const { foodName } = req.body;
        if (!foodName) {
            return res.status(404).json({ message: "FoodName is required." })
        }
        const existingFood = await foodType.findOne({ foodName: foodName })
        if (existingFood) {
            return res.status(400).json({ message: "foodName is already exist" })
        }
        const newfoodType = await foodType.create({ foodName });
        if (!newfoodType) {
            return res.status(404).json({ message: "Something went wrong to create food type." })
        }
        await newfoodType.save();
        return res.status(201).json({ message: "Food type created successfully.", newfoodType });
    } catch (error) {
        return res.status(404).json({ message: "Something went wrong.", error: error })
    }
}


//get Food Type
const getFoodType = async (req, res) => {
    try {
        const users = await foodType.find();
        return res.status(200).json({
            code: 200,
            message: "Users retrieved successfully",
            data: users,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Get users error",
            error: error.message
        });
    }
}


//update Food Type
const updateFoodType = async (req, res) => {
    try {
        const { _id } = req.body;
        const updateFood = await foodType.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });

        if (!updateFood) {
            return res.status(404).json({
                code: 404,
                message: 'User not found',
                error: {}
            });
        }
        return res.status(200).json({
            code: 200,
            message: 'User updated successfully',
            data: updateFood,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: 'Update error',
            error: error.message
        });
    }
}


//delete Food Type
const deleteFoodType = async (req, res) => {
    try {
        const { _id } = req.body;
        const food = await foodType.findByIdAndDelete(_id);
  
        if (!food) {
            return res.status(404).json({
                code: 404,
                message: "food not found",
                error: {}
            });
        }
  
        return res.status(200).json({
            code: 200,
            message: "food deleted successfully",
            data: food,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Delete food error",
            error: error.message
        });
    }
}

export {
    creatFoodType,
    getFoodType,
    updateFoodType,
    deleteFoodType
}
