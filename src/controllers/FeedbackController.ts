import { Request, Response } from "express";
import { NodeMailerAdapter } from "../adapters/nodemailer/NodemailerMailAdapter";
import { PrismaFeedbackRepository } from "../repositories/prisma/PrismaFeedbackRepository";
import { SubmitFeedbackService } from "../services/SubmitFeedBackService";

class FeedbackController {
  async store(req: Request, res: Response) {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbackRepository = new PrismaFeedbackRepository();
    const nodemailerMailAdapter = new NodeMailerAdapter();

    const submitFeedbackService = new SubmitFeedbackService(
      prismaFeedbackRepository,
      nodemailerMailAdapter
    );

    submitFeedbackService.execute({ type, comment, screenshot });

    return res.status(201).send();
  }
}

export default new FeedbackController();
