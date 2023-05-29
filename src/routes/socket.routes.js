import { Router } from "express";
import { home, login } from "../controllers/socket.controllers";

const router = Router();

router.get("/play", home);
router.get("/", login);

export default router;
