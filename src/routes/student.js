import { Router } from "express";
import student from "../controllers/student";

const router = new Router();

router.post("/students", student.store);
router.get("/students", student.index);
router.get("/students/:ra", student.show);
router.put("/students/:ra", student.update);
router.delete("/students/:ra", student.destroy);

export default router;
