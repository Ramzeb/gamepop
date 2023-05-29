import { Server as WebSocketServer } from "socket.io";

let arr = [];
let playingArray = [];

export const conexion = (server) => {
  const io = new WebSocketServer(server);
  io.on("connection", (socket) => {
    const cookie = socket.handshake.headers.cookie;
    const user = cookie.split("=").pop();

    socket.on("message", (message) => {
      io.emit("message", {
        user,
        message,
      });
    });
    console.log("nueva conexion", socket.id);

    socket.on("find", (e) => {
      if (e.name != null) {
        arr.push(e.name);

        if (arr.length >= 2) {
          let p1obj = {
            p1name: arr[0],
            p1value: "X",
            p1move: "",
          };
          let p2obj = {
            p2name: arr[1],
            p2value: "O",
            p2move: "",
          };

          let obj = {
            p1: p1obj,
            p2: p2obj,
            sum: 1,
          };
          playingArray.push(obj);

          arr.splice(0, 2);

          io.emit("find", { allPlayers: playingArray });
        }
      }
    });

    socket.on("playing", (e) => {
      if (e.value == "X") {
        let objToChange = playingArray.find((obj) => obj.p1.p1name === e.name);

        objToChange.p1.p1move = e.id;
        objToChange.sum++;
      } else if (e.value == "O") {
        let objToChange = playingArray.find((obj) => obj.p2.p2name === e.name);

        objToChange.p2.p2move = e.id;
        objToChange.sum++;
      }

      io.emit("playing", { allPlayers: playingArray });
    });

    socket.on("gameOver", (e) => {
      playingArray = playingArray.filter((obj) => obj.p1.p1name !== e.name);
      console.log(playingArray);
    });
  });
};
