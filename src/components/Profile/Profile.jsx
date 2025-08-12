import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Chip,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import { FiMail, FiUser, FiCopy } from "react-icons/fi";
import { fetchUserSavedEmailAction } from "../../Redux/User/userAction";
import { format, parseISO } from "date-fns";

const Profile = () => {
  const dispatch = useDispatch();
  const { auth, user } = useSelector((state) => state);
  console.log("User email data:", user.userSavedEmails);

  useEffect(() => {
    if (auth.user) {
      dispatch(fetchUserSavedEmailAction());
    }
  }, [dispatch, auth.user]); // Added dependencies to useEffect

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email);
    // You might want to add a snackbar notification here
  };

  if (!auth.user) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">Please login to view your profile</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        mt: 4,
        minHeight: "100vh",
        backgroundColor: "rgb(17, 24, 39)",
        color: "white",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        User Profile
      </Typography>

      <Paper sx={{ p: 3, mb: 3, backgroundColor: "rgb(31, 41, 55)" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FiUser size={24} style={{ marginRight: 16 }} />
          <Typography variant="h6">{auth.user.fullName}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FiMail size={24} style={{ marginRight: 16 }} />
          <Typography variant="h6">{auth.user.username}</Typography>
        </Box>

        <Chip
          label={`${
            user?.userSavedEmails?.totalEmailGenerated || 0
          } saved emails`}
          color="primary"
          sx={{ mt: 1 }}
        />
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Saved Emails
      </Typography>

      {user?.loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : user?.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {user.error}
        </Alert>
      ) : !user?.userSavedEmails?.totalEmailGenerated < 0 ? ( // Fixed the check for empty array
        <Typography>No saved emails yet</Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "rgb(31, 41, 55)" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Email Address
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Date Saved
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.userSavedEmails?.email?.map((email, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "white" }}>{email.email}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {format(parseISO(email.createdAt), "MMM dd yyyy, h:mm a")}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Copy email">
                      <IconButton
                        onClick={() => copyToClipboard(email.email)}
                        sx={{ color: "rgb(59, 130, 246)" }}
                      >
                        <FiCopy />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Profile;
