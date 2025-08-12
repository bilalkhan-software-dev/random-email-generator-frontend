import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction, registerUserAction } from "../Redux/Auth/authAction";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiArrowLeft,
} from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, message, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUserAction());
    navigate("/");
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "info",
  });

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    username: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      // .matches(
      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      // "Must contain uppercase, lowercase, number and special character"
      // )
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { confirmPassword, ...registrationData } = values;
        await dispatch(registerUserAction(registrationData));
        setSnackbar({
          open: true,
          message: message,
          severity: "success",
        });
        navigate("/");
        setTimeout(() => navigate("/"), 3000);

        setSubmitting(false);
      } catch (error) {
        console.log("Error: ", error);
        setSnackbar({
          open: true,
          message: error,
          severity: "error",
        });
        setSubmitting(false);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (user) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6" color="white">
          You are Successfully logged in!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/profile")}
          sx={{
            marginRight: 2,
          }}
        >
          Go to Profile
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "rgb(17, 24, 39)",
        p: 3,
      }}
      className="bg-gradient-to-b from-gray-800 to-gray-950/100 mt-4"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "rgb(31, 41, 59)",
          border: "4px solid",
          borderColor: "divider", // or use a specific color
          borderRadius: 4, // or "4px" or any value you prefer
        }}
        className="shadow-2xl"
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            textAlign: "center",
            mb: 4,
          }}
        >
          Create Account
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              id="fullName"
              name="fullName"
              label="Full Name"
              type="text"
              variant="outlined"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiUser color="rgb(156, 163, 175)" />
                  </InputAdornment>
                ),
                sx: {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(75, 85, 99)",
                  },
                },
              }}
              InputLabelProps={{
                sx: { color: "rgb(156, 163, 175)" },
              }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              id="username"
              name="username"
              label="Email"
              type="email"
              variant="outlined"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiMail color="rgb(156, 163, 175)" />
                  </InputAdornment>
                ),
                sx: {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(75, 85, 99)",
                  },
                },
              }}
              InputLabelProps={{
                sx: { color: "rgb(156, 163, 175)" },
              }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiLock color="rgb(156, 163, 175)" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "rgb(156, 163, 175)" }}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(75, 85, 99)",
                  },
                },
              }}
              InputLabelProps={{
                sx: { color: "rgb(156, 163, 175)" },
              }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiLock color="rgb(156, 163, 175)" />
                  </InputAdornment>
                ),
                sx: {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(75, 85, 99)",
                  },
                },
              }}
              InputLabelProps={{
                sx: { color: "rgb(156, 163, 175)" },
              }}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="outlined"
            disabled={formik.isSubmitting || loading}
            sx={{
              py: 1.5,
              mb: 2,
              "&:hover": { color: "white" },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>

          <Typography
            sx={{
              color: "rgb(156, 163, 175)",
              textAlign: "center",
              mt: 2,
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "rgb(59, 130, 246)",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </Typography>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
