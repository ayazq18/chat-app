import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Stack, Container } from "@mui/material";
import { db } from "../context/instaDB";
import { useThemeContext } from "../context/ThemeContext";
import EmptyContent from "../reUsabel/empty-content";

function LiveChats({ sx }) {
  const { senderId } = useThemeContext();
  if (!senderId) {
    return (
      <Box sx={{ width: "100%", height: "100%", ...sx }}>
        <EmptyContent
          title="No Chats!"
          imgUrl="/assets/icons/ic_folder_empty.svg"
        />
      </Box>
    );
  }

  // const query = {
  //   messages: {
  //     $: {
  //       where: {
  //         id: '08b5390f-c2d2-45a2-80a8-a3b10ba16ce6',
  //       },
  //     },
  //     messages: {},
  //   },
  // };

  const { isLoading, error, data } = db.useQuery({ messages: {} });
  if (isLoading) return <div>Fetching data...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;
  const { messages } = data;

  const sortedMessages = messages?.sort(
    (a, b) =>
      // @ts-expect-error
      new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <Container
      sx={{
        overflowY: "scroll",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        bgcolor: "#efeae2",
        ...sx,
      }}
    >
      {sortedMessages.length > 0 ? (
        sortedMessages?.map((message, index) => (
          <Stack
            key={index}
            spacing={2}
            direction="column"
            justifyContent="space-between"
            sx={{ mb: 2, mt: 2 }}
          >
            <Box display="flex" justifyContent="flex-end">
              <Box
                elevation={3}
                sx={{
                  p: 1,
                  bgcolor: !message.text.endsWith(".png") && "#DCF8C6",
                  maxWidth: "75%",
                  borderRadius:
                    !message.text.endsWith(".png") && "10px 0 10px 10px",
                }}
              >
                <Typography variant="body1" color="#000000">
                  {message.text.endsWith(".png") ? (
                    <img
                      src={message.text}
                      alt="emoji"
                      style={{ maxHeight: "24px" }}
                    />
                  ) : (
                    message.text
                  )}
                </Typography>
              </Box>
            </Box>
            {/* <Box display="flex" justifyContent="flex-start">
            <Paper
              elevation={3}
              sx={{
                p: 1,
                bgcolor: "#FFFFFF",
                maxWidth: "75%",
                borderRadius: "0 10px 10px 10px",
              }}
            >
              <Typography variant="body1" color="#000000">
                {message.you}
              </Typography>
            </Paper>
          </Box> */}
          </Stack>
        ))
      ) : (
        <Box sx={{ width: "100%", height: "100%", ...sx }}>
          <EmptyContent
            title="No Chats!"
            imgUrl="/assets/icons/ic_folder_empty.svg"
          />
        </Box>
      )}
    </Container>
  );
}

export default LiveChats;

LiveChats.propTypes = {
  sx: PropTypes.object,
};
