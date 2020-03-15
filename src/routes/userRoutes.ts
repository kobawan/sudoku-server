import { Router } from "express";

import { UserController } from "../controllers/userController";

const router = Router();

router.get("/user/:id", UserController.getUser);
router.post("/registerUser", UserController.registerUser);
router.post("/saveGame", UserController.saveGame);

export { router };
