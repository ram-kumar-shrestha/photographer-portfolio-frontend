import { Route } from "react-router-dom";
import ForgotPassword from "../forgot-password/forgot-password";
import ResetPassword from "../reset-password/reset-password";
import SignIn from "../signin/sign-in";
import SignUp from "../signup/sign-up";
import { AuthUrl } from "./url";

export const AuthRoutes = (
  <Route>
    <Route path={AuthUrl.signIn} element={<SignIn />} />
    <Route path={AuthUrl.signUp} element={<SignUp />} />
    <Route path={AuthUrl.forgotPassword} element={<ForgotPassword />} />
    <Route path={AuthUrl.resetPassword} element={<ResetPassword />} />
  </Route>
);
