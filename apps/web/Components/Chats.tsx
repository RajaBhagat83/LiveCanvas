
import axios from "axios";
import { BACKEND_URL } from "../app/config";
import ChatRoomClient from "./ChatRoomClient";

async function getChats(roomId:number){
  const response = await axios(`${BACKEND_URL}/chats/${roomId}`)
  return response.data.messages;
}

export default async function Chats(roomId:string){
  const messages = await getChats(Number(roomId));
  <ChatRoomClient messages={messages} id={roomId} />
}