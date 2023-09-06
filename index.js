require("dotenv").config();
const express = require("express");
const socketIo = require("socket.io");
const databaseConnect = require("./app/database/mongodb");
const routes = require("./app/routes");
const http = require("http");
const cors = require("cors");
const corsPermission = require("./app/config/backend/corsConfig");
const app = express();
const port = process.env.APP_PORT;
const server = http.createServer(app);
const socketConnection = require("./app/socket/socketConnect");

// Cors site permission
app.use(cors(corsPermission));

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", function (socket) {
  socketConnection(io, socket);
});

// All request data format is JSON
app.use(express.json());

// DB Connection
databaseConnect();

// All api route
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).json({ error: "The requested URL was not found." });
});

// Server side error handler
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(500).json({ error: "There was an server-side Error." });
  }
});

server.listen(port, () => {
  console.log(`My App listening On Port http://localhost:${port}`);
});
