import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark", // This sets the overall theme to dark mode
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
  },
  components: {
    // Tooltip styles (existing)
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#121212",
          color: "#ffffff",
          fontSize: "0.875rem",
          border: "1px solid #333",
        },
        arrow: {
          color: "#121212",
        },
      },
    },
    // New Snackbar styles
    MuiSnackbar: {
      styleOverrides: {
        root: {
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#121212", // Dark background
            color: "#ffffff", // White text
            fontSize: "0.875rem",
            border: "1px solid #333",
          },
        },
      },
    },
    // Style for different severity levels
    // MuiAlert: {
    //   styleOverrides: {
    //     root: ({ ownerState }) => ({
    //       ...(ownerState.severity === "error" && {
    //         backgroundColor: "#2d0000",
    //       }),
    //       ...(ownerState.severity === "success" && {
    //         backgroundColor: "#002d00",
    //       }),
    //       ...(ownerState.severity === "info" && {
    //         backgroundColor: "#00002d",
    //       }),
    //       ...(ownerState.severity === "warning" && {
    //         backgroundColor: "#2d2d00",
    //       }),
    //     }),
    //   },
    // },
  },
});
