import { signUpRoute } from "./signUpRoute";
import { testRoute } from "./testRoute";
import { logInRoute } from "./loginRoute";
import { updateUserInfoRoute } from "./updateUserRoute";
import { testEmailRoute } from "./testEmailRoute";
import { verifyEmailRoute } from "./verifyEmailRoute";
import { forgotPasswordRoute } from "./forgotPasswordRoute";
import { resetPasswordRoute } from "./resetPasswordRoute";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthUrlRoute";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute";

export const routes = [
  resetPasswordRoute,
  getGoogleOauthUrlRoute,
  googleOauthCallbackRoute,
  forgotPasswordRoute,
  verifyEmailRoute,
  updateUserInfoRoute,
  logInRoute,
  signUpRoute,
  testRoute,
];
