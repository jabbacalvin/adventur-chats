const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
// Always require and configure near the top
require("dotenv").config();
// Connect to the database
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// Middleware to check and verify a JWT and
// assign the user object from the JWT to req.user
app.use(require("./config/checkToken"));

// API routes should be defined before the "catch all" route
app.use("/api/images", require("./routes/api/images"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/visits", require("./routes/api/visits"));
app.use("/api/profiles", require("./routes/api/profiles"));
app.use("/api/chat", require("./routes/api/chat"));
app.use("/api/categories", require("./routes/api/categories"));
app.use("/api/posts", require("./routes/api/posts"));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

const server = app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});

// Initialize socket.io
const io = require("./config/socket").init(server);

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  socket.on("send_message", (msg) => {
    socket.broadcast.emit("receive_message", msg);
  });
});
