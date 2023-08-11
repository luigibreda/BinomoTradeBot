import { Router } from "express";
import { login, register, me, remove, update, renewUser, desactiveUser, desactivateExpiredUsers } from "../controllers/userController.js";
import { authGuard } from "../middlewares/authGuard.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authGuard, me);
router.post("/remove", remove);
//router.post("/update", update);
router.post("/active", renewUser);
router.post("/desactive", desactiveUser);
//router.post("/desactivateExpiredUsers", desactivateExpiredUsers);

export default router;
