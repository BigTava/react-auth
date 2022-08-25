import { v4 as uuid } from "uuid";
import { sendEmail } from "../util/sendEmail";
import { getDbConnection } from "../db";
import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool";

export const forgotPasswordRoute = {
  path: "/api/forgot-password/:email",
  method: "put",
  handler: async (req, res) => {
    /************* AUTH IN AWS COGNITO *************/
    const { email } = req.params;

    new CognitoUser({ Username: email, Pool: awsUserPool }).forgotPassword({
      onSuccess: () => {
        res.sendStatus(200);
      },
      onFailure: () => {
        res.sendStatus(500);
      },
    });
    /************* AUTH IN SERVER *************/
    /*const { email } = req.params;
    const db = getDbConnection("react-auth-db");
    const passwordResetCode = uuid();

    const { result } = await db
      .collection("users")
      .updateOne({ email }, { $set: { passwordResetCode } });

    if (result.nModified > 0) {
      try {
        await sendEmail({
          to: email,
          from: "bigtavadev@gmail.com",
          subject: "Password Reset",
          text: `
                        To reset your password, click this link:
                        http://localhost:3000/reset-password/${passwordResetCode}
                    `,
        });
        console.log("success");
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    }

    res.sendStatus(200);*/
  },
};
