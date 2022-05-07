import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { env } from "process";
import { PrismaFeedbackRepository } from "../repositories/prisma/PrismaFeedbackRepository";
import { SubmitFeedbackService } from "../services/SubmitFeedBackService";

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: env.NODEMAILER_USER,
    pass: env.NODEMAILER_PASS,
  },
});

class FeedbackController {
  async store(req: Request, res: Response) {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbackRepository = new PrismaFeedbackRepository();

    const submitFeedbackService = new SubmitFeedbackService(
      prismaFeedbackRepository
    );

    submitFeedbackService.execute({ type, comment, screenshot });

    // await transport.sendMail({
    //   from: "Equipe Feedget <oi@feedget.com>",
    //   to: "Pedro Mascarenhas <pedro_drosa@hotmail.com>",
    //   subject: "Novo Feedback",
    //   html: [
    //     `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
    //     `<p>Tipo do Feedback: ${type}</p>`,
    //     `<p>Camentário:${comment}</p>`,
    //     `</div>`,
    //   ].join("\n"),
    // });

    return res.status(201).send();
  }
}

export default new FeedbackController();
