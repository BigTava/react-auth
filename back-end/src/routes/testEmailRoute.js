import { sendEmail } from "../util/sendEmail";

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      await sendEmail({
        to: "bigtavadev@gmail.com",
        from: "bigtavadev@gmail.com",
        subject: "Does this work?",
        text: "If you are reading this, yes it works",
      });
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },
};
