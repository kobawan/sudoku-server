import { Router } from "express";

import { UserController } from "../controllers/userController";

const router = Router();

// TODO: separate user and game logic
router.get("/user/:id", UserController.getUser);
router.post("/user", UserController.registerUser);
router.post("/saveGame", UserController.saveGame);

export default router;
