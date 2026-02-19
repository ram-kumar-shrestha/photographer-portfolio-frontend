import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./modules/auth/signin/sign-in";
import { AuthRoutes } from "./modules/auth/utils/route";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        {AuthRoutes}
      </Routes>
    </Router>
  );
}

export default App;
