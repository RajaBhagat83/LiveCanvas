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

  return (
    <div className="h-screen w-screen border-4  text-white">
      <canvas
        ref={canvasRef}
        height={600}
        width={1350}
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
          setType("eraser");
        }}>Eraser</button>
      </div>
    </div>
  );
}
