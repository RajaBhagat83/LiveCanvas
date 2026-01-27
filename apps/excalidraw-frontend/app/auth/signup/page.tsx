"use client";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../../config";
import { redirect } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function SendData() {
    const response = await axios.post(`${BACKEND_URL}/signup`, {
        email: email,
        password: password,
        name:name
    });
    console.log(response.data.token);
    const token = "Bearer " + response.data.token;
    localStorage.setItem("token", token);
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
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <br></br>
        <button
          type="button"
          onClick={() => {
            SendData();
          }}
        >
          Enter
        </button>
        <button onClick={() => {
            redirect('../auth/signin')
        }}>Signin</button>
      </div>
    </div>
  );
}
