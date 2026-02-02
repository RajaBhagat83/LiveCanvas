"use client";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [slug, setSlug] = useState("");
  const router = useRouter();
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (!token) {
    return redirect("../auth/signup");
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
          Join a Room
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
            router.push(`/room/${slug}`);
          }}
          style={primaryButton}
          disabled={!slug}
        >
          Join Room
        </button>

        <p
          style={{
            color: "#aaa",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          Enter a valid room name to continue
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
