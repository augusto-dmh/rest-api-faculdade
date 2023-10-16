import { Router } from "express";
import course from "../controllers/course";

const router = new Router();

router.post("/courses", course.store);
router.get("/courses", course.index);
router.get("/courses/:id", course.show);
router.put("/courses/:id", course.update);
router.delete("/courses/:id", course.destroy);

export default router;
