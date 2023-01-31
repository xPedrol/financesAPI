import { Router } from "express";
import {
  controllerCreateNote,
  controllerGetNote,
  controllerGetNotes,
  controllerUpdateNote,
  controllerDeleteNote,
  controllerUpdateNoteFixed,
  controllerGetNoteCount,
} from "../controller/note.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();
router.post("/create", verifyToken, controllerCreateNote);
router.get("/count", verifyToken, controllerGetNoteCount);
router.get("/:id", verifyToken, controllerGetNote);
router.get("/", verifyToken, controllerGetNotes);
router.put("/:id", verifyToken, controllerUpdateNote);
router.delete("/:id", verifyToken, controllerDeleteNote);
router.put("/:id/fixed", verifyToken, controllerUpdateNoteFixed);

module.exports = router;
