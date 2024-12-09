import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ textAlign: "center", backgroundColor: "#f9f9f9" }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to HRC
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/login")}
        sx={{ mt: 3 }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default Welcome;
