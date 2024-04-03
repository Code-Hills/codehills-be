import { Server } from "socket.io";

export class SocketUtil {
  static io;
  static socketEmit(key, data) {
    SocketUtil.io.sockets.emit(key, data);
  }

  static config(server) {
    SocketUtil.io = new Server(server, { cors: { origin: "*" } });

    SocketUtil.io.on("connection", (socket) => {
      console.log("Connected", socket.id);
      socket.on("join_room", (data) => {
        socket.join(data);
      });
    });
  }
}

export const knownSockets = {
  notification: "notification",
};
