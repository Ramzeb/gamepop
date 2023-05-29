import express from "express";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";

import route from "./routes/socket.routes";
import { conexion } from "./config";

const PORT = 3000;

const app = express();
const server = http.createServer(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname + "/public")));
app.use(cookieParser());

app.use(route);
conexion(server);
server.listen(PORT, console.log("Servidor en puerto ", PORT));
