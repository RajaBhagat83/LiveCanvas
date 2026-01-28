import { BACKEND_URL } from "@/app/config";
import axios from "axios";

type Shapes = {
  type:"rect";
  x:number,
  y:number;
  width:number,
  height:number
} | {
  type:"circle",
  centerX:number,
  centerY:number,
  radius :number
}

export default async  function initDraw(canvas: HTMLCanvasElement,roomId:string,socket:WebSocket) {
  const ctx = canvas.getContext("2d");
  
  let existingShapes : Shapes[] =await getExistingShapes(roomId);
  if (!ctx) return;
 console.log("readystare:",socket.readyState);
  socket.onmessage=(event) => {
    alert("message received ");
    const message =JSON.parse(event.data);
    if(message.type === "chat"){
      const parsedData = JSON.parse(message.message);
      console.log("parsedData :",parsedData.shapes);
      existingShapes.push(parsedData.shapes);
      clearCanvas(existingShapes,canvas,ctx);
    }
  }

  clearCanvas(existingShapes,canvas,ctx);
  let clicked = false;
  let startX = 0;
  let startY = 0;
  canvas.addEventListener("mouseup", (e) => {
     clicked = false;
   const width = e.clientX - startX;
  const height = e.clientY - startY;
  const  shapes :Shapes= {
    type:"rect",
    x:startX,
    y:startY,
    width,
    height
  }
   existingShapes.push(shapes)
   socket.send(JSON.stringify({
    type:"chat",
    message:JSON.stringify({ shapes }),
    roomId:Number(roomId)
   }));
   
  });

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX ;
    startY = e.clientY;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(existingShapes,canvas,ctx);
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
}


function clearCanvas(existingShapes:Shapes[],canvas:HTMLCanvasElement , ctx:CanvasRenderingContext2D){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  existingShapes.map((shape)=>{
    if(shape.type === "rect"){
       ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(shape.x, shape.y, shape.width,shape.height);
    }
  })
}

async function getExistingShapes(roomId:string){
  const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
  const messages = response.data.messages;
  const shapes = messages.map((x:{message:string}) => {
  const messageData = JSON.parse(x.message);
  return messageData.shapes;
  })

  return shapes;
}