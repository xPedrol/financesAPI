import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import {
  controllerCreateCategory,
  controllerDeleteCategory,
  controllerGetCategories,
  controllerGetCategory,
  controllerUpdateCategory,
} from "../controller/category.controller";

const router = Router();
router.post("/create", verifyToken, controllerCreateCategory);
router.get("/:id", verifyToken, controllerGetCategory);
router.get("/", verifyToken, controllerGetCategories);
router.put("/:id", verifyToken, controllerUpdateCategory);
router.delete("/:id", verifyToken, controllerDeleteCategory);

module.exports = router;
