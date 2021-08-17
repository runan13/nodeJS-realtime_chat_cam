const socket = new WebSocket(`ws://${window.location.host}`);

const handleOpen = () => {
  console.log("Connected to Server 🚀");
};

const handleMessage = (message) => {
  console.log("New Message : ", message.data);
};

const handleClose = () => {
  console.log("Disconnected to Server 🤑");
};

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", handleMessage);

socket.addEventListener("close", handleMessage);

setTimeout(() => {
  socket.send("Hello From Browser!");
}, 10000);
