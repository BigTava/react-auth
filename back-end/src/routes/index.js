import { signUpRoute } from "./signUpRoute";
import { testRoute } from "./testRoute";
import { logInRoute } from "./loginRoute";
import { updateUserInfoRoute } from "./updateUserRoute";
import { testEmailRoute } from "./testEmailRoute";
import { verifyEmailRoute } from "./verifyEmailRoute";
import { forgotPasswordRoute } from "./forgotPasswordRoute";

export const routes = [
  forgotPasswordRoute,
  verifyEmailRoute,
  updateUserInfoRoute,
  logInRoute,
  signUpRoute,
  testRoute,
];
