import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWTSECRET } from "@repo/backend-comn/config";
import prisma from "@repo/db/config";
import WebSocket from "ws";

const wss = new WebSocketServer({ port: 8080 });

const checkUser = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWTSECRET);

    if (typeof decoded == "string") {
      return null;
    }
    if (!decoded || !decoded.id) {
      return null;
    }
    return decoded.id;
  } catch (err) {
    return null;
  }
};

interface User {
  userId: string;
  room: number[];
  ws: WebSocket;
}

const users: User[] = [];

wss.on("connection", (ws, request) => {
  const url = request.url; //ws://localhost:3000?token="123"
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") ?? "";
  const authenticationUser = checkUser(token);
  if (authenticationUser == null) {
    ws.close();
    return null;
  }
  //@ts-ignore
  const userId = authenticationUser;

  users.push({
    userId: userId,
    room: [],
    ws: ws,
  });
  ws.on("message", async (data) => {
    const parsedData = JSON.parse(data as unknown as string); //{type:"join-room",roomId:1}
    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws == ws);
      //@ts-ignore
      if (user && !user.room.includes(Number(parsedData.roomId))) {
        user.room.push(Number(parsedData.roomId));
      }
    }
    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws == ws);
      if (!user) {
        return;
      }
      user.room = user.room.filter((x) => x !== Number(parsedData.roomId));
    }
    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;
      await prisma.chat.create({
        data: {
          roomId,
          message,
          userId,
        },
      });

      users.forEach((user) => {
        if (user.room.includes(roomId) && user.ws !== ws) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: Number(message),
              roomId: roomId,
            }),
          );
        }
      });
    }
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
