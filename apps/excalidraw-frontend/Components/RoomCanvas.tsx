"use client"

import useSocket from "@/hooks/useSocket";
import CanvasComponent from "./Canvas";
import { useEffect } from "react";

export default function RoomCanvas({roomId}:{roomId : string}){

  const {socket,loading} =useSocket();

  if(!socket){
    return <div>
      Connecting to the server ....
    </div>
  }
  
  return <CanvasComponent roomId={roomId} socket={socket} />

 
}