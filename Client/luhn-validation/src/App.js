import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
// import HomePage from "scenes/homePage";
import LoginPage from "./components/Login/index.jsx";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import HomePage from "./components/HomePage/index.jsx";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline/>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/home" element={isAuth ? <HomePage/> : <Navigate to="/"/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
