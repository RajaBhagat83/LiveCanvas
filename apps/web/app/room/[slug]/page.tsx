import axios from "axios";
import { BACKEND_URL } from "../../config";
import Chats from "../../../Components/Chats";


async function getRoomId(slug:string){
   const response = await axios(`${BACKEND_URL}/room/${slug}`);
   return response.data.room.id;
}

export default async function Chatroom({
  params
}:{
  params:{
    slug:string 
  }
}) {
  const slug =params.slug;
  const roomId = await getRoomId(slug);

}