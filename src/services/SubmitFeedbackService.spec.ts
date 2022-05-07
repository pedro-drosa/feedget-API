import exp from "constants";
import { SubmitFeedbackService } from "./SubmitFeedBackService";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackService = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback ", async () => {
    await expect(
      submitFeedbackService.execute({
        type: "BUG",
        comment: "example message!",
        screenshot: "data:image/png;base64,teste123.png",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type ", async () => {
    await expect(
      submitFeedbackService.execute({
        type: "",
        comment: "example message!",
        screenshot: "data:image/png;base64,teste123.png",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without comment ", async () => {
    await expect(
      submitFeedbackService.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,teste123.png",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with an invalid screenshot ", async () => {
    await expect(
      submitFeedbackService.execute({
        type: "BUG",
        comment: "example message!",
        screenshot: "image.png",
      })
    ).rejects.toThrow();
  });
});
