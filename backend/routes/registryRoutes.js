import { Router } from "express";
import { registryHistory } from "../controllers/registryController.js";
import { authGuard } from "../middlewares/authGuard.js";

const router = Router();

router.post("/", authGuard, registryHistory);

export default router;
