let name;
const socket = io();
const load = document.querySelector("#loading");
const login = document.querySelector("#find");

login.addEventListener("click", () => {
  name = document.querySelector("#name").value;

  if (name == null || name == "") {
    alert("INGRESE UN NOMBRE");
  } else {
    document.cookie = `username=${name}`;
    socket.emit("find", { name: name });
    load.style.display = "flex";
    find.disabled = true;
  }
});
socket.on("find", (e) => {
  document.location.href = "/play";
});
