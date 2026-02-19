import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./modules/auth/signin/sign-in";
import { AuthRoutes } from "./modules/auth/utils/route";
import { AlbumRoutes } from "./modules/albums/utils/route";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        {AuthRoutes}
        {AlbumRoutes}
      </Routes>
    </Router>
  );
}

export default App;
