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
  const [currentMessage,setCurrentMessage] = useState("");

  useEffect(() => {
    if (socket && !loading) {
      
    socket?.send(JSON.stringify({
        type:"join_room",
        roomId:id
    }))
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type == "chat") {
          setChats((c) => [...c, { message: parsedData.message }]);;
        }
      };
    }
  }, [loading, socket,id]);
     
  return <div>
    
    {chats.map((chat,index) => <div key={index} >{chat.message}</div> )}
    <input type="text" value={currentMessage} onChange={(e) => {
      setCurrentMessage(e.target.value);
    }} ></input>
    <button onClick={() => {
      socket?.send(JSON.stringify({
        type:"chat",
        roomId :id,
        message:currentMessage
      }))
       setCurrentMessage("");
    }} >Send</button>
   
  </div>
}
