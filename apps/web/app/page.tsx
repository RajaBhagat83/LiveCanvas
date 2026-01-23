"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [slug,setSlug] = useState("");
  const router = useRouter();
  return (
     <div style={{
      display:"flex",
      height:"screen",
      width:"screen",
      justifyContent:"center",
      alignItems:"center"
     }}>
      <div>
      <input type="text" placeholder="roomId" value={slug} onChange={(e) => {
         setSlug(e.target.value);
      }} />
      <button onClick={() => {
        router.push(`/room/:${slug}`);
      }}>Join Room</button>
     </div>
   </div>
  );
}
