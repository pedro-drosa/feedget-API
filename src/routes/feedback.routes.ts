import { Router } from "express";
import FeedbackController from "../controllers/FeedbackController";

const feedbackRouter = Router();

feedbackRouter.post("/", FeedbackController.store);

export default feedbackRouter;
