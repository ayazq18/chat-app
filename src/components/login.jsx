import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Icon } from "@iconify/react";
import { UserLogin } from "../context/instaDB";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await UserLogin(email, password);
      navigate("/chat");
      enqueueSnackbar("Login successful!", { variant: "success" });
    } catch (err) {
      setError(err.message);
      console.log(err);
      enqueueSnackbar("Enter correct credentials!", { variant: "error" });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          p: 2,
          borderRadius: 1,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Icon icon="line-md:chat" width={40} />

          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
        </Stack>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ width: "100%", mt: 1 }}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Stack direction="row" gap={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </Stack>
        </Box>
        {/* <Button
          type="button"
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button> */}
      </Box>
    </Container>
  );
};

export default Login;
