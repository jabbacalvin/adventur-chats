import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import {
  IconButton,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Badge,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MailIcon from "@mui/icons-material/Mail";
import { Box } from "@mui/system";
import {
  createChatMessage,
  getAllChatMessages,
} from "../../utilities/chat-api";

const socket = io.connect("http://localhost:3001");

export default function ChatWindow({
  profile,
  setUnreadCount,
  unreadCount,
  chatVisible,
  setChatVisible,
}) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesBoxRef = useRef(null);


  // Function to increment the unread count
  const incrementUnreadCount = () => {
    setUnreadCount(unreadCount + 1);
  };

  const chatName = profile.useUsername
    ? profile.username
    : `${profile.firstName} ${profile.lastName}`;

  const avatarUrl = profile.profilePics ? profile.profilePics[0].url : "";

  function sendMessage() {
    const userMessage = {
      avatar: avatarUrl,
      nameOfUser: chatName,
      user: profile._id,
      message,
    };
    socket.emit("send_message", userMessage);
    setMessages([...messages, userMessage]);
    setMessage("");
    createChatMessage(userMessage);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await getAllChatMessages();
      console.log(response);
      const responseMessages = response.data.map((m) => {
        return {
          nameOfUser: m.user.useUsername
            ? m.user.username
            : m.user.firstName + " " + m.user.lastName,
          message: m.message,
          avatar: m.user.profilePics[0].url,
        };
      });
      setMessages(responseMessages);
    }
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (!chatVisible) {
        incrementUnreadCount();
      }
      setMessages([...messages, data]);
    });
  }, [messages, chatVisible]);

  useEffect(() => {
    // Scroll to the bottom of the messages box when messages change
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatVisible) {
      // Scroll to the bottom of the messages box when the chat is opened
      if (messagesBoxRef.current) {
        messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
      }
      // Reset the unread message count since the chat is now visible
      setUnreadCount(0);
    }
  }, [chatVisible]);



  const toggleChatVisible = () => {
    setChatVisible(!chatVisible);
    if (chatVisible) {
      setUnreadCount(0);
    }
  };

  const closeChat = () => {
    setChatVisible(false);
  };

  return (
    <div>
      {chatVisible && (
        <Box
          id="chat-window"
          sx={{
            position: "fixed",
            bottom: 0,
            right: 0,
            zIndex: 999,
            backgroundColor: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            width: "500px",
            maxHeight: "70%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "d-between", // Adjusted alignment
              alignItems: "center", // Center the message icon vertically
              padding: "10px 20px",
              borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
              backgroundColor: "#f1f1f1",
            }}
          >
            <Typography variant="h6">Happy Chatting</Typography>
            <IconButton 
            onClick={closeChat}
            style={{marginLeft: "auto"}}
            >
              <CloseIcon fontSize="large"/>
            </IconButton>
          </div>
          <Box
            ref={messagesBoxRef}
            m={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxHeight: "calc(70% - 60px)", // Adjusted to account for header height
              overflowY: "auto",
              backgroundColor: "lightgray",
            }}
          >
            {messages.map((m, i) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent:
                    m.nameOfUser === chatName ? "flex-end" : "flex-start",
                }}
                key={i}
              >
                {m.nameOfUser !== chatName && (
                  <Avatar src={m.avatar} alt={m.nameOfUser} />
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: m.nameOfUser !== chatName ? "10px" : 0,
                    marginRight: m.nameOfUser === chatName ? "10px" : 0,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {m.nameOfUser !== chatName && (
                      <Typography
                        variant="body2"
                        style={{
                          marginRight: "5px",
                        }}
                      >
                        {m.nameOfUser}
                      </Typography>
                    )}
                    {m.nameOfUser === chatName && <div style={{ flex: 1 }} />}
                    {m.nameOfUser === chatName && (
                      <Typography
                        variant="body2"
                        style={{ textAlign: "right" }}
                      >
                        {m.nameOfUser}
                      </Typography>
                    )}
                  </div>
                  <Typography
                    style={{
                      maxWidth: "70%",
                      padding: "8px",
                      borderRadius: "8px",
                      background: m.nameOfUser === chatName ? "green" : "blue",
                      color: "white",
                      alignSelf:
                        m.nameOfUser === chatName ? "flex-end" : "flex-start",
                      wordWrap: "break-word",
                    }}
                    variant="body1"
                  >
                    {m.message}
                  </Typography>
                </div>
                {m.nameOfUser === chatName && (
                  <Avatar src={m.avatar} alt={m.nameOfUser} />
                )}
              </div>
            ))}
          </Box>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ ml: 1, flex: 1 }}
              label="Enter Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="button" onClick={sendMessage}>
                      <SendIcon style={{color: "green"}}  />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(e);
                }
              }}
            />
          </Paper>
        </Box>
      )}
    </div>
  );
}
