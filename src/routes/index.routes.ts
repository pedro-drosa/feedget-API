import { Router } from "express";
import feedbackRouter from "./feedback.routes";

const routes = Router();

routes.use("/feedbacks", feedbackRouter);

export default routes;
