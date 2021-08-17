const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

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

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
