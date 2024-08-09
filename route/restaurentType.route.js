import { Router } from "express";
import {
    createRestuarentType,
    getRestuarentType,
    updateRestuarentType,
    deleteRestuarentType
} from "../controller/restaurentType.conntroller.js";
const router = Router();

router.route("/restauentType").post(createRestuarentType);
router.route("/getrestauentType").get(getRestuarentType);
router.route("/updaterestauentType").put(updateRestuarentType);
router.route("/deleterestaurenttype").delete(deleteRestuarentType);

export default router;