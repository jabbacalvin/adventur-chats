

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

  const chatName = profile.useUsername
    ? profile.username
    : `${profile.firstName} ${profile.lastName}`;

  function sendMessage() {
    const userMessage = {
      nameOfUser: chatName,
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
      const responseMessages = response.data.map((m) => {
        return { nameOfUser: m.nameOfUser, message: m.message };
      });
      setMessages(responseMessages);
    }
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const toggleChatVisible = () => {
    setChatVisible(!chatVisible);
  };

  const closeChat = () => {
    setChatVisible(false);
  };

  return (
  <div>
    {!chatVisible && (
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
        Open Chat
      </div>
    )}

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