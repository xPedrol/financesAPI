import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import {
  controllerCreateTag,
  controllerDeleteTag,
  controllerGetTags,
  controllerGetTag,
  controllerUpdateTag,
} from "../controller/tag.controller";

const router = Router();
router.post("/create", verifyToken, controllerCreateTag);
router.get("/:id", verifyToken, controllerGetTag);
router.get("/", verifyToken, controllerGetTags);
router.put("/:id", verifyToken, controllerUpdateTag);
router.delete("/:id", verifyToken, controllerDeleteTag);

module.exports = router;
