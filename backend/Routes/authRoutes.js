import { Router } from "express";
import * as authController from "../Controllers/authController.js";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
