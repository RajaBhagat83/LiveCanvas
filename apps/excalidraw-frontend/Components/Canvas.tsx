"use client";
import initDraw from "@/draw";
import { useEffect, useRef, useState } from "react";

export default function CanvasComponent({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const [type, setType] = useState('rect')
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width,setWidth] = useState<number>(); 
  const [height,setHeight] = useState<number>(); 
  const canvas = canvasRef.current;

 

  useEffect(() => {
    console.log("Socket is made the connection")

    if (canvasRef.current && socket) {

      const cleanup = initDraw(canvasRef.current, roomId, socket, type);
      return () => {
        // cleanup();
        cleanup.then((clean) => {
          clean?.();
        })
      }
    }
  }, [canvasRef, socket, type, roomId]);
  
useEffect(() => {
  const resizeCanvas = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  resizeCanvas(); // initial full size

  window.addEventListener("resize", resizeCanvas);

  return () => {
    window.removeEventListener("resize", resizeCanvas);
  };
}, []);

  return (
    <div style={ {
      height:"100vh",
      overflow:"hidden"
    }}>
      <canvas
        ref={canvasRef}
        height={height}
        width={width}
        className="border-4 "
      ></canvas>
      <div className="absolute bottom-10 right-10 text-black bg-white">
        <button className="p-2 m-2 border-2 border-black rounded-2xl" onClick={() => {
          setType("rect");
        }}>Rect</button>
        <button className="p-2 m-2 border-2 border-black rounded-full" onClick={() => {
          setType("circle");
        }}>Circ</button>
         <button className="p-2 m-2 border-2 border-black rounded-full" onClick={() => {
          setType("line");
        }}>line</button>
        <button className="p-2 m-2 border-2 border-black rounded-full" onClick={() => {
          console.log("eraser is chosen")
          setType("eraser");
        }}>Eraser</button>
      </div>
    </div>
  );
}
