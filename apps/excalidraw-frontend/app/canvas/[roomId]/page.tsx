
import RoomCanvas from "@/Components/RoomCanvas";

export default async  function Canvas({params}:{
  params:{
    roomId:string
  }
}) {

  const { roomId } =await params;
  console.log("roomId ",roomId)
  return <RoomCanvas roomId={roomId} />
}
