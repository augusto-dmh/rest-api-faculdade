import { Router } from "express";
import professor from "../controllers/professor";

const router = new Router();

router.post("/professors", professor.store);
router.get("/professors", professor.index);
router.get("/professors/:rd", professor.show);
router.put("/professors/:rd", professor.update);
router.delete("/professors/:rd", professor.destroy);

export default router;
