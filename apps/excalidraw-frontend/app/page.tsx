"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default  function Page() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <h1>Loading...</h1>;
  }
  if (!session) {
    return redirect('/auth/signin')
  }
  redirect('/Home')
  
}
