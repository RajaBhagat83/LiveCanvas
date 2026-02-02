"use client";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../../config";
import { redirect } from "next/navigation";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function SendData() {
    const response = await axios.post(`${BACKEND_URL}/signin`, {
      email: email,
      password: password,
    });
    const token = "Bearer " + response.data.token;
    localStorage.setItem("token", token);
    redirect("../home");
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
          width: "320px",
          boxShadow: "0 0 20px rgba(0,0,0,0.8)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <h2 style={{ color: "#fff", textAlign: "center" }}>Sign In</h2>

        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          type="button"
          onClick={SendData}
          style={primaryButton}
        >
          Enter
        </button>

        <button
          onClick={() => {
            redirect("../auth/signup");
          }}
          style={secondaryButton}
        >
          Signup
        </button>
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
  backgroundColor: "#4f46e5",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background 0.2s, transform 0.1s",
};

const secondaryButton = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #4f46e5",
  backgroundColor: "transparent",
  color: "#4f46e5",
  cursor: "pointer",
  transition: "background 0.2s, color 0.2s",
};
