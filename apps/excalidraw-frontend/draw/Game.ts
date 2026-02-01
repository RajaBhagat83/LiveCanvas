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
  } | {
    type:"line",
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | {
    type:"eraser",
    x1:number,
    y1:number,
    x2:number,
    y2:number,
    size:number
  };


export class Game {
  private socket:WebSocket;
  private type:string;
  private roomId:string;
  private existingShapes : Shapes[];
  private canvas:HTMLCanvasElement;
  constructor(canvas:HTMLCanvasElement , roomId:string , socket:WebSocket,type:string) {
   const  ctx = canvas.getContext("2D");
   this.roomId = roomId;
   this.socket =socket;
   this.type = type;
   this.canvas = canvas;
   this.existingShapes = [];
   socket.send(JSON.stringify({
    type: "join_room",
    roomId
  }));

  }
}