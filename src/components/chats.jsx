import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  CardContent,
  TextField,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";

import SvgColor from "../reUsabel/svg-color/svg-color";
import { db } from "../context/instaDB";
import { useThemeContext } from "../context/ThemeContext";

const icon = (name) => <SvgColor src={`/assets/images/${name}.svg`} />;

export const TABS = [
  {
    value: "all",
    label: "All",
    icon: icon("allChats"),
  },
  {
    value: "unread",
    label: "Unread",
    icon: icon("unread"),
  },
  {
    value: "groups",
    label: "Groups",
    icon: icon("groups"),
  },
];

// eslint-disable-next-line react/prop-types
function Chats({sx}) {


  const { setSenderId, setReceiverId } = useThemeContext()

  const [isDrawerOpen, setIsDrawerOpen] = useState(() => {
    const localData = localStorage.getItem("drawerClose");
    return localData === null ? true : JSON.parse(localData);
  });
  
  const [currentTab, setCurrentTab] = useState(() => {
    const localData = localStorage.getItem("filterChats");
    if (localData) return localData;

    return "all";
  });

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
    localStorage.setItem("filterChats", newValue);
  }, []);
  
  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
    localStorage.setItem("drawerClose", open);
  };

  const query = { userLogin: {} };
  const { isLoading, error, data } = db.useQuery(query);


  const filteredUser = data?.userLogin?.filter(item => localStorage.getItem('loggedInUser') === item.email)
  const myId = filteredUser?.[0]?.id 

  setSenderId(myId)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }

  return (
    data.userLogin && (
      <Box
        sx={{
          width: `${isDrawerOpen ? "23vw" : "0vw"}`,
          zIndex: "9999",
          borderRadius: "0",
          ...sx
        }}
      >
        <Card sx={{ position: "relative", p: 1, width: "100%", }}>
          {isDrawerOpen ? (
            <IconButton
              sx={{
                position: "absolute",
                right: "18px",
                top: "10px",
                border: "1px solid gray",
                p: 0,
                zIndex: "1111",
                bgcolor:'#000000',
                color:'#fff'
              }}
              onClick={() => toggleDrawer(false)}
            >
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton
              sx={{
                position: "absolute",
                right: "-5px",
                top: "12px",
                border: "1px solid gray",
                p: 0,
                zIndex: "111111111",
                bgcolor:'#000000',
                color:'#fff'
              }}
              onClick={() => toggleDrawer(true)}
            >
              <ChevronRightIcon />
            </IconButton>
          )}

          <Box>
            <Typography variant="h6" mb={2}>
              Chats
            </Typography>
            <TextField
              variant="outlined"
              placeholder={isDrawerOpen && "Search..."}
              fullWidth
              // sx={{ bgcolor: '#f0f2f5' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "100px",
                  },
                },
              }}
            />

            <Tabs
              value={currentTab}
              onChange={handleChangeTab}
              sx={{
                width: 1,
                bottom: 0,
                zIndex: 9,
                mt: 1,
                borderRadius: 1,
                bgcolor: "#fbddb0",
              }}
            >
              {TABS.map((tab) => (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={tab.label}
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: "#fb5",
                      border:'1px solid black'
                    },
                    "&.Mui-selected .MuiTab-iconWrapper": {
                      bgcolor: "primary.main",
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  }}
                />
              ))}
            </Tabs>

            <Box
              sx={{
                maxHeight: 465,
                overflowY: "scroll",
                "::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {data?.userLogin?.map((item, index) => localStorage.getItem('loggedInUser') !== item?.email && (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(128, 128, 128, 0.2)",
                    maxWidth: 600,
                    mt: 2,
                    cursor: "pointer",
                  }}
                  onClick={()=>{setReceiverId(item.id)}}
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
                    {item?.email?.charAt(0).toUpperCase()}
                  </Typography>

                  {isDrawerOpen && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <CardContent>
                        {/* <Typography variant="h6" sx={{ fontSize: "15px" }}>
                        {item.displayName}
                      </Typography> */}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          overflow="hidden"
                          whiteSpace="nowrap"
                          textOverflow="ellipsis"
                          maxWidth="200px"
                        >
                          {item.email}
                        </Typography>
                      </CardContent>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
      </Box>
    )
  );
}

export default Chats;
