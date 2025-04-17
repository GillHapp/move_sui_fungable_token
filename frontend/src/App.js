import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import TokenForm from "./components/TokenForm";
import TokenList from "./components/TokenList";

function App() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [refreshTokens, setRefreshTokens] = useState(false);
  const [deployerAddress, setDeployerAddress] = useState("");

  useEffect(() => {
    // Optionally load address from localStorage or wallet connect
    const stored = localStorage.getItem("deployerAddress");
    if (stored) setDeployerAddress(stored);
  }, []);

  const handleSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Sui Custom Token Generator
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <TokenForm
          onSuccess={() => setRefreshTokens((r) => !r)}
          onSnackbar={handleSnackbar}
          deployerAddress={deployerAddress}
          setDeployerAddress={setDeployerAddress}
        />
      </Paper>
      <Box mt={4}>
        <TokenList
          refresh={refreshTokens}
          deployerAddress={deployerAddress}
          onSnackbar={handleSnackbar}
        />
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
