/*-------------------CHAT-------------------*/

const send = document.querySelector("#send");
const messages = document.querySelector("#messages");

send.addEventListener("click", () => {
  const message = document.querySelector("#message");
  scroll();

  socket.emit("message", message.value);
  message.value = "";
});

socket.on("message", ({ user, message }) => {
  const dateTime = new Date().toLocaleTimeString();
  const data = document.createRange().createContextualFragment(
    `<div class="message">
        <div class="message-body">
            <p>${message}</p>
            <div class="user-info">
                <span class="username">${user}</span>
                <span class="time">${dateTime}</span>
            </div>
        </div>
    </div>`
  );
  messages.append(data);
});
