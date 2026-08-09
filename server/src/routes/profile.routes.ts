import { Router } from "express";
import {
  getProfile,
  updateProfile,
  searchDevelopers,
  getPublicProfile,
} from "../controllers/profile.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/me", authenticate, getProfile);
router.put("/me", authenticate, updateProfile);

router.get("/search", searchDevelopers);
router.get("/:id", getPublicProfile);

export default router;