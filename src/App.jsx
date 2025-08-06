import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RandomEmail from "./components/RandomEmail";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./Theme/darkTheme";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "./Redux/Auth/authAction";
import Profile from "./components/Profile/Profile";
const App = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      dispatch(userProfileAction());
    }
  }, [auth.token]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
        <Navbar />

        <main className="flex-grow pt-16">
          {" "}
          <div className="p-4">
            {" "}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/random-email" element={<RandomEmail />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
