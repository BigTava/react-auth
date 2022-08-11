import { signUpRoute } from "./signUpRoute";
import { testRoute } from "./testRoute";
import { logInRoute } from "./loginRoute";
import { updateUserInfoRoute } from "./updateUserRoute";
import { testEmailRoute } from "./testEmailRoute";
import { verifyEmailRoute } from "./verifyEmailRoute";

export const routes = [
  verifyEmailRoute,
  updateUserInfoRoute,
  logInRoute,
  signUpRoute,
  testRoute,
];
