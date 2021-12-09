const e = require("express");
const express = require("express");
var http = require("http");
const { decode } = require("./src/helper/jwt_token");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);

//middlewre
app.use(express.json());
var idUser = {};
io.use((socket, next) => {
  const token = socket.handshake.headers.token;
  try {
    const data = decode(token);
    if (data.isSuccess) {
      socket.id = data.id;
      next();
    } else {
      socket.disconnect();
    }

  } catch (err) {
    socket.disconnect();
  }

});
io.on("connection", (socket) => {
  console.log("connetetd");
  console.log(socket.id, "has joined");
 
  socket.on("message", (msg) => {

    const { idNguoiNhan, mess } = msg;
console.log(idNguoiNhan,mess);
  io.to(idNguoiNhan).emit('getMess',mess);

  });

});

server.listen(port, "0.0.0.0", () => {
  console.log("server started");
});
