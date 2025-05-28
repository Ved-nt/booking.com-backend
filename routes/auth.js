import express from "express";
import { login, regiter } from "../controllers/auth.js";

const router = express.Router();

router.post("/register",regiter);
router.post("/login",login);

export default router;