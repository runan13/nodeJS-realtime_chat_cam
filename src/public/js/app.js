const socket = io();

const welcome = document.getElementById("welcome");
const nickname = document.getElementById("nickname");
const form = welcome.querySelector("form");
const nameForm = nickname.querySelector("#name");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

const addMessage = (message) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector("#message input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
};

const handleNicknameSubmit = (event) => {
  event.preventDefault();
  const input = nickname.querySelector("#name input");
  socket.emit("nickname", input.value);
};

const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  nickname.hidden = true;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room : ${roomName}`;
  const messageForm = room.querySelector("#message");
  messageForm.addEventListener("submit", handleMessageSubmit);
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
};

nameForm.addEventListener("submit", handleNicknameSubmit);
form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
  addMessage(`${user} Join!`);
});

socket.on("bye", (left) => {
  addMessage(`${left} Left!`);
});

socket.on("new_message", addMessage);
