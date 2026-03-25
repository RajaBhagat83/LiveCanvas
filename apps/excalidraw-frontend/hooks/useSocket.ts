import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";


export default function useSocket() {
   const [loading, setLoading] = useState(false);
   const [socket, setSocket] = useState<WebSocket | null>(null);
   const [token, setToken] = useState<string | null>(null);
   useEffect(() => {
      setToken(localStorage.getItem("token"));
   }, []);
   const cleanToken = token?.split(" ")[1];
   useEffect(() => {
      const ws = new WebSocket(`${WS_URL}?token=${cleanToken}`);
      ws.onopen = () => {
         setLoading(false);
         setSocket(ws);
      }
      ws.onclose = () => {
         setSocket(null);
      }
      return () => {
         ws.close();
      }
   }, [])
   return {
      socket,
      loading
   }
}