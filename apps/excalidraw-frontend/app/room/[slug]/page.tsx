import axios from "axios";
import { BACKEND_URL } from "../../config";
import Chats from "../../../Components/Chats";

async function getRoomId(slug:string){
   const response = await axios(`${BACKEND_URL}/room/${slug}`);
   console.log(response)
   return response.data.room.id;
}

export default async function Chatroom({
  params
}:{
  params:{
    slug:string 
  }
}) {
  const { slug } =await params;
  const roomId = await getRoomId(slug);
  return <Chats id={roomId}  />

}