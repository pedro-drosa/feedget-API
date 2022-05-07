import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbackRepository } from "../repositories/feedbackRepository";

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  private feedbackRepository: FeedbackRepository;
  private mailAdapter: MailAdapter;

  constructor(
    feedbackRepository: FeedbackRepository,
    mailAdapter: MailAdapter
  ) {
    this.feedbackRepository = feedbackRepository;
    this.mailAdapter = mailAdapter;
  }

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbackRepository.create({ type, comment, screenshot });
    await this.mailAdapter.sendMail({
      subject: "[Feedget] Novo Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo do Feedback: ${type}</p>`,
        `<p>Camentário:${comment}</p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
