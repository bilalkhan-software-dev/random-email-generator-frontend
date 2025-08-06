import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
  TextField,
  CircularProgress,
  Pagination,
  Chip,
} from "@mui/material";
import {
  FiCopy,
  FiSave,
  FiRefreshCw,
  FiDownload,
  FiFilter,
  FiInfo,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomByCategoryAction } from "../Redux/Email/emailAction";
import {
  filteredRandomGeneratedEmail,
  saveUserEmailAction,
} from "../Redux/User/userAction";

const validationSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  length: Yup.number()
    .min(1, "Minimum 1 email")
    .max(1000, "Maximum 1000 emails")
    .required("Length is required"),
});

const RandomEmail = () => {
  const dispatch = useDispatch();
  const { auth, email, user } = useSelector((store) => store);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [page, setPage] = useState(1);
  const [generationMode, setGenerationMode] = useState("normal");
  const rowsPerPage = 20;
  let generatedEmails = email?.emails?.email || [];

  if (auth.user && generationMode === "filtered") {
    generatedEmails = user.emails?.email || [];
  }

  const isLoading = email?.loading;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (values.length > 1000) {
        setSnackbarMessage("Maximum 1000 emails allowed");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      if (auth.user && generationMode === "filtered") {
        await dispatch(
          filteredRandomGeneratedEmail(values.category, values.length)
        );
      } else {
        await dispatch(
          generateRandomByCategoryAction(values.category, values.length)
        );
      }
      setPage(1);
    } catch (error) {
      console.error("Error generating emails:", error);
      setSnackbarMessage(
        error.response?.data?.message || "Error generating emails"
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email);
    setSnackbarMessage("Copied to clipboard!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const copyAllEmails = () => {
    if (generatedEmails.length === 0) {
      setSnackbarMessage("No emails to copy");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    const emailText = generatedEmails.map((e) => e.email).join(", ");
    navigator.clipboard.writeText(emailText);
    setSnackbarMessage("All emails copied to clipboard!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const downloadAllEmails = () => {
    if (generatedEmails.length === 0) {
      setSnackbarMessage("No emails to download");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    const emailText = generatedEmails.map((e) => e.email).join("\n");
    const blob = new Blob([emailText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `emails_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSnackbarMessage("Download started!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const saveEmail = async (email) => {
    console.log("Saving email:", email.email);
    if (!auth.user) {
      setSnackbarMessage("Please login to save emails");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    await dispatch(saveUserEmailAction(email.email));

    if (user.message) {
      setSnackbarMessage("Email saved successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      return;
    }

    if (user.error) {
      setSnackbarMessage("Error saving email");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const paginatedEmails = generatedEmails.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        backgroundColor: "rgb(17, 24, 39)",
        color: "rgb(229, 231, 235)",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "white", mb: 2 }}>
        Random Email Generator
        {auth.user && (
          <Chip
            label={
              generationMode === "filtered" ? "Filtered Mode" : "Normal Mode"
            }
            color={generationMode === "filtered" ? "success" : "primary"}
            size="small"
            sx={{ ml: 2, height: 24 }}
          />
        )}
      </Typography>

      <Card sx={{ mb: 3, backgroundColor: "rgb(31, 41, 55)" }}>
        <CardContent>
          <Formik
            initialValues={{ category: "pakistani_boys", length: 10 }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldValue,
              isSubmitting,
            }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      error={touched.category && !!errors.category}
                    >
                      <InputLabel sx={{ color: "rgb(209, 213, 219)" }}>
                        Select a Category
                      </InputLabel>
                      <Field
                        as={Select}
                        name="category"
                        label="Select a Category"
                        value={values.category}
                        onChange={handleChange}
                        sx={{
                          color: "white",
                          "& .MuiSelect-icon": { color: "rgb(209, 213, 219)" },
                        }}
                      >
                        <MenuItem value="pakistani_boys">
                          Pakistani Boys
                        </MenuItem>
                        <MenuItem value="pakistani_girls">
                          Pakistani Girls
                        </MenuItem>
                        <MenuItem value="pakistani_boys_and_girls">
                          Pakistani Boys & Girls
                        </MenuItem>
                        <MenuItem value="indian_boys">Indian Boys</MenuItem>
                        <MenuItem value="indian_girls">Indian Girls</MenuItem>
                        <MenuItem value="indian_boys_and_girls">
                          Indian Boys & Girls
                        </MenuItem>
                      </Field>
                      {touched.category && errors.category && (
                        <FormHelperText>{errors.category}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          sx={{ color: "rgb(209, 213, 219)" }}
                        >
                          Number of Emails
                        </Typography>
                        <Slider
                          name="length"
                          value={values.length}
                          onChange={(e, newValue) =>
                            setFieldValue("length", newValue)
                          }
                          min={1}
                          max={1000}
                          step={1}
                          marks={[
                            { value: 1, label: "1" },
                            { value: 250, label: "250" },
                            { value: 500, label: "500" },
                            { value: 750, label: "750" },
                            { value: 1000, label: "1000" },
                          ].map((mark) => ({
                            ...mark,
                            label: (
                              <Tooltip
                                title={`Generate ${mark.value} emails`}
                                arrow
                                placement="top"
                              >
                                <span>{mark.label}</span>
                              </Tooltip>
                            ),
                          }))}
                          sx={{
                            color: "rgb(59, 130, 246)",
                            "& .MuiSlider-markLabel": {
                              color: "rgb(156, 163, 175)",
                            },
                          }}
                        />
                      </Box>
                      <TextField
                        type="number"
                        name="length"
                        value={values.length}
                        onChange={handleChange}
                        onBlur={(e) => {
                          let val = parseInt(e.target.value);
                          if (isNaN(val)) val = 1;
                          if (val < 1) val = 1;
                          if (val > 1000) val = 1000;
                          setFieldValue("length", val);
                        }}
                        inputProps={{
                          min: 1,
                          max: 1000,
                          step: 1,
                        }}
                        sx={{
                          width: 100,
                          "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& fieldset": {
                              borderColor: "rgb(75, 85, 99)",
                            },
                            "&:hover fieldset": {
                              borderColor: "rgb(59, 130, 246)",
                            },
                          },
                        }}
                        error={touched.length && !!errors.length}
                        helperText={touched.length && errors.length}
                      />
                    </Box>
                  </Grid>

                  {auth.user && (
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Tooltip title="Generate completely random emails">
                          <Button
                            variant={
                              generationMode === "normal"
                                ? "contained"
                                : "outlined"
                            }
                            onClick={() => setGenerationMode("normal")}
                            startIcon={<FiRefreshCw />}
                            sx={{
                              flex: 1,
                              backgroundColor:
                                generationMode === "normal"
                                  ? "rgb(59, 130, 246)"
                                  : "transparent",
                              color:
                                generationMode === "normal"
                                  ? "white"
                                  : "rgb(209, 213, 219)",
                              "&:hover": {
                                backgroundColor:
                                  generationMode === "normal"
                                    ? "rgb(37, 99, 235)"
                                    : "rgba(59, 130, 246, 0.08)",
                              },
                            }}
                          >
                            Normal
                            <Box
                              component="span"
                              sx={{ ml: 1, display: "inline-flex" }}
                            >
                              <FiInfo />
                            </Box>
                          </Button>
                        </Tooltip>

                        <Tooltip title="Generate emails filtered by your save emails">
                          <Button
                            variant={
                              generationMode === "filtered"
                                ? "contained"
                                : "outlined"
                            }
                            onClick={() => setGenerationMode("filtered")}
                            startIcon={<FiFilter />}
                            sx={{
                              flex: 1,
                              backgroundColor:
                                generationMode === "filtered"
                                  ? "rgb(16, 185, 129)"
                                  : "transparent",
                              color:
                                generationMode === "filtered"
                                  ? "white"
                                  : "rgb(209, 213, 219)",
                              "&:hover": {
                                backgroundColor:
                                  generationMode === "filtered"
                                    ? "rgb(5, 150, 105)"
                                    : "rgba(16, 185, 129, 0.08)",
                              },
                            }}
                          >
                            Filtered
                            <Box
                              component="span"
                              sx={{ ml: 1, display: "inline-flex" }}
                            >
                              <FiInfo />
                            </Box>
                          </Button>
                        </Tooltip>
                      </Box>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={
                        isSubmitting ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : generationMode === "filtered" ? (
                          <FiFilter />
                        ) : (
                          <FiRefreshCw />
                        )
                      }
                      disabled={isSubmitting}
                      sx={{
                        minWidth: 200,
                        backgroundColor:
                          generationMode === "filtered"
                            ? "rgb(16, 185, 129)"
                            : "rgb(59, 130, 246)",
                        "&:hover": {
                          backgroundColor:
                            generationMode === "filtered"
                              ? "rgb(5, 150, 105)"
                              : "rgb(37, 99, 235)",
                        },
                      }}
                    >
                      {isSubmitting
                        ? "Generating..."
                        : generationMode === "filtered"
                        ? "Generate Filtered"
                        : "Generate Normal"}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        generatedEmails.length > 0 && (
          <>
            <Card sx={{ backgroundColor: "rgb(31, 41, 55)" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "white" }}>
                    Generated Emails (
                    {email.emails?.totalEmailGenerated ||
                      generatedEmails.length}
                    )
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Tooltip title="Download all emails as text file">
                      <Button
                        variant="outlined"
                        startIcon={<FiDownload />}
                        onClick={downloadAllEmails}
                        sx={{
                          color: "white",
                          borderColor: "rgb(59, 130, 246)",
                          "&:hover": {
                            borderColor: "rgb(37, 99, 235)",
                            backgroundColor: "rgba(59, 130, 246, 0.08)",
                          },
                        }}
                      >
                        Download
                      </Button>
                    </Tooltip>
                    <Tooltip title="Copy all emails to clipboard">
                      <Button
                        variant="outlined"
                        startIcon={<FiCopy />}
                        onClick={copyAllEmails}
                        sx={{
                          color: "white",
                          borderColor: "rgb(59, 130, 246)",
                          "&:hover": {
                            borderColor: "rgb(37, 99, 235)",
                            backgroundColor: "rgba(59, 130, 246, 0.08)",
                          },
                        }}
                      >
                        Copy All
                      </Button>
                    </Tooltip>
                    {generatedEmails.length > rowsPerPage && (
                      <Pagination
                        count={Math.ceil(generatedEmails.length / rowsPerPage)}
                        page={page}
                        onChange={(e, newPage) => setPage(newPage)}
                        color="primary"
                        sx={{
                          "& .MuiPaginationItem-root": {
                            color: "white",
                          },
                        }}
                      />
                    )}
                  </Box>
                </Box>

                <TableContainer
                  component={Paper}
                  sx={{ backgroundColor: "rgb(55, 65, 81)" }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "rgb(209, 213, 219)",
                            fontWeight: "bold",
                            width: "70%",
                          }}
                        >
                          Email Address
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color: "rgb(209, 213, 219)",
                            fontWeight: "bold",
                            width: "30%",
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedEmails.map((email, index) => (
                        <TableRow key={index} hover>
                          <TableCell
                            sx={{
                              color: "rgb(229, 231, 235)",
                              fontFamily: "monospace",
                            }}
                          >
                            {email.email}
                          </TableCell>
                          <TableCell align="right">
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              <Tooltip title="Copy" arrow>
                                <IconButton
                                  onClick={() => copyToClipboard(email.email)}
                                  sx={{
                                    color: "rgb(59, 130, 246)",
                                    "&:hover": {
                                      backgroundColor:
                                        "rgba(59, 130, 246, 0.1)",
                                    },
                                  }}
                                >
                                  <FiCopy />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Save to your account" arrow>
                                <IconButton
                                  onClick={() => saveEmail(email)}
                                  sx={{
                                    color: "rgb(59, 130, 246)",
                                    "&:hover": {
                                      backgroundColor:
                                        "rgba(59, 130, 246, 0.1)",
                                    },
                                  }}
                                >
                                  <FiSave />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3, backgroundColor: "rgb(31, 41, 55)" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ color: "white" }}>
                    All Emails as Text
                  </Typography>
                  <Tooltip title="Copy all emails" arrow>
                    <IconButton
                      onClick={copyAllEmails}
                      sx={{ color: "rgb(59, 130, 246)" }}
                    >
                      <FiCopy />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: "rgb(55, 65, 81)",
                    color: "rgb(229, 231, 235)",
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                    maxHeight: 300,
                    overflow: "auto",
                    border: "1px solid rgb(75, 85, 99)",
                    borderRadius: "4px",
                  }}
                >
                  {generatedEmails.map((e, i) => (
                    <div key={i}>
                      {e.email}
                      {i < generatedEmails.length - 1 && <br />}
                    </div>
                  ))}
                </Paper>
              </CardContent>
            </Card>
          </>
        )
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
  );
};

export default RandomEmail;
