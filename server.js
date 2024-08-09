import express from "express";
import dotenv from "dotenv";
import dbConnection from "./Database/connection.js";
dotenv.config();
const app = express();

//middleware
app.use(express.json());

dbConnection()
// Routes
import restaurentTypeRoute from "./route/restaurentType.route.js";
import foodTypeRoute from "./route/foodType.route.js"
import restuarantRoute from "./route/restuarant.route.js"

app.use("/api/restuarentType",restaurentTypeRoute);
app.use("/api/foodType",foodTypeRoute);
app.use("/api/restuarant",restuarantRoute);

app.listen(process.env.PORT,()=>{
    console.log(`server is running at port ${process.env.PORT}`)
});