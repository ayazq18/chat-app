import React, { useState } from "react";
import { FaSmile, FaPlus } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { Stack, IconButton, Box } from "@mui/material";
import { addMessage } from "../context/instaDB";

// eslint-disable-next-line react/prop-types
const EmojiPickerComponent = ({ onEmojiSelect }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (event, emojiObject) => {
      console.log("Selected files:", emojiObject); // Handle the selected files here
    onEmojiSelect(emojiObject.target.currentSrc);
    setShowPicker(false);
  };
  
  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
        addMessage(selectedFiles[0].name)
    }
  };

  const handleFileManagerOpen = () => {
    document.getElementById("file-input").click();
  };

  return (
    <Stack direction="row" gap={2} alignItems="center">
      {/* Emoji Picker Button */}
      <IconButton
        onClick={() => setShowPicker(!showPicker)}
        sx={{ color: "gray" }}
      >
        <FaSmile size={24} />
      </IconButton>
      {showPicker && (
        <Box sx={{ position: "absolute", bottom: "60px", right: "20px" }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </Box>
      )}

      {/* File Manager Trigger */}
      <IconButton onClick={handleFileManagerOpen} sx={{ color: "gray" }}>
        <FaPlus size={22} />
      </IconButton>

      {/* Hidden File Input */}
      <input
        id="file-input"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileSelect}
        multiple
      />
    </Stack>
  );
};

export default EmojiPickerComponent;
