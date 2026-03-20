import { BACKEND_URL } from "@/app/config";
import axios from "axios";

type Shapes =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "line";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }
  | {
      type: "eraser";
      x1?: number;
      y1?: number;
      x2?: number;
      y2?: number;
      path?: {x: number, y: number}[];
    };

export default async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket,
  type: string,
) {
  const ctx = canvas.getContext("2d");

  let existingShapes: Shapes[] = await getExistingShapes(roomId);
  if (!ctx) return;

  socket.send(
    JSON.stringify({
      type: "join_room",
      roomId,
    }),
  );

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "chat") {
      const parsedData = JSON.parse(message.message);
      existingShapes.push(parsedData.shapes);
      clearCanvas(existingShapes, canvas, ctx);
    }
  };

  clearCanvas(existingShapes, canvas, ctx);
  let clicked = false;
  let startX = 0;
  let startY = 0;
  let currentEraserPath: {x: number, y: number}[] = [];

  const mouseUpHandler = (e: MouseEvent) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY  - startY;
    const rect: Shapes = {
      type: "rect",
      x: startX,
      y: startY,
      width,
      height,
    };
    const circ: Shapes = {
      type: "circle",
      centerX: startX,
      centerY: startY,
      radius: width,
    };

    const line: Shapes = {
      type: "line",
      x1: startX,
      y1: startY,
      x2: e.clientX,
      y2: e.clientY,
    };
    const eraser: Shapes = {
      type: "eraser",
      path: currentEraserPath,
    };
    let shapes;
   type == "rect" ? (shapes = rect) : type=="circle" ? (shapes = circ) : type =="eraser" ? (shapes = eraser):(shapes = line);
    if (type === "eraser" && currentEraserPath.length === 0) return;
    existingShapes.push(shapes);
    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({ shapes }),
        roomId: Number(roomId),
      }),
    );
  };

  const mouseDownHandler = (e: MouseEvent) => {
    clicked = true;
    startX = e.clientX ;
    startY = e.clientY ;
    if (type === "eraser") {
      currentEraserPath = [{x: startX, y: startY}];
    }
  };

  const mouseMoveHandler =async (e: MouseEvent) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;

      if (type === "rect") {
        Rectangle(ctx, existingShapes, canvas, startX, startY, width, height);
      }
      if (type === "circle") {
        Circle(ctx, existingShapes, canvas, startX, startY, Math.abs(width));
      }
      if (type === "line") {
        Line(ctx, existingShapes, canvas, startX, startY, e.clientX, e.clientY);
      }
      if (type === "eraser") {
        currentEraserPath.push({x: e.clientX, y: e.clientY});
        clearCanvas(existingShapes, canvas, ctx);
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.lineWidth = 20;
        ctx.lineCap = "round";
        ctx.beginPath();
        if (currentEraserPath.length > 0) {
          ctx.moveTo(currentEraserPath[0].x, currentEraserPath[0].y);
          for(let i=1; i<currentEraserPath.length; i++) {
            ctx.lineTo(currentEraserPath[i].x, currentEraserPath[i].y);
          }
        }
        ctx.stroke();
      }
    }
  };

  function TextArea(e:any){
      var textArea = document.createElement("textarea");
      const rect = canvas.getBoundingClientRect();

      textArea.style.position = "absolute";
      textArea.style.top = (e.clientY - rect.top)+'px';
      textArea.style.left = (e.clientX-rect.left)+'px';
      textArea.style.width = '200px';
      textArea.style.height = '30px';
      textArea.style.zIndex = '100';
      textArea.style.color = 'white'
      textArea.style.caretColor = 'white';
      textArea.style.padding = '2px';
      document.body.appendChild(textArea);
      textArea.focus();

      textArea.addEventListener('blur',()=>{
        const textvalue = textArea.value;
        if(!ctx)return;
        ctx.font= '16px Arial';
        ctx?.fillText(textvalue,e.clientX-rect.left,e.clientY-rect.top);
        socket.send(JSON.stringify({
          type:"chat",
          message:JSON.stringify(textvalue),
          roomId:Number(roomId)
        }))
      })


  }
  canvas.addEventListener('dblclick',TextArea);
  canvas.addEventListener("mouseup", mouseUpHandler);
  canvas.addEventListener("mousedown", mouseDownHandler);
  canvas.addEventListener("mousemove", mouseMoveHandler);

  return () => {
    canvas.removeEventListener("mouseup", mouseUpHandler);
    canvas.removeEventListener("mousedown", mouseDownHandler);
    canvas.removeEventListener("mousemove", mouseMoveHandler);
    canvas.removeEventListener('dblclick',TextArea);
  };
}

function clearCanvas(
  existingShapes: Shapes[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  existingShapes.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.lineWidth = 1;
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
     
    }
    if(shape.type == "circle") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.arc(
        shape.centerX,
        shape.centerY,
        Math.abs(shape.radius),
        0,
        2 * 3.14,
      );
      ctx.stroke();
  
    }
    if (shape.type == "line") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(shape.x1, shape.y1);
      ctx.lineTo(shape.x2, shape.y2);
      ctx.stroke();

    }
    if (shape.type == "eraser") {
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.lineWidth = 20;
      ctx.lineCap = "round";
      ctx.beginPath();
      if (shape.path && shape.path.length > 0) {
        ctx.moveTo(shape.path[0].x, shape.path[0].y);
        for(let i=1; i<shape.path.length; i++) {
          ctx.lineTo(shape.path[i].x, shape.path[i].y);
        }
      } else if (shape.x1 !== undefined && shape.y1 !== undefined && shape.x2 !== undefined && shape.y2 !== undefined) {
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
      }
      ctx.stroke();
    }
  });
}

async function getExistingShapes(roomId: string) {
  const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
  const messages = response.data.messages;
  const shapes = messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData.shapes;
  });

  // Reverse the shapes so that older elements render first, and newer elements (like erasers) render on top.
  return shapes.reverse();
}

function Rectangle(
  ctx: CanvasRenderingContext2D,
  existingShapes: Shapes[],
  canvas: HTMLCanvasElement,
  startX: number,
  startY: number,
  width: number,
  height: number,
) {
  clearCanvas(existingShapes, canvas, ctx);
  ctx.strokeStyle = "rgba(255,255,255)";
  ctx.lineWidth = 1;
  ctx.strokeRect(startX, startY, width, height);
}

function Circle(
  ctx: CanvasRenderingContext2D,
  existingShapes: Shapes[],
  canvas: HTMLCanvasElement,
  startX: number,
  startY: number,
  width: number,
) {
  clearCanvas(existingShapes, canvas, ctx);
  ctx.strokeStyle = "rgba(255,255,255)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(startX, startY, Math.abs(width), 0, 2 * 3.14);
  ctx.stroke();
}

function Line(
  ctx: CanvasRenderingContext2D,
  existingShapes: Shapes[],
  canvas: HTMLCanvasElement,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  clearCanvas(existingShapes, canvas, ctx);
  ctx.strokeStyle = "rgba(255,255,255)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
