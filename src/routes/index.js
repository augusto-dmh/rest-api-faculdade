import { Router } from "express";
import home from "./home";

const router = new Router();

const routes = [home];

routes.forEach((route) => router.use(route));

export default routes;
