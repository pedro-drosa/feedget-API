import { Request, Response } from "express";
import { prisma } from "../prisma";
import nodemailer from "nodemailer";
import { env } from "process";

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

    const feedback = await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });

    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Pedro Mascarenhas <pedro_drosa@hotmail.com>",
      subject: "Novo Feedback",
      html: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo do Feedback: ${type}</p>`,
        `<p>Camentário:${comment}</p>`,
        `</div>`,
      ].join("\n"),
    });

    return res.status(201).json(feedback);
  }
}

export default new FeedbackController();
