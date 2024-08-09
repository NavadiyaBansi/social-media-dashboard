import  { Router } from "express";
import {creatFoodType, getFoodType, updateFoodType, deleteFoodType} from "../controller/foodType.controller.js";

const router = Router();

router.route("/foodType").post(creatFoodType);
router.route("/getFoodType").get(getFoodType);
router.route("/updatFoodType").put(updateFoodType);
router.route("/deleteFoodType").delete(deleteFoodType);

export default router;

