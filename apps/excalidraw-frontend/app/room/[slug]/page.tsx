"use client"
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Chats from "../../../Components/Chats";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Chatroom() {
  const params = useParams();
  const slug = params.slug as string;
  const [roomId, setRoomId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoomId() {
      try {
        const response = await axios(`${BACKEND_URL}/room/${slug}`);
        setRoomId(response.data.room.id);
      } catch (e) {
        setError("Room not found or server error.");
      }
    }
    fetchRoomId();
  }, [slug]);

  if (error) return <div style={{ color: "red", padding: "2rem" }}>{error}</div>;
  if (roomId === null) return <div style={{ color: "#fff", padding: "2rem" }}>Loading room...</div>;

  return <Chats id={roomId} />;
}