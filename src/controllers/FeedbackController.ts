import { Request, Response } from "express";
import { prisma } from "../prisma";

class FeedbackController {
  async store(req: Request, res: Response) {
    const { type, comment, screenshot } = req.body;

    const feedback = await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });

    return res.status(201).json(feedback);
  }
}

export default new FeedbackController();
