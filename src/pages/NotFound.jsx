import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import { FiHome, FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "rgb(17, 24, 39)", // bg-gray-900
        color: "rgb(229, 231, 235)", // text-gray-200
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "6rem",
          fontWeight: "bold",
          mb: 2,
          color: "rgb(239, 68, 68)", // text-red-500
        }}
      >
        404
      </Typography>

      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: "white",
        }}
      >
        Oops! Page Not Found
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          maxWidth: "500px",
          color: "rgb(156, 163, 175)", // text-gray-400
        }}
      >
        The page you're looking for doesn't exist or has been moved.
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<FiArrowLeft />}
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: "rgb(59, 130, 246)", // bg-blue-600
            "&:hover": { bgcolor: "rgb(37, 99, 235)" }, // hover:bg-blue-700
          }}
        >
          Go Back
        </Button>

        <Button
          variant="outlined"
          startIcon={<FiHome />}
          onClick={() => navigate("/")}
          sx={{
            color: "rgb(59, 130, 246)", // text-blue-500
            borderColor: "rgb(59, 130, 246)", // border-blue-500
            "&:hover": {
              borderColor: "rgb(37, 99, 235)", // hover:border-blue-600
            },
          }}
        >
          Go Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
