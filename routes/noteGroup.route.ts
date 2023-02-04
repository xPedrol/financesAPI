import { Router } from "express";
import {
  controllerCreateNoteGroup,
  controllerDeleteNoteGroup,
  controllerGetNoteGroup,
  controllerGetNoteGroupCount,
  controllerGetNoteGroups,
  controllerUpdateNoteGroup,
} from "../controller/noteGroup.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();
router.post("/create", verifyToken, controllerCreateNoteGroup);

router.get("/count", verifyToken, controllerGetNoteGroupCount);
router.get("/:id", verifyToken, controllerGetNoteGroup);
router.get("/", verifyToken, controllerGetNoteGroups);

router.put("/:id", verifyToken, controllerUpdateNoteGroup);

router.delete("/:id", verifyToken, controllerDeleteNoteGroup);

module.exports = router;
