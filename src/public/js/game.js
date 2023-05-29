/*-------------------GAME-------------------*/

let nameOpp, value;

const find = document.querySelector("#find");
const turn = document.querySelector("#turn");
const btn = document.querySelectorAll(".btn");
const player = document.querySelector("#nameOpp");
const footer = document.querySelector("#footer");
const container = document.querySelector("#container");
const init = document.querySelector("#init");
const load = document.querySelector("#loading");
const user = document.querySelector("#user");
const exit = document.querySelector("#exit");

exit.addEventListener("click", () => {
  document.location = "/";
});

const socket = io();
let name = document.cookie.split("=").pop();
socket.emit("find", { name: name });
//console.log(name);

socket.on("find", (e) => {
  let allPlayersArray = e.allPlayers;
  console.log("html", allPlayersArray);

  if (name != "") {
    turn.innerText = "Turno de  X";
  }

  const foundObject = allPlayersArray.find(
    (obj) => obj.p1.p1name == `${name}` || obj.p2.p2name == `${name}`
  );

  foundObject.p1.p1name == `${name}`
    ? (nameOpp = foundObject.p2.p2name)
    : (nameOpp = foundObject.p1.p1name);
  foundObject.p1.p1name == `${name}`
    ? (value = foundObject.p1.p1value)
    : (value = foundObject.p2.p2value);

  player.innerText = nameOpp;
  user.innerText = name;
  document.getElementById("value").innerText = value;
});

btn.forEach((e) => {
  e.addEventListener("click", function () {
    let value = document.getElementById("value").innerText;
    e.innerText = value;

    socket.emit("playing", { value: value, id: e.id, name: name });
  });
});

socket.on("playing", (e) => {
  const foundObject = e.allPlayers.find(
    (obj) => obj.p1.p1name == `${name}` || obj.p2.p2name == `${name}`
  );

  p1id = foundObject.p1.p1move;
  p2id = foundObject.p2.p2move;

  if (foundObject.sum % 2 == 0) {
    turn.innerText = "Turno de O";
  } else {
    turn.innerText = "Turno de X";
  }

  if (p1id != "") {
    document.getElementById(`${p1id}`).innerText = "X";
    document.getElementById(`${p1id}`).disabled = true;
    document.getElementById(`${p1id}`).style.color = "black";
  }
  if (p2id != "") {
    document.getElementById(`${p2id}`).innerText = "O";
    document.getElementById(`${p2id}`).disabled = true;
    document.getElementById(`${p2id}`).style.color = "black";
  }

  check(name, foundObject.sum);
});

function check(name, sum) {
  document.getElementById("btn1").innerText == ""
    ? (b1 = "a")
    : (b1 = document.getElementById("btn1").innerText);
  document.getElementById("btn2").innerText == ""
    ? (b2 = "b")
    : (b2 = document.getElementById("btn2").innerText);
  document.getElementById("btn3").innerText == ""
    ? (b3 = "c")
    : (b3 = document.getElementById("btn3").innerText);
  document.getElementById("btn4").innerText == ""
    ? (b4 = "d")
    : (b4 = document.getElementById("btn4").innerText);
  document.getElementById("btn5").innerText == ""
    ? (b5 = "e")
    : (b5 = document.getElementById("btn5").innerText);
  document.getElementById("btn6").innerText == ""
    ? (b6 = "f")
    : (b6 = document.getElementById("btn6").innerText);
  document.getElementById("btn7").innerText == ""
    ? (b7 = "g")
    : (b7 = document.getElementById("btn7").innerText);
  document.getElementById("btn8").innerText == ""
    ? (b8 = "h")
    : (b8 = document.getElementById("btn8").innerText);
  document.getElementById("btn9").innerText == ""
    ? (b9 = "i")
    : (b9 = document.getElementById("btn9").innerText);

  if (
    (b1 == b2 && b2 == b3) ||
    (b4 == b5 && b5 == b6) ||
    (b7 == b8 && b8 == b9) ||
    (b1 == b4 && b4 == b7) ||
    (b2 == b5 && b5 == b8) ||
    (b3 == b6 && b6 == b9) ||
    (b1 == b5 && b5 == b9) ||
    (b3 == b5 && b5 == b7)
  ) {
    socket.emit("gameOver", { name: name });

    setTimeout(() => {
      sum % 2 == 0 ? alert("X Ganó !!") : alert("O Ganó !!");
      sum % 2 == 0 ? (document.location.href = "/") : "";
      setTimeout(() => {
        location.reload();
      }, 2000);
    }, 100);
  } else if (sum == 10) {
    socket.emit("gameOver", { name: name });

    setTimeout(() => {
      alert("Continuar!!");

      setTimeout(() => {
        location.reload();
      }, 2000);
    }, 100);
  }
}
