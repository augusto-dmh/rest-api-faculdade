import { Router } from "express";

import home from "./home";
import course from "./course";
import modality from "./modality";

const router = new Router();

const routes = [home, course, modality];

routes.forEach((route) => router.use(route));

export default routes;
