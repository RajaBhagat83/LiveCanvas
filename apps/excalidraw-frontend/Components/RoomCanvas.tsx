"use client"

import useSocket from "@/hooks/useSocket";
import CanvasComponent from "./Canvas";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function RoomCanvas({roomId}:{roomId : string}){
   const [token,setToken] = useState(localStorage.getItem("token"));
  if(!token){
    return redirect("../auth/signin");
  }

  const {socket,loading} =useSocket();

  if(!socket){
    return <div>
      Connecting to the server ....
    </div>
  }
  
  return <CanvasComponent roomId={roomId} socket={socket} />

 
}