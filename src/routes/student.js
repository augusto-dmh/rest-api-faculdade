import { Router } from "express";
import student from "../controllers/student";

const router = new Router();

router.post("/students", student.store);
router.get("/students", student.index);
router.get("/students/:id", student.show);
router.put("/students/:id", student.update);
router.delete("/students/:id", student.destroy);

export default router;
