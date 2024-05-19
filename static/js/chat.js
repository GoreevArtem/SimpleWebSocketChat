// static/js/chat.js
let ws;

function connect() {
    const username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter a username");
        return;
    }
    ws = new WebSocket("ws://" + window.location.host + "/ws/" + username);

    ws.onmessage = function(event) {
        const messages = document.getElementById('messages');
        const message = document.createElement('li');
        message.textContent = event.data;
        messages.appendChild(message);
    };

    ws.onopen = function() {
        document.getElementById("chat").style.display = "block";
    };

    ws.onclose = function() {
        alert("Connection closed");
        document.getElementById("chat").style.display = "none";
    };
}

function sendMessage() {
    const receiver = document.getElementById("receiver").value;
    const message = document.getElementById("messageInput").value;
    ws.send(receiver + ":" + message);
    document.getElementById("messageInput").value = '';
}
