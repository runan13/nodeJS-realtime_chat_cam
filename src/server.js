import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const onSocketClose = () => {
  console.log("Disconnected to Client 🤑");
};

const onSocketMessage = (message) => {
  console.log(message);
};

wss.on("connection", (socket) => {
  console.log("Connected to Server 🚀");
  socket.on("close", onSocketClose);
  socket.on("message", onSocketMessage);
  socket.send("hello!");
});

server.listen(3000, handleListen);
