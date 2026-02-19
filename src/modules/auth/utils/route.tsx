import { Route } from "react-router-dom";
import SignIn from "../signin";
import SignUp from "../signup/sign-up";
import { AuthUrl } from "./url";

export const AuthRoutes = (
  <Route>
    <Route path={AuthUrl.signIn} element={<SignIn />} />
    <Route path={AuthUrl.signUp} element={<SignUp />} />
  </Route>
);
