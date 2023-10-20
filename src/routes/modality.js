import { Router } from "express";
import modality from "../controllers/modality";

const router = new Router();

router.post("/modalities", modality.store);
router.get("/modalities", modality.index);
router.get("/modalities/:id", modality.show);
router.put("/modalities/:id", modality.update);
router.delete("/modalities/:id", modality.destroy);

export default router;
