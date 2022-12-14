import bcrypt from "bcrypt";
import { getDbConnection } from "../db";
import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool";
export const resetPasswordRoute = {
  path: "/api/users/:passwordResetCode/reset-password",
  method: "put",
  handler: async (req, res) => {
    /************* AUTH IN AWS COGNITO *************/
    const { passwordResetCode } = req.params;
    const { email, newPassword } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool }).confirmPassword(
      passwordResetCode,
      newPassword,
      {
        onSuccess: () => {
          res.sendStatus(200);
        },
        onFailure: () => {
          res.sendStatus(401);
        },
      }
    );
    /************* AUTH IN SERVER *************/
    /*const { passwordResetCode } = req.params;
    const { newPassword } = req.body;

    const db = getDbConnection("react-auth-db");

    const newSalt = uuid();
    const pepper = process.env.PEPPER_STRING;

    const newPasswordHash = await bcrypt.hash(salt + newPassword + pepper, 10);

    const result = await db.collection("users").findOneAndUpdate(
      { passwordResetCode },
      {
        $set: { passwordHash: newPasswordHash, salt: newSalt },
        $unset: { passwordResetCode: "" },
      }
    );

    if (result.lastErrorObject.n === 0) return res.sendStatus(404);

    res.sendStatus(200);*/
  },
};
