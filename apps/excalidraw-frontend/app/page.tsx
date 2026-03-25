"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export default  function Page() {
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    if(t) {
      redirect('/home');
    } else {
      redirect('/auth/signin');
    }
  }, []);
 
}
