import { Router } from "express";
import { authGuard } from "../middlewares/authGuard.js";
import { registerEntry, getEntrys } from "../controllers/entryController.js";

const router = Router();

router.post("/", authGuard, registerEntry);
router.get("/", getEntrys);

export default router;
