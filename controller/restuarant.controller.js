import { Schema } from "mongoose";
import { Restuarent } from "../model/restuarant.model.js";
import mongoose from "mongoose"
import { restaurentType } from "../model/restaurentType.model.js";
import foodType from "../model/foodType.model.js";

// create Restuarant
const createRestuarant = async (req, res) => {
    try {
        const { name, email, mobile, address, resTypeId, foodTypeId } = req.body;
        if (!name || !email || !mobile || !address || !resTypeId || !foodTypeId) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // check already exist or not
        const isName = await Restuarent.findOne({ name: name });
        if (isName) {
            return res.status(404).json({ message: "Name is already exists." })
        }


        const newRestuarant = await Restuarent.create({
            name, email, mobile, address, resTypeId, foodTypeId
        });
        if (!newRestuarant) {
            return res.status(404).json({ message: "Something went wrong to create restuarant." });
        }
        await newRestuarant.save()
        return res.status(201).json({ message: "Restuarant created successfully.", newRestuarant });
    } catch (error) {
        return res.status(404).json({ message: "Something went wrong." });
    }
}


const getRestaurantByDate = async (req, res) => {
    try {
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        const endOfDay = new Date();

        // Calculate start of the current week (Monday)
        const dayOfWeek = now.getDay();
        const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If today is Sunday (getDay() === 0), set diffToMonday to 6, else subtract 1
        const startOfWeek = new Date(now.setDate(now.getDate() - diffToMonday));

        startOfWeek.setHours(0, 0, 0, 0); // Set time to start of day

        // Calculate end of the current week (Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999); // Set time to end of day ( hours, minutes, seconds, and milliseconds. )

        // Calculate start of the current month
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Aggregate data for each time period
        const todayData = await Restuarent.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfDay, $lte: endOfDay }
                }
            },
            {
                $lookup: {
                    from: "restuarantnames",
                    localField: "resTypeId",
                    foreignField: "_id",
                    as: "restuarantNameDetails"
                }
            },
            {
                $lookup: {
                    from: "food-types",
                    localField: "foodTypeId",
                    foreignField: "_id",
                    as: "foodTypeDetails"
                }
            }
        ]);

        const weeklyData = await Restuarent.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfWeek, $lte: endOfWeek }
                }
            },
            {
                $lookup: {
                    from: "restuarantnames",
                    localField: "resTypeId",
                    foreignField: "_id",
                    as: "restuarantNameDetails"
                }
            },
            {
                $lookup: {
                    from: "food-types",
                    localField: "foodTypeId",
                    foreignField: "_id",
                    as: "foodTypeDetails"
                }
            }
        ]);

        const monthlyData = await Restuarent.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfMonth, $lte: endOfDay }
                }
            },
            {
                $lookup: {
                    from: "restuarantnames",
                    localField: "resTypeId",
                    foreignField: "_id",
                    as: "restuarantNameDetails"
                }
            },
            {
                $lookup: {
                    from: "food-types",
                    localField: "foodTypeId",
                    foreignField: "_id",
                    as: "foodTypeDetails"
                }
            }
        ]);

        // Count the number of documents for each time period
        const todayCount = todayData.length;
        const weekCount = weeklyData.length;
        const monthCount = monthlyData.length;

        return res.status(200).json({
            code: 200,
            message: "Restaurant data fetched successfully.",
            todayCount,
            todayData,
            weekCount,
            weeklyData,
            monthCount,
            monthlyData,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Something went wrong.",
            error: error.message
        });
    }
};

const getAllRestuarent = async (req, res) => {
    try {

        // one day calculation
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0)); 
        const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

        const restaurant = await Restuarent.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        })
        const getRestaurantType = await restaurentType.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        })
        const getFoodType = await foodType.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        })

        // one week calculation
        const dayOfWeek = startOfDay.getDay();
        const diffToMonday = (dayOfWeek + 6) % 7;
        const startOfWeek = new Date(startOfDay.getTime() - diffToMonday * 24 * 60 * 60 * 1000);
        const endOfWeek = new Date(startOfWeek.getTime()+ 7 * 24 * 60 * 60 * 1000 - 1); // Add 6 days 
        endOfWeek.setHours(23, 59, 59, 999);

        const restaurantByWeek = await Restuarent.countDocuments({
            createdAt: { $gte: startOfWeek, $lte: endOfWeek }
        })
        const getRestaurantTypeByWeek = await restaurentType.countDocuments({
            createdAt: { $gte: startOfWeek, $lte: endOfWeek }
        })
        const getFoodTypeByWeek = await foodType.countDocuments({
            createdAt: { $gte: startOfWeek, $lte: endOfWeek }
        })

        const data = [
            {
                "restaurent":restaurant,
                "getRestaurantType":getRestaurantType,
                "getFoodType":getFoodType
            },
            {
                "restaurantByWeek":restaurantByWeek,
                "getRestaurantTypeByWeek":getRestaurantTypeByWeek,
                "getFoodTypeByWeek":getFoodTypeByWeek
            }
        ]
        return res.status(202).json({
            message: "Done",
            data:data
        })
        // return res.status(202).json({
        //     message: "Done",
        //     restaurant,
        //     getRestaurantType,
        //     getFoodType,
        //     restaurantByWeek,
        //     getRestaurantTypeByWeek,
        //     getFoodTypeByWeek
        // })
    } catch (error) {
        return res.status(404).json({ message: "Something went wrong." })
    }
}


// update Restaurant by _id
const updateRestaurantById = async (req, res) => {
    try {
        const { id, _id, name, email, mobile, address, resTypeId, foodTypeId } = req.body;

        // Use either id or _id depending on which is passed
        const restaurantId = id || _id;

        // Check if the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ message: "Invalid ID format." });
        }

        // Find and update the restaurant by _id from the body
        const updatedRestaurant = await Restuarent.findByIdAndUpdate(
            restaurantId,
            { name, email, mobile, address, resTypeId, foodTypeId },
            { new: true, runValidators: true }
        );

        if (!updatedRestaurant) {
            console.log("No document found with the provided _id:", restaurantId);
            return res.status(404).json({ message: "Restaurant not found." });
        }

        return res.status(200).json({
            code: 200,
            message: "Restaurant updated successfully.",
            data: updatedRestaurant
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Something went wrong.",
            error: error.message
        });
    }
};


//delete restaurent data
const deleteRestaurant = async (req, res) => {
    try {
        const { _id } = req.body;
        const restaurentId = await Restuarent.findByIdAndDelete(_id);

        if (!restaurentId) {
            return res.status(404).json({
                code: 404,
                message: "User not found",
                error: {}
            });
        }

        return res.status(200).json({
            code: 200,
            message: "User deleted successfully",
            data: restaurentId,
            error: {}
        });
    } catch (error) {
        console.log('Delete user error :>> ', error);
        return res.status(500).json({
            code: 500,
            message: "Delete user error",
            error: error.message
        });
    }
}
const hello = () => {}

export {
    createRestuarant,
    getAllRestuarent,
    getRestaurantByDate,
    updateRestaurantById,
    deleteRestaurant
}
