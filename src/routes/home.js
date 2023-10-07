import { Router } from "express";
import home from "../controllers/home";

const router = new Router();

router.get("/", home.index);

export default router;
