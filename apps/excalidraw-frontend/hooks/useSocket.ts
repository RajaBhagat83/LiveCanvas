import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";


export default function useSocket(){
   const [loading,setLoading] = useState(false);
   const [socket,setSocket] = useState<WebSocket>();
   const [token, setToken] = useState(localStorage.getItem("token"));
   const cleanToken = token?.split(" ")[1];
   console.log(cleanToken)
   useEffect(() => {
      const ws = new WebSocket(`${WS_URL}?token=${cleanToken}`);
      ws.onopen=() => {
        setLoading(false);
        setSocket(ws);
      }
   },[])
   return {
    socket,
    loading
   }
}