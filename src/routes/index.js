import { Router } from "express";

import home from "./home";
import course from "./course";
import modality from "./modality";
import student from "./student";

const router = new Router();

const routes = [home, course, modality, student];

routes.forEach((route) => router.use(route));

export default routes;
