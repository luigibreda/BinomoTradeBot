import { Router } from "express";
import { canRun } from "../controllers/runController.js";

const router = Router();

router.get("/", canRun);

export default router;
