import { Route } from "react-router-dom";
import SignIn from "../signin";
import { AuthUrl } from "./url";

export const AuthRoutes = (
  <Route>
    <Route path={AuthUrl.signIn} element={<SignIn />} />
  </Route>
);
