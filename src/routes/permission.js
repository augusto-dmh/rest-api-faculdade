import { Router } from "express";
import permission from "../controllers/permission";

const router = new Router();

router.post("/permissions", permission.store);
router.get("/permissions", permission.index);
router.get("/permissions/:name", permission.show);
router.put("/permissions/:name", permission.update);
router.delete("/permissions/:name", permission.destroy);

export default router;
