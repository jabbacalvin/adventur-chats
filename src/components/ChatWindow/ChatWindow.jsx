// import io from "socket.io-client";
// import { IconButton, Paper, TextField, Typography } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { Box } from "@mui/system";
// import { useState, useEffect } from "react";
// import {
//   createChatMessage,
//   getAllChatMessages,
// } from "../../utilities/chat-api";

// const socket = io.connect("http://localhost:3001");

// export default function ChatWindow({ user }) {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   // console.log("Profile:", user);

//   const chatName = user
//     ? (user.useUsername
//       ? user.username
//       : user.firstName + " " + user.lastName)
//     : "";

//     // console.log("Chat Name:", chatName);

//   function sendMessage() {
//     const userMessage = {
//       nameOfUser: chatName,
//       message,
//     };
//     socket.emit("send_message", userMessage);
//     setMessages([...messages, userMessage]);
//     setMessage("");
//     createChatMessage(userMessage);
//   }

//   useEffect(() => {
//     async function fetchData() {
//       const response = await getAllChatMessages();
//       const responseMessages = response.data.map((m) => {
//         return { nameOfUser: m.nameOfUser, message: m.message };
//       });
//       setMessages(responseMessages);
//     }
//     fetchData();
//   }, []);

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessages([...messages, data]);
//     });
//   }, [messages]);

//   return (
//     <Box id="chat-window">
//       <Box m={2}>
//         {messages.map((m, i) => (
//           <Typography
//             style={{ color: m.nameOfUser === chatName ? "green" : "blue" }}
//             key={i}
//             variant="h6"
//           >
//             {`${m.nameOfUser}: ${m.message}`} <br />
//           </Typography>
//         ))}
//       </Box>
//       <Paper
//         sx={{
//           p: "2px 4px",
//           display: "flex",
//           alignItems: "center",
//           width: 500,
//           position: "absolute",
//           bottom: 0,
//         }}
//       >
//         <TextField
//           sx={{ ml: 1, flex: 1 }}
//           label="Enter Message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <IconButton type="button" onClick={sendMessage}>
//           <SendIcon />
//         </IconButton>
//       </Paper>
//     </Box>
//   );
// }

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { IconButton, Paper, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
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
            backgroundColor: "blue",
            color: "white",
            padding: "10px",
            cursor: "pointer",
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
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <IconButton onClick={closeChat}>
              <CloseIcon />
            </IconButton>
          </div>
          <Box m={2}>
            {messages.map((m, i) => (
              <Typography
                style={{
                  color: m.nameOfUser === chatName ? "green" : "blue",
                }}
                key={i}
                variant="h6"
              >
                {`${m.nameOfUser}: ${m.message}`} <br />
              </Typography>
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
            />
            <IconButton type="button" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </Paper>
        </Box>
      )}
    </div>
  );
}
