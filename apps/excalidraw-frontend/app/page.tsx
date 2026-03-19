"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default  function Page() {
  const { data: session, status } = useSession();
  const [token,setToken]  = useState(localStorage.getItem("token"));
  console.log("token ",token);
   if (status === "loading") {
    return <h1>Loading...</h1>;
  }
  if(token){
     return redirect('/home')
  }else {
     return redirect('/auth/signin')
  }
 
}
