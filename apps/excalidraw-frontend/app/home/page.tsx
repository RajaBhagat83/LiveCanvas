"use client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export default function Home() {
  const [slug, setSlug] = useState("");
  const router = useRouter();
  const [token, setToken] = useState(localStorage.getItem("token"));
    if (!token) {
    return redirect("../auth/signin");
  }
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || ""),
  );
  const [userId, setUserId] = useState(user?.id);
  const [rooms, setRooms] = useState([]);


  async function getRooms() {
    const response = await axios.get(`${BACKEND_URL}/workroom/${userId}`, {
      params: {
        userId: userId,
      },
    });
    setRooms(response.data.rooms);
  }
  useEffect(() => {
      getRooms();
  }, []);
return (
  <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f0f, #1f1f1f)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    {/* 🔹 Main Card */}
    <div
      style={{
        backgroundColor: "#1a1a1a",
        padding: "36px",
        borderRadius: "16px",
        width: "360px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h2
        style={{
          color: "#fff",
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "600",
        }}
      >
        Join a Room
      </h2>

      <input
        type="text"
        placeholder="Enter Room Name"
        value={slug}
        onChange={(e) => {
          setSlug(e.target.value);
        }}
        style={{
          ...inputStyle,
          fontSize: "14px",
        }}
      />

      <button
        onClick={() => {
          router.push(`/room/${slug}`);
        }}
        style={{
          ...primaryButton,
          fontSize: "14px",
        }}
        disabled={!slug}
      >
        Join Room
      </button>

      <div
        style={{
          color: "#aaa",
          fontSize: "13px",
          textAlign: "center",
        }}
      >
        Enter a valid room name to continue
        <div
          style={{
            marginTop: "8px",
            cursor: "pointer",
            color: "#fff",
            fontWeight: "500",
            textDecoration: "underline",
          }}
          onClick={() => {
            redirect("/createRoom");
          }}
        >
          Create a Room
        </div>
      </div>
    </div>

    {/* 🔹 Rooms Sidebar */}
    <div
      className="absolute right-10 top-10"
      style={{
        width: "260px",
        backgroundColor: "#1a1a1a",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          color: "#fff",
          fontWeight: "600",
          textAlign: "center",
          marginBottom: "12px",
          fontSize: "16px",
        }}
      >
        Rooms Created
      </div>

      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {rooms.map((room) => {
          return (
            <div
              key={room.slug}
              style={{
                backgroundColor: "#0f0f0f",
                padding: "10px",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "13px",
                border: "1px solid #2a2a2a",
              }}
            >
              Room ID: {room.slug}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #333",
  backgroundColor: "#0f0f0f",
  color: "#fff",
  outline: "none",
  transition: "border 0.2s, box-shadow 0.2s",
};

const primaryButton = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#ffffff",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background 0.2s, transform 0.1s",
};
