import { Router } from "express";
import {
    createRestuarant,
    getAllRestuarent,
    getRestaurantByDate,
    updateRestaurantById,
    deleteRestaurant
} from "../controller/restuarant.controller.js";
const router = Router();

router.route("/create-restuarant").post(createRestuarant);
router.route("/getAllRestuarant").get(getAllRestuarent);
router.route("/get/date").get(getRestaurantByDate);
router.route('/update').put (updateRestaurantById);
router.route('/datadelete').delete(deleteRestaurant);

export default router;
