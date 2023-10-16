import { Router } from "express";

import home from "./home";
import course from "./course";

const router = new Router();

const routes = [home, course];

routes.forEach((route) => router.use(route));

export default routes;
