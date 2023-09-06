const messageModel = require("../models/message");
const userModel = require("../models/user");

const allSocketConnection = (io, socket) => {
  // console.log("New Client Join");

  socket.join("message-room");
  socket.emit("connected", "Socket.io connection established.");

    socket.on("reqMessageCreate", async (data) => {
    //   const store = await userSocket.store(data);
    console.log(data);

    //   io.to("message-room").emit("storeUser", "socket resposen some thing");
    });

  socket.on("reqAllMessages", async (data) => {
    if (data.role === "student") {
      const message = await messageModel.find({ studentId: data.id });
      io.to("message-room").emit("resAllMessages", message);
    } else if (data.role === "teacher") {
      const message = await messageModel.find({ teacherId: data.id });
      io.to("message-room").emit("resAllMessages", message);
    }
  });

  //   socket.on("userList", async () => {
  //     const show = await userSocket.show();
  //     io.to("message-room").emit("allUser", show);
  //   });

  //   socket.on("userUpdate", async (data) => {
  //     const update = await userSocket.update(data);
  //     io.to("message-room").emit("updateUser", update);
  //   });

  //   socket.on("userDelete", async (data) => {
  //     const deletes = await userSocket.deletes(data);
  //     io.to("message-room").emit("deleteUser", deletes);
  //   });

  socket.on("disconnect", () => {
    console.log("Client disconnected.");
  });
};

module.exports = allSocketConnection;
