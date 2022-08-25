import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CongnitoUser,
  CognitoUser,
} from "amazon-cognito-identity-js";
import { awsUserPool } from "../util/awsUserPool";

export const logInRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    /************* AUTH IN AWS COGNITO *************/
    const { email, password } = req.body;

    new CognitoUser({ Username: email, Pool: awsUserPool }).authenticateUser(
      new AuthenticationDetails({ Username: email, Password: password }),
      {
        onSuccess: async (result) => {
          const db = getDbConnection("react-auth-db");
          const user = await db.collection("users").findOne({ email });

          const { _id: id, isVerified, info } = user;

          jwt.sign(
            { id, isVerified, email, info },
            process.env.JWT_SECRET,
            { expiresIn: "2d" },
            (err, token) => {
              if (err) {
                res.sendStatus(500);
              }

              res.status(200).json({ token });
            }
          );
        },
        onFailure: (err) => {
          res.sendStatus(401);
        },
      }
    );

    /************* AUTH IN SERVER *************/
    /*const { email, password } = req.body;

    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });

    if (!user) return res.sendStatus(401);

    const { _id: id, isVerified, passwordHash, info } = user;

    const isCorrect = await bcrypt.compare(password, passwordHash);

    if (isCorrect) {
      jwt.sign(
        { id, isVerified, email, info },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            res.status(500).json(err);
          }

          res.status(200).json({ token });
        }
      );
    } else {
      res.sendStatus(401);
    }*/
  },
};
