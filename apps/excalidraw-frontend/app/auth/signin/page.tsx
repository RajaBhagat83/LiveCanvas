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
        password: password
    });
    const token = "Bearer " + response.data.token;
    localStorage.setItem("token",  token);
    redirect("../home");
  }

  return (
    <div
      style={{
        height: "screen",
        width: "screen",
      }}
    >
      <div
        style={{
          padding: "3px",
          margin: "5px",
          alignItems: "center",
          position: "relative",
          right: "-50%",
        }}
      >
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          type="text"
          placeholder="Enter password"
          name="password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <br></br>
        <br></br>
        <button
          type="button"
          onClick={() => {
            SendData();
          }}
        >
          Enter
        </button>
           <button onClick={() =>{
        redirect('../auth/signup')
      }}>Signup</button>
      </div>
   
    </div>
  );
}
