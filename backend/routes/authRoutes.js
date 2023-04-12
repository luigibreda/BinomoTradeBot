import { Router } from "express";
import { login, register, me } from "../controllers/userController.js";
import { authGuard } from "../middlewares/authGuard.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authGuard, me);

export default router;
