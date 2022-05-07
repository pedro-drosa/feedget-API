import { Request, Response } from "express";

class FeedbackController {
  async store(req: Request, res: Response) {
    const { type, comment } = req.body;
    return res.json({ data: { type, comment } });
  }
}

export default new FeedbackController();
