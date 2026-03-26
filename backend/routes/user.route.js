import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getMe, updateMe } from "../controllers/user.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/me", getMe);
router.patch("/me", upload.single("avatar"), updateMe);

export default router;