"use client";

import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

type ClientTypes = {
  messages: {
    message: string;
  }[];
  id: string;
};
export default function ChatRoomClient({ messages, id }: ClientTypes) {
  const { socket, loading } = useSocket();
  const [chats, setChats] = useState(messages);


  useEffect(() => {
    if (socket && !loading) {
    socket.send(JSON.stringify({
        type:"join_room",
        roomId:id
    }))

      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type == "chat") {
          setChats((c) => [...c, parsedData.message]);
        }
      };
    }
  }, [loading, socket,id]);

  return <div>
    {chats.map((chat,index) => (
      <h1 key={index} >{chat.message}</h1>
    ))}
  </div>
}
