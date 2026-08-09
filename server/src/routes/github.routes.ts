import { Router } from "express";
import { getGithubRepos } from "../controllers/github.controller";

const router = Router();

router.get("/:username", getGithubRepos);

export default router;