import { restaurentType } from "../model/restaurentType.model.js";


// create Restuaren tType
const createRestuarentType = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(404).json({ message: "restaurentName is required." })
        }
        
        const existingFood = await restaurentType.findOne({ name: name })
    
        if (existingFood) {
            return res.status(400).json({ message: "restaurentName is already exist" })
        }
        const newRestaurentType = await restaurentType.create({ name: name });
        if (!newRestaurentType) {
            return res.status(404).json({ message: "Something went wrong to create food type." })
        }
        await newRestaurentType.save();
        return res.status(201).json({ message: "Food type created successfully.", newRestaurentType });
    } catch (error) {
        return res.status(404).json({ message: "Something went wrong.", error: error })
    }
}


// get Restuarent Type
const getRestuarentType = async (req, res) => {
    try {
        const restuarent = await restaurentType.find();
        return res.status(200).json({
            code: 200,
            message: "Restuarent retrieved successfully",
            data: restuarent,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Get Restuarent error",
            error: error.message
        });
    }
}


// update Restuarent Type
const updateRestuarentType = async (req, res) => {
    try {
        const { _id } = req.body;
        const updateRestraType = await restaurentType.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });

        if (!updateRestraType) {
            return res.status(404).json({
                code: 404,
                message: 'restaurentType is not found',
                error: {}
            });
        }
        return res.status(200).json({
            code: 200,
            message: 'restaurentType is  updated successfully',
            data: updateRestraType,
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


// delete Restuarent Type
const deleteRestuarentType = async (req, res) => {
    try {
        const { _id } = req.body;
        const restoraTypeDelete = await restaurentType.findByIdAndDelete(_id);

        if (!restoraTypeDelete) {
            return res.status(404).json({
                code: 404,
                message: "restoraType not found",
                error: {}
            });
        }

        return res.status(200).json({
            code: 200,
            message: "restoraType deleted successfully",
            data: restoraTypeDelete,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Delete restoraType error",
            error: error.message
        });
    }
}
 

export {
    createRestuarentType,
    getRestuarentType,
    updateRestuarentType,
    deleteRestuarentType
}