"use client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

export default function createRoom() {
  const [slug, setSlug] = useState("");
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (!storedToken) {
      redirect("../auth/signup");
    }
  }, []);

  async function createRoomFunction(){
    const response = await axios.post(`${BACKEND_URL}/room`,{
      name:slug
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":`${token}`
      }
    });
   console.log("Response",response);
   const roomId = response.data.roomId;
    router.push(`/room/${slug}`);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "32px",
          borderRadius: "12px",
          width: "340px",
          boxShadow: "0 0 20px rgba(0,0,0,0.8)",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <h2 style={{ color: "#fff", textAlign: "center" }}>
          Create a Room
        </h2>

        <input
          type="text"
          placeholder="Enter Room Name"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
          }}
          style={inputStyle}
        />

        <button
          onClick={() => {
            createRoomFunction();
          
          }}
          style={primaryButton}
          disabled={!slug}
        >
          Create Room
        </button>

        <p
          style={{
            color: "#aaa",
            fontSize: "12px",
            textAlign: "center",
            cursor:"pointer"
          }}
        onClick={() =>{
          redirect('/home')
        }}>
          Join an Existing Room
        </p>
      
      </div>
    </div>
  );
}

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
