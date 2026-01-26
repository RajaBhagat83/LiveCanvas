import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";


export default function useSocket(){
   const [loading,setLoading] = useState(false);
   const [socket,setSocket] = useState<WebSocket>();

   useEffect(() => {
      const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYwOGI5OWUxLTQ5NjgtNDZhOS1hYjdkLTY5ZmYxMjBhNDE3MiIsImVtYWlsIjoibmV3dXNlckBnbWFpbC5jb20iLCJpYXQiOjE3Njk0MzAxNTUsImV4cCI6MTc2OTQzMzc1NX0.R_RT1BX0DCq7C61ufjM_knK2zlev5Q6t7NXirtArcAc`);
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