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
var messList={};
io.use((socket, next) => {
  const token = socket.handshake.headers.token;
  console.log(token);
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

  socket.on("message", (msg) => {
console.log(socket.id);
    const { idNguoiNhan, mess } = msg;
// console.log(idNguoiNhan,mess);
    io.to(idNguoiNhan).emit('getMess', mess);

  });
socket.on('disconnect',()=>{
  console.log('>>>>>>>>>>disconnect');
   socket.disconnect();
})
});

server.listen(port, "0.0.0.0", () => {
  console.log("server started");
});
