import mongoose from "mongoose";

const dbConnection = () =>{
    try {
        const connection = mongoose.connect("mongodb://localhost:27017/demo");
        console.log("Database connected successfully.")
    } catch (error) {
        console.log("Something went wrong to connect database")
        
    }
}

export default dbConnection;