import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../Redux/Auth/authAction";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const dispatch = useDispatch();
  const { loading, error, message, user } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    username: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(loginUserAction(values));

        setSnackbarMessage(message || "Login successful!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        formik.resetForm();
      } catch (error) {
        setSnackbarMessage(
          error || "Login failed! Invalid username or password"
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  React.useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [error]);

  if (user) {
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
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: "white",
            textAlign: "center",
            mb: 4,
          }}
        >
          Welcome back, {user.fullName}!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/profile")}
        >
          Go to Profile
        </Button>
      </Box>
    );
  }

  return (
    <>
      {!user && (
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
        >
          <Button
            startIcon={<FiArrowLeft />}
            onClick={() => navigate(-1)}
            sx={{
              position: "absolute",
              top: 60,
              left: 20,
              padding: "8px",
              color: "rgb(156, 163, 175)",
            }}
          >
            Back
          </Button>

          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: "100%",
              maxWidth: "400px",
              backgroundColor: "rgb(31, 41, 55)",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                color: "white",
                textAlign: "center",
                mb: 4,
              }}
            >
              Login
            </Typography>

            <form onSubmit={formik.handleSubmit}>
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
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
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
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.5,
                  mb: 2,
                  backgroundColor: "rgb(59, 130, 246)",
                  "&:hover": { backgroundColor: "rgb(37, 99, 235)" },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </Button>

              <Typography
                variant="body2"
                sx={{
                  color: "rgb(156, 163, 175)",
                  textAlign: "center",
                  mt: 2,
                }}
              >
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "rgb(59, 130, 246)",
                    textDecoration: "none",
                  }}
                >
                  Register
                </Link>
              </Typography>
            </form>
          </Paper>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      )}
    </>
  );
};

export default Login;
