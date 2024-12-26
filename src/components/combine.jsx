import { Box } from "@mui/material";
import React, { useState } from "react";
import ActivityTabs from "./tabs";
import Chats from "./chats";
import ChatExplore from "./chat-explore";
import Status from "./status";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import Channels from "./channels";
import Communities from "./communities";

function Combine() {
  const { tabName } = useParams();

  const [activeTab, setActiveTab] = useState(tabName || "chat");
  const theme = useTheme();

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box display="flex" gap={0}>
      <ActivityTabs
        onTabChange={handleTabChange}
        theme={theme}
        sx={{
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      />

      {activeTab === "chat" && (
        <Chats
          theme={theme}
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        />
      )}
      {activeTab === "status" && (
        <Status
          theme={theme}
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        />
      )}
      {activeTab === "channels" && (
        <Channels
          theme={theme}
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        />
      )}
      {activeTab === "communities" && (
        <Communities
          theme={theme}
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        />
      )}
      <ChatExplore
        theme={theme}
        sx={{
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      />
    </Box>
  );
}

export default Combine;
