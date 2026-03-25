
// import axios from "axios";
// import { BACKEND_URL } from "../app/config";
// import ChatRoomClient from "./ChatRoomClient";
import { redirect } from "next/navigation";

// async function getChats(roomId:string){
//   const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`)
//   console.log(response.data.messages)
//   return response.data.messages;
// }

export default async function Chats({id}:{id:string}) :Promise<never>{
  //  console.log(`${BACKEND_URL}/chats/${id}`);
  // const messages = await getChats(id);
//  return <ChatRoomClient messages={messages} id={id} />
  redirect(`../canvas/${id}`)
}