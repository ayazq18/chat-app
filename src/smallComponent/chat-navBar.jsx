import React, { useState } from "react";
import {
  Box,
  Button,
  CardContent,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import { FaEllipsisV } from "react-icons/fa";
import { useThemeContext } from "../context/ThemeContext";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { db } from "../context/instaDB";

// eslint-disable-next-line react/prop-types
function ChatNavBar({ sx }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const { toggleTheme, mode, receiverId } = useThemeContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
        navigate("/login");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  console.log('receiverId------->', receiverId)


  const query = {
    userLogin: {
      $: {
        where: {
          id: receiverId,
        },
      },
      user: {},
    },
  };
  const { data } = db.useQuery(query);

  const userEmail = data?.userLogin?.[0]?.email
  console.log('data------->', userEmail)

  return (
    <Box
      sx={{
        pl: 3,
        pr: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0px 4px 8px rgba(211, 211, 211, 0.5)",
        bgcolor: "#f0f2f5",
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", maxWidth: 600 }}>
        <Box
          component="div"
          sx={{
            border: "1px solid rgba(128, 128, 128, 0.2)",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "25px",
              fontWeight: "700",
              bgcolor: "#fbddb0",
              p: 1,
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              textAlign: "center",
            }}
          >
            {userEmail?.charAt(0).toUpperCase()}
          </Typography>
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              maxWidth="200px"
            >
              {userEmail}
            </Typography>
          </CardContent>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === "light" ? (
            <Icon
              icon="token-branded:sun"
              style={{ fontSize: "40px", cursor: "pointer" }}
            />
          ) : (
            <Icon
              icon="token-branded:moon"
              style={{ fontSize: "40px", cursor: "pointer" }}
            />
          )}
        </IconButton>

        <FaEllipsisV
          size={18}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box sx={{ p: 2 }}>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
}

export default ChatNavBar;
