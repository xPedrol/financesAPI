import { Router } from "express";
import {
  controllerCreateNote,
  controllerGetNote,
  controllerGetNotes,
  controllerUpdateNote,
  controllerDeleteNote,
  controllerUpdateNoteFixed,
  controllerGetNoteCount,
  controllerRemoveFromNoteGroup,
} from "../controller/note.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();
router.post("/create", verifyToken, controllerCreateNote);

router.get("/count", verifyToken, controllerGetNoteCount);
router.get("/:id", verifyToken, controllerGetNote);
router.get("/", verifyToken, controllerGetNotes);

router.put("/:id", verifyToken, controllerUpdateNote);
router.put("/:id/fixed", verifyToken, controllerUpdateNoteFixed);

router.delete("/:id", verifyToken, controllerDeleteNote);
router.delete("/:id/group", verifyToken, controllerRemoveFromNoteGroup);

module.exports = router;
