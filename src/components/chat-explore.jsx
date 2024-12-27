import { Box, Button, TextField } from "@mui/material";
import React, {  useEffect, useState } from "react";
import ChatNavBar from "../smallComponent/chat-navBar";
import LiveChats from "../smallComponent/liveChats";
import { AiOutlineAudio } from "react-icons/ai";
import EmojiPickerComponent from "../smallComponent/emojiPicker";
import { BiSend } from "react-icons/bi";
import { addMessage } from "../context/instaDB";
import { saveMessagesToLocal } from "../context/indexedDB";

// eslint-disable-next-line react/prop-types
function ChatExplore({ sx }) {
  const [adjustWidth, setAdjustWidth] = useState("100vw");
  const [value, setValue] = useState("");


  useEffect(() => {
    const drawerClose = localStorage.getItem("drawerClose");
    setAdjustWidth(drawerClose === "false" ? "100vw" : "78vw");
  }, [setAdjustWidth]);

  const handleEmojiSelect = (emoji) => {
    setValue((prevValue) => prevValue + emoji);
  };

  return (
    <Box
      sx={{
        width: adjustWidth,
        ...sx,
      }}
    >
      <ChatNavBar sx={{ ...sx }} />

      <LiveChats sx={{ height: "80vh",}} />

      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          // bgcolor: "#fbddb0",
          borderRadius: "8px",
        }}
      >
        {/* Emoji Picker Component */}
        <EmojiPickerComponent onEmojiSelect={handleEmojiSelect} />

        {/* Input Form */}
        <form
          style={{ flex: 1, display: "flex", alignItems: "center" }}
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim()) {
              addMessage(value); // Use `value` directly to send the message
              saveMessagesToLocal(value)
              setValue(""); // Clear input after submitting
            }
          }}
        >
          {/* Message Input Field */}
          <TextField
        fullWidth
        placeholder="Type a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          height: "40px",
          "& .MuiInputBase-root": {
            height: "100%",
            padding: "0 14px",
          },
          "& .MuiOutlinedInput-root": {
            height: "100%",
            "& fieldset": {
              height: "100%",
              border: "1px solid #ccc",
              borderRadius: "20px",
            },
          },
          "& .MuiInputLabel-root": {
            top: "50%",
            left: "1%",
            transform: "translateY(-50%)",
            color: "gray",
          },
        }}
        InputProps={{
          readOnly: value.endsWith(".png"), // Make the field read-only when emoji is displayed
          startAdornment: value.endsWith(".png") ? (
            <img
              src={value}
              alt="emoji"
              style={{
                maxHeight: "24px",
                marginRight: "10px",
              }}
            />
          ) : null,
        }}
      />

          {/* Submit Button */}
          <Button
            type="submit"
            sx={{
              minWidth: "40px",
              height: "40px",
              bgcolor: "#4caf50",
              color: "#fff",
              borderRadius: "50%",
              padding: 0,
              ml: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BiSend size={20} style={{ transform: "rotate(-45deg)" }} />
          </Button>
        </form>

        {/* Audio Icon */}
        <AiOutlineAudio
          size={24}
          style={{ cursor: "pointer", color: "#333" }}
        />
      </Box>
    </Box>
  );
}

export default ChatExplore;
