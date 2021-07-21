window.onload = () => {
  var form = document.getElementById("message-form");
  var messageField = document.getElementById("message");
  var messagesList = document.getElementById("messages");
  var socketStatus = document.getElementById("status");
  var closeBtn = document.getElementById("close");

  var socket = new WebSocket("ws://localhost:3000");
  socket.onopen = (event) => {
    socketStatus.innerHTML = "Connected to: " + event.currentTarget.url;
    socketStatus.className = "open";
  };

  socket.onerror = (error) => {
    console.log("WebSocket Error: " + error);
  };

  socket.onmessage = (data) => {
    var message = data.data;
    messagesList.innerHTML +=
      "<li class='received'><span>Received: </span>" + message + "</li>";
  };

  socket.onclose = (event) => {
    socketStatus.innerHTML = "Disconnected from WebSocket";
    socketStatus.className = "closed";
  };

  closeBtn.onclick = (e) => {
    e.preventDefault();

    socket.close();

    return false;
  };

  form.onsubmit = (event) => {
    event.preventDefault();

    var message = messageField.value;
    socket.send(message);

    messagesList.innerHTML +=
      "<li class='sent'><span>Sent: </span>" + message + "</li>";
    messageField.value = "";
    return false;
  };
};