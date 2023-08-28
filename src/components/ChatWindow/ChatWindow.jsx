

import React, { useState, useEffect } from "react";
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

export default function ChatWindow({ profile }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chatVisible, setChatVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Function to increment the unread count
  const incrementUnreadCount = () => {
    setUnreadCount(unreadCount + 1);
  };
  
  


  const chatName = profile.useUsername
    ? profile.username
    : `${profile.firstName} ${profile.lastName}`;




  const avatarUrl = (profile.profilePics) ? profile.profilePics[0].url : "";

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
        return { nameOfUser: m.user.useUsername ? m.user.username : m.user.firstName + " " + m.user.lastName, message: m.message, avatar: m.user.profilePics[0].url };
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
    <div
      onClick={toggleChatVisible}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "green",
        color: "white",
        padding: "10px",
        cursor: "pointer",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      Open Chat{" "}
      {unreadCount > 0 && (
        <Badge badgeContent={unreadCount} color="error">
          {/* Notification bubble */}
        </Badge>
      )}
    </div>
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
            justifyContent: "space-between", // Adjusted alignment
            alignItems: "center", // Center the message icon vertically
            padding: "10px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6">Happy Chatting</Typography>
          <IconButton onClick={closeChat}>
            <CloseIcon />
          </IconButton>
        </div>
        <Box
          m={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxHeight: "calc(70% - 60px)", // Adjusted to account for header height
            overflowY: "auto",
          }}
        >
          {messages.map((m, i) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
              key={i}
            >
              <Avatar src={m.avatar} alt={m.nameOfUser} /> {/* Display the avatar */}
              <Typography
                style={{
                  marginLeft: "10px",
                  color: m.nameOfUser === chatName ? "green" : "blue",
                }}
                variant="body1"
              >
                <strong>{m.nameOfUser}</strong>: {m.message}
              </Typography>
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
                    <SendIcon />
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
