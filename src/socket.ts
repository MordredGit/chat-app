import io, { Socket } from "socket.io-client";

import { BASE_URL } from "./config";

let socket: Socket;

const connectSocket = (userId: string) => {
  socket = io(BASE_URL, {
    query: { userId },
  });
};

export { socket, connectSocket };
