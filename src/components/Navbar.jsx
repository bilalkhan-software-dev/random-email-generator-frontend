import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, Box, Avatar, Typography } from "@mui/material";
import {
  FiMail,
  FiChevronDown,
  FiHome,
  FiLogIn,
  FiUserPlus,
  FiLogOut,
  FiUser,
  FiSettings,
} from "react-icons/fi";
import { SiGmail } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../Redux/Auth/authAction";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logoutUserAction());
    navigate("/");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "fixed", // Make navbar fixed
        width: "100%", // Full width
        top: 0, // Stick to top
        left: 0, // Align left
        zIndex: 1100, // Ensure it's above other content
      }}
    >
      <nav className="bg-gradient-to-r from-gray-800 to-gray-950/100 shadow-lg mb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Brand and Navigation */}
            <div className="flex items-center space-x-4">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <SiGmail className="text-white text-2xl" />
                <span className="text-white font-bold text-xl hidden sm:inline">
                  Email Generator
                </span>
              </div>

              <Button
                startIcon={<FiHome />}
                color="inherit"
                className="text-white hover:bg-blue-700"
                onClick={() => navigate("/")}
              >
                <span className="hidden md:inline">Home</span>
              </Button>

              <Button
                startIcon={<FiMail />}
                color="inherit"
                className="text-white hover:bg-blue-700"
                onClick={() => navigate("/random-email")}
              >
                <span className="hidden md:inline">Generate Emails</span>
              </Button>
            </div>

            {/* Right side - Auth Buttons or User Profile */}
            <div className="flex items-center space-x-2">
              {auth?.user ? (
                <>
                  <Button
                    color="inherit"
                    onClick={handleMenuClick}
                    startIcon={
                      <Avatar
                        sx={{ width: 24, height: 24 }}
                        src={auth.user.profilePicture}
                        alt={auth.user.fullName}
                        className="bg-gradient-to-r from-blue-500 to-blue-900 font-bold"
                      >
                        {auth.user.fullName?.charAt(0)}
                      </Avatar>
                    }
                    endIcon={<FiChevronDown />}
                    sx={{ color: "white" }}
                  >
                    <Typography variant="body1" className="hidden md:inline">
                      {auth.user.fullName}
                    </Typography>
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate("/profile");
                      }}
                    >
                      <FiUser style={{ marginRight: 8 }} /> Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate("/settings");
                      }}
                    >
                      <FiSettings style={{ marginRight: 8 }} /> Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <FiLogOut style={{ marginRight: 8 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<FiLogIn />}
                    color="inherit"
                    className="border-white text-white hover:bg-blue-700"
                    onClick={() => navigate("/login")}
                    sx={{ marginRight: 1 }}
                  >
                    <span className="hidden sm:inline">Login</span>
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<FiUserPlus />}
                    color="secondary"
                    className="bg-purple-500 hover:bg-purple-600"
                    onClick={() => navigate("/register")}
                  >
                    <span className="hidden sm:inline">Register</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </Box>
  );
};

export default Navbar;
