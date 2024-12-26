import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

// eslint-disable-next-line react/prop-types
export const CustomThemeProvider = ({ children }) => {
  // Initialize theme mode from localStorage or default to 'light'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode ? JSON.parse(savedMode) : "light";
  });

  const [senderId, setSenderId] = useState('123')
const [receiverId, setReceiverId] = useState('456')

  // Create theme based on the current mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  // Connect to the database
  // ---------
  //  const db = init({
  //   appId: "99cdf819-7e0b-49df-9a40-730c8c4056c1",
  // });

  //  function addMessage(text) {
  //   db.transact(
  //     db.tx.messages[id()].update({
  //       text,
  //       createdAt: new Date(),
  //     }),
  //   );
  // }

  // const [selectedContact, setSelectedContact] = useState(null);
  // const [messages, setMessages] = useState([]);

  // const [contacts, setContacts] = useState([]);
  // // Fetch contacts from InstantDB
  // useEffect(() => {
  //   const fetchContacts = async () => {
  //     const { data } = await db.useQuery({ contacts: {} });
  //     setContacts(data.contacts);
  //   };

  //   fetchContacts();
  // }, []);

  // Fetch messages for the selected contact
  // useEffect(() => {
  //   if (selectedContact) {
  //     const fetchMessages = async () => {
  //       const { data } = await db.useQuery({
  //         messages: { contactId: selectedContact.id },
  //       });
  //       setMessages(data.messages);
  //     };

  //     fetchMessages();
  //   }
  // }, [selectedContact]);

  // Handle sending a new message
  // const handleSendMessage = async (text) => {
  //   const newMessage = {
  //     text,
  //     contactId: selectedContact.id,
  //     createdAt: new Date().toISOString(),
  //     isOutgoing: true,
  //   };

  //   // Save to InstantDB
  //   await db.insert({ messages: [newMessage] });

  //   // Update local state
  //   setMessages((prev) => [...prev, newMessage]);
  // };




  const value = {
    toggleTheme,
    mode,
    senderId, setSenderId,
    receiverId, setReceiverId
    // handleSendMessage,
    // contacts,
    // messages,
    // setSelectedContact,
    // addMessage,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
