import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Paper } from "@mui/material";
import { FiMail, FiLogIn, FiUserPlus } from "react-icons/fi";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 mt-8">
      {/* Hero Section */}
      <div className="bg-gray-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            className="text-white"
          >
            Email Generator
          </Typography>
          <Typography variant="h6" component="h2" className="text-gray-300">
            Create random emails for your testing needs
          </Typography>
        </div>
      </div>

      {/* Get Started Section */}
      <div className="max-w-2xl mx-auto px-4 py-10 bg-gray-900 rounded-lg shadow-lg">
        <div className="p-8 text-center bg-gray-800">
          <FiMail className="mx-auto text-5xl mb-4 text-blue-400" />
          <Typography variant="h5" gutterBottom className="text-gray-100">
            Ready to Generate Emails?
          </Typography>
          <Typography variant="body1" className="mb-6 text-gray-400">
            Get started by creating your first random email address.
          </Typography>

          {!auth?.user && (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<FiLogIn />}
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600"
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<FiUserPlus />}
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto border-blue-400 text-blue-400 hover:border-blue-300 hover:text-blue-300"
              >
                Register
              </Button>
            </div>
          )}

          {!auth?.user && (
            <Typography variant="body2" className="mt-8 text-gray-400">
              No account required to generate test emails
            </Typography>
          )}
          {auth?.user && (
            <Typography variant="body2" className="mt-8 text-gray-400">
              You are logged in successfully. Now you can generate filtered
              emails that saved by you
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
