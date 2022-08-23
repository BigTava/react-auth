import { signUpRoute } from "./signUpRoute";
import { testRoute } from "./testRoute";
import { logInRoute } from "./loginRoute";
import { updateUserInfoRoute } from "./updateUserRoute";
import { testEmailRoute } from "./testEmailRoute";
import { verifyEmailRoute } from "./verifyEmailRoute";
import { forgotPasswordRoute } from "./forgotPasswordRoute";
import { resetPasswordRoute } from "./resetPasswordRoute";

export const routes = [
  resetPasswordRoute,
  forgotPasswordRoute,
  verifyEmailRoute,
  updateUserInfoRoute,
  logInRoute,
  signUpRoute,
  testRoute,
];
