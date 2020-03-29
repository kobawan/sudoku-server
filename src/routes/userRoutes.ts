import { Router } from "express";

import { UserController } from "../controllers/userController";

const router = Router();

router.post("/login", UserController.getUser);
router.post("/register", UserController.registerUser);
router.post("/game", UserController.saveGame);

export default router;
