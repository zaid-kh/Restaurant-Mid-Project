import "./App.css";
import { Auth } from "./components/Auth";
import { Route, Routes, Router, BrowserRouter } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import List from "./pages/menu/List";
import UserSuggest from "./pages/suggestion/UserSuggest";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="suggest" element={<UserSuggest />} />
          <Route path="menu-list" element={<List />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
