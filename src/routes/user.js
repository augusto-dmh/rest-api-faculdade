import { Router } from "express";
import user from "../controllers/user";

const router = new Router();

router.post("/users", user.store);
router.get("/users", user.index);
router.get("/users/:username", user.show);
router.put("/users/:username", user.update);
router.delete("/users/:username", user.destroy);

export default router;
