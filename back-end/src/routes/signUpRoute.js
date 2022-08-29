import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { getDbConnection } from "../db";
import { v4 as uuid } from "uuid";
import { sendEmail } from "../util/sendEmail";
import { awsUserPool } from "../util/awsUserPool";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    /************* AUTH IN AWS COGNITO *************/
    const { email, password } = req.body;

    const attributes = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];

    awsUserPool.signUp(
      email,
      password,
      attributes,
      null,
      async (err, awsResult) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Unable to sign up user" });
        }

        const db = getDbConnection("react-auth-db");

        const startingInfo = {
          hairColor: "",
          favoriteFood: "",
          bio: "",
        };

        const result = await db.collection("users").insertOne({
          email,
          info: startingInfo,
        });
        const { insertedId } = result;

        jwt.sign(
          {
            id: insertedId,
            isVerified: false,
            email,
            info: startingInfo,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          },
          (err, token) => {
            if (err) return res.sendStatus(500);
            res.status(200).json({ token });
          }
        );
      }
    );
    /************* AUTH IN SERVER *************/
    /*const { email, password } = req.body;

    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });

    if (user) {
      res.sendStatus(409);
    }
    const salt = uuid();
    const pepper = process.env.PEPPER_STRING;
    const passwordHash = await bcrypt.hash(salt + password + pepper, 10);

    const verificationString = uuid();

    const startingInfo = {
      hairColor: "",
      favoriteFood: "",
      bio: "",
    };

    const result = await db.collection("users").insertOne({
      email,
      passwordHash,
      salt,
      info: startingInfo,
      isVerified: false,
      verificationString,
    });
    const { insertedId } = result;

    try {
      await sendEmail({
        to: email,
        from: "bigtavadev@gmail.com",
        subject: "Please verify your email",
        text: `Thanks for signing up! To verify your email, click here: http://localhost:3000/verify-email/${verificationString}`,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }

    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({ token });
      }
    );*/
  },
};
