import { Router } from "express";
import { getProfile } from "../controllers/profile.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/me", authenticate, getProfile);

export default router;